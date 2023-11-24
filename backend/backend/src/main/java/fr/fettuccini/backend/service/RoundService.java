package fr.fettuccini.backend.service;

import fr.fettuccini.backend.enums.RoundStep;
import fr.fettuccini.backend.model.poker.*;
import fr.fettuccini.backend.model.request.PlayerActionRequest;
import fr.fettuccini.backend.model.response.PlayerActionResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class RoundService {

    /**
     * Initializes a new round for a given game session.
     *
     * @param currentGame The current game session.
     * @return PlayerActionResponse containing details of the new round.
     */
    public PlayerActionResponse initializeRoundForGame(GameSession currentGame) {
        String id = UUID.randomUUID().toString();
        String gameId = currentGame.getId();
        Integer buttonSeatIndex = getButtonSeatIndex(currentGame);
        Round newRound = new Round().startRound(id, gameId, buttonSeatIndex);

        newRound.setRoundIndex(getRoundIndex(currentGame));
        newRound.setCurrentLevel(getCurrentLevelByTime(currentGame));
        Action bigBlindAction = applyBlindsToRound(currentGame, newRound);
        currentGame.addRound(newRound);
        return buildPlayerActionResponse(currentGame, newRound, bigBlindAction);
    }

    /**
     * Builds a player action response for a given round and action.
     *
     * @param currentGame The current game session.
     * @param round       The current round.
     * @param action      The action performed in the round.
     * @return PlayerActionResponse for the given round.
     */
    public PlayerActionResponse buildPlayerActionResponse(GameSession currentGame, Round round, Action action){
        PlayerActionResponse playerActionResponse = new PlayerActionResponse();
        playerActionResponse.setRoundId(round.getId());
        playerActionResponse.setSessionId(currentGame.getId());
        playerActionResponse.setCurrentPotAmount(round.getPotAmount());
        playerActionResponse.setRoundPlayersActionsHistory(ActionsByRoundStep.buildActionByRoundStepFromActionList(round.getActions()));

        Optional<Player> nextPlayerToPlay = getNextPlayerToPlay(action, currentGame, round);
        nextPlayerToPlay.ifPresent(playerActionResponse::setCurrentPlayingUserSeatIndex);

        return playerActionResponse;
    }

    /**
     * Sets a player's action for a given round.
     *
     * @param playerActionRequest The request containing the player's action.
     * @param gameSession         The game session in which the action is to be set.
     * @return PlayerActionResponse after setting the player's action.
     */
    public PlayerActionResponse setPlayerAction(PlayerActionRequest playerActionRequest, GameSession gameSession){
        Round currentRound = gameSession.getRounds()
                .stream()
                .filter(round -> round.getId().equals(playerActionRequest.getRoundId()))
                .findFirst()
                .orElseThrow();

        if(playerActionRequest.getAction().getActionType().equals(Action.ActionType.BET)){
            playerMakeABet(
                    getPlayerBySeatIndex(gameSession, playerActionRequest.getAction().getSeatIndex()),
                    playerActionRequest.getAction(),
                    currentRound
            );
        } else if (playerActionRequest.getAction().getActionType().equals(Action.ActionType.CALL)){
            playerMakeACall(
                    getPlayerBySeatIndex(gameSession, playerActionRequest.getAction().getSeatIndex()),
                    playerActionRequest.getAction(),
                    currentRound
            );
        } else {
            currentRound.addAction(playerActionRequest.getAction());
        }

        return buildPlayerActionResponse(gameSession, currentRound, playerActionRequest.getAction());
    }

    /**
     * Applies blinds to the current round.
     *
     * @param currentGame The current game session.
     * @param currentRound The round to which blinds are to be applied.
     * @return The action representing the big blind.
     */
    public Action applyBlindsToRound(GameSession currentGame, Round currentRound){
        List<Player> players = currentGame.getPlayers();

        Optional<Player> smallBlindPlayer = getSmallBlindPlayer(players, currentRound);

        if(smallBlindPlayer.isPresent()){
            Action smallBlindAction = new Action(Action.ActionType.BET,
                    currentRound.getCurrentLevel().getSmallBlindAmount(),
                    smallBlindPlayer.get().getSeatIndex(),
                    RoundStep.PREFLOP);

            playerMakeABet(smallBlindPlayer.get(), smallBlindAction, currentRound);
        }

        Player bigBlindPlayer = getBigBlindPlayer(players, currentRound).orElseThrow();

        Integer bigBlindAndAnteAmount = currentRound.getCurrentLevel().getBigBlindAmount() + currentRound.getCurrentLevel().getAnteAmount();
        Action bigBlindAction = new Action(Action.ActionType.BET,
                bigBlindAndAnteAmount,
                bigBlindPlayer.getSeatIndex(),
                RoundStep.PREFLOP);

        playerMakeABet(bigBlindPlayer, bigBlindAction, currentRound);

        return bigBlindAction;
    }

    /**
     * Processes a betting action by a player in a given round.
     *
     * @param player The player making the bet.
     * @param action The betting action.
     * @param round  The current round in which the bet is made.
     */
    public void playerMakeABet(Player player, Action action, Round round){
        Integer betAmount = action.getAmount();
        if(player.getBalance() < betAmount){
            action.setAmount(player.getBalance());
        }
        player.setBalance(player.getBalance() - action.getAmount());
        round.addAction(action);
        round.setPotAmount(round.getPotAmount() + action.getAmount());
    }

    /**
     * Processes a calling action by a player in a given round.
     *
     * @param player The player making the call.
     * @param action The calling action.
     * @param round  The current round in which the call is made.
     */
    public void playerMakeACall(Player player, Action action, Round round){
        Integer callAmount = round.getActions()
                .stream()
                .filter(action1 -> action1.getActionType().equals(Action.ActionType.BET))
                .mapToInt(Action::getAmount)
                .max()
                .orElseThrow();

        if(player.getBalance() < callAmount){
            action.setAmount(player.getBalance());
        }
        player.setBalance(player.getBalance() - action.getAmount());
        round.addAction(action);
        round.setPotAmount(round.getPotAmount() + action.getAmount());
    }

    /**
     * Determines the next player to play based on the current action and game state.
     *
     * @param action       The last action taken in the game.
     * @param currentGame  The current game session.
     * @param currentRound The current round of the game.
     * @return An Optional containing the next player to play, if present.
     */
    public Optional<Player> getNextPlayerToPlay(Action action, GameSession currentGame, Round currentRound){
        List<Player> playersWhoDidntFold = getPlayersWithoutFoldThisRound(currentGame, currentRound);
        Integer nextPlayerIndex = getNextPlayerIndex(getPlayersIndexListFromPlayersList(playersWhoDidntFold),
                action.getSeatIndex());

        return currentGame
                .getPlayers()
                .stream()
                .filter(player -> player.getSeatIndex().equals(nextPlayerIndex))
                .findFirst();
    }

    /**
     * Retrieves a list of players who haven't folded in the current round.
     *
     * @param currentGame  The current game session.
     * @param currentRound The current round of the game.
     * @return A list of players who haven't folded.
     */
    public List<Player> getPlayersWithoutFoldThisRound(GameSession currentGame, Round currentRound){
        List<Player> players = currentGame.getPlayers();
        List<Integer> playersIndex = getPlayersIndexListFromPlayersList(players);
        List<Player> playersWhoDidntFold = new ArrayList<>();

        for(Action action : currentRound.getActions()){
            if(action.getActionType().equals(Action.ActionType.FOLD)){
                playersIndex.remove(action.getSeatIndex());
            }
        }

        for(Player player : players){
            if(playersIndex.contains(player.getSeatIndex())){
                playersWhoDidntFold.add(player);
            }
        }
        return playersWhoDidntFold;
    }

    /**
     * Converts a list of players into a list of their seat indexes.
     *
     * @param players The list of players.
     * @return A list of seat indexes corresponding to the given players.
     */
    public List<Integer> getPlayersIndexListFromPlayersList(List<Player> players){
        return players
                .stream()
                .map(Player::getSeatIndex)
                .toList();
    }


    /**
     * Determines the seat index for the button (dealer) for the current game.
     *
     * @param currentGame The current game session.
     * @return The seat index where the button should be placed.
     */
    public Integer getButtonSeatIndex(GameSession currentGame) {
        List<Integer> playersSeatIndex = getPlayersIndexListFromPlayersList(currentGame.getPlayers());

        Optional<Round> lastRound = currentGame
                .getRounds()
                .stream()
                .max(Comparator.comparingInt(Round::getRoundIndex));

        if(lastRound.isEmpty()) {
            return getRandomIndexInList(playersSeatIndex);
        }
        Integer lastPlayerIndex = lastRound.get().getButtonSeatIndex();
        return getNextPlayerIndex(playersSeatIndex, lastPlayerIndex);
    }

    /**
     * Selects a random index from a list of integers.
     *
     * @param list The list of integers.
     * @return A randomly selected index from the list.
     */
    public Integer getRandomIndexInList(List<Integer> list){
        Random random = new Random();
        int randomIndex = random.nextInt(list.size());
        return list.get(randomIndex);
    }

    /**
     * Determines the next player's seat index in a sequential order.
     *
     * @param playersSeatIndex A list of seat indexes.
     * @param lastPlayerIndex  The seat index of the last player.
     * @return The seat index of the next player.
     */
    public static Integer getNextPlayerIndex(List<Integer> playersSeatIndex, Integer lastPlayerIndex){
        Optional<Integer> maxPlayerIndex = playersSeatIndex
                .stream()
                .max(Comparator.comparingInt(Integer::intValue));

        if(maxPlayerIndex.isPresent() && maxPlayerIndex.get().equals(lastPlayerIndex)){
            return playersSeatIndex
                    .stream()
                    .min(Comparator.comparingInt(Integer::intValue))
                    .orElse(1);
        }

        return playersSeatIndex
                .stream()
                .filter(seatIndex -> seatIndex > lastPlayerIndex)
                .min(Comparator.comparingInt(Integer::intValue))
                .orElse(1);
    }

    /**
     * Retrieves the player who is assigned to post the small blind in the current round.
     *
     * @param players The list of players in the game.
     * @param round   The current round.
     * @return An Optional containing the player assigned the small blind, if present.
     */
    public Optional<Player> getSmallBlindPlayer(List<Player> players, Round round){
        return players
                .stream()
                .map(Player::getSeatIndex)
                .filter(seatIndex -> seatIndex.equals(getNextPlayerIndex(getPlayersIndexListFromPlayersList(players), round.getButtonSeatIndex())))
                .flatMap(seatIndex -> players.stream().filter(player -> player.getSeatIndex().equals(seatIndex)))
                .findFirst();
    }

    /**
     * Retrieves the player who is assigned to post the big blind in the current round.
     *
     * @param players The list of players in the game.
     * @param round   The current round.
     * @return An Optional containing the player assigned the big blind, if present.
     */
    public Optional<Player> getBigBlindPlayer(List<Player> players, Round round){
        Integer lastPlayerIndex = getSmallBlindPlayer(players, round).isEmpty() ?
                round.getButtonSeatIndex() : getSmallBlindPlayer(players, round).get().getSeatIndex();

        return players.stream()
                .map(Player::getSeatIndex)
                .filter(seatIndex -> seatIndex.equals(getNextPlayerIndex(getPlayersIndexListFromPlayersList(players), lastPlayerIndex)))
                .flatMap(seatIndex -> players.stream().filter(player -> player.getSeatIndex().equals(seatIndex)))
                .findFirst();
    }

    /**
     * Retrieves the last round of the current game session.
     *
     * @param currentGame The current game session.
     * @return An Optional containing the last round, if it exists.
     */
    public Optional<Round> getLastRound(GameSession currentGame) {
        return currentGame
                .getRounds()
                .stream()
                .max(Comparator.comparingInt(Round::getRoundIndex));
    }

    /**
     * Determines the index of the next round in the current game session.
     *
     * @param currentGame The current game session.
     * @return The index of the next round.
     */
    public Integer getRoundIndex(GameSession currentGame) {
        Optional<Round> lastRound = getLastRound(currentGame);

        return lastRound.map(round -> round.getRoundIndex() + 1).orElse(1);
    }

    /**
     * Retrieves a player based on their seat index in the current game session.
     *
     * @param currentGame The current game session.
     * @param seatIndex   The seat index of the player.
     * @return The player with the specified seat index.
     */
    public Player getPlayerBySeatIndex(GameSession currentGame, Integer seatIndex){
        return currentGame
                .getPlayers()
                .stream()
                .filter(player -> player.getSeatIndex().equals(seatIndex))
                .findFirst()
                .orElseThrow();
    }

    /**
     * Determines the current level of play based on the elapsed time since the start of the game.
     *
     * @param currentGame The current game session.
     * @return The current level of the game.
     */
    public Level getCurrentLevelByTime(GameSession currentGame){
        LocalDateTime now = LocalDateTime.now();
        Integer totalDuration = 0;

        List<Level> levels = currentGame
                .getLevelsStructure()
                .getLevels()
                .stream()
                .sorted(Comparator.comparingInt(Level::getRoundIndex))
                .toList();

        for (Level level : levels) {
            totalDuration += level.getDuration();
            if (now.isBefore(currentGame.getDateGameStarted().plusMinutes(totalDuration))) {
                return level;
            }
        }
        return null;
    }
}
