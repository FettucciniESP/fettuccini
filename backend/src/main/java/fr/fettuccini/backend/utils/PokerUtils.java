package fr.fettuccini.backend.utils;

import fr.fettuccini.backend.enums.PokerExceptionType;
import fr.fettuccini.backend.enums.RoundStep;
import fr.fettuccini.backend.model.poker.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Component
public class PokerUtils {

    private PokerUtils() {
    }

    /**
     * Determines the current level of play based on the elapsed time since the start of the game.
     *
     * @param currentGame The current game session.
     * @return The current level of the game.
     */
    public static Level getCurrentLevelByTime(GameSession currentGame) {
        LocalDateTime now = LocalDateTime.now();
        Integer totalDuration = 0;

        List<Level> levels = currentGame
                .getLevelsStructure()
                .stream()
                .toList();

        for (Level level : levels) {
            totalDuration += level.getDuration();
            if (now.isBefore(currentGame.getDateGameStarted().plusMinutes(totalDuration))) {
                return level;
            }
        }
        return null;
    }

    /**
     * Determines the next player to play based on the current action and game state.
     *
     * @param action       The last action taken in the game.
     * @param currentGame  The current game session.
     * @param currentRound The current round of the game.
     * @return An Optional containing the next player to play, if present.
     */
    public static Optional<Player> getNextPlayerToPlay(Action action, GameSession currentGame, Round currentRound){
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
    public static List<Player> getPlayersWithoutFoldThisRound(GameSession currentGame, Round currentRound){
        List<Player> players = currentGame.getPlayers();
        List<Integer> playersIndex = getPlayersIndexListFromPlayersList(players);
        List<Player> playersWhoDidntFold = new ArrayList<>();

        for(Action action : currentRound.getActions()){
            if(action.getActionType().equals(Action.ActionType.FOLD)){
                playersIndex = playersIndex.stream()
                        .filter(seatIndex -> !seatIndex.equals(action.getSeatIndex()))
                        .toList();
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
    public static List<Integer> getPlayersIndexListFromPlayersList(List<Player> players){
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
    public static Integer getButtonSeatIndex(GameSession currentGame) {
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
    public static Integer getRandomIndexInList(List<Integer> list){
        return list.stream().unordered().findAny().orElseThrow();
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
    public static Optional<Player> getSmallBlindPlayer(List<Player> players, Round round){
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
    public static Optional<Player> getBigBlindPlayer(List<Player> players, Round round){
        Optional<Player> smallBlindPlayer = getSmallBlindPlayer(players, round);
        Integer lastPlayerIndex;

        if(smallBlindPlayer.isPresent()){
            lastPlayerIndex = smallBlindPlayer.get().getSeatIndex();
        } else {
            lastPlayerIndex = round.getButtonSeatIndex();
        }

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
    public static Optional<Round> getLastRound(GameSession currentGame) {
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
    public static Integer getRoundIndex(GameSession currentGame) {
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
    public static Player getPlayerBySeatIndex(GameSession currentGame, Integer seatIndex){
        return currentGame
                .getPlayers()
                .stream()
                .filter(player -> player.getSeatIndex().equals(seatIndex))
                .findFirst()
                .orElseThrow();
    }

    /**
     * Determines if all players have played their turn in the current round step.
     *
     * @param round The current round of the game.
     * @param currentGame The current game session.
     * @return {@code true} if all players have played in this round step, {@code false} otherwise.
     */
    public static boolean didAllPlayersPlayedThisRoundStep(Round round, GameSession currentGame) {
        if(round.getRoundStep().equals(RoundStep.PREFLOP) && !areBlindsPlayersAlreadyPlayedPreflop(round, currentGame)){
            return false;
        }
        
        return round.getActions()
                .stream()
                .filter(action -> action.getRoundStep().equals(round.getRoundStep()))
                .filter(action -> action.getAmount().equals(getHighestBetValueForCurrentRoundStep(round)))
                .count() == getPlayersWithoutFoldThisRound(currentGame, round).size();
    }

    /**
     * Checks if the players assigned to post the small and big blinds have already played in the pre-flop.
     *
     * @param round The current round of the game.
     * @param currentGame The current game session.
     * @return {@code true} if both the small and big blind players have played in the pre-flop, {@code false} otherwise.
     */
    public static boolean areBlindsPlayersAlreadyPlayedPreflop(Round round, GameSession currentGame) {
        Optional<Player> smallBlindPlayer = getSmallBlindPlayer(currentGame.getPlayers(), round);
        Player bigBlindPlayer = getBigBlindPlayer(currentGame.getPlayers(), round).orElseThrow();
        boolean smallBlindAlreadyPlayed = true;
        
        if (smallBlindPlayer.isPresent()) {
            smallBlindAlreadyPlayed = round.getActions()
                    .stream()
                    .filter(action -> action.getSeatIndex().equals(smallBlindPlayer.get().getSeatIndex()))
                    .filter(action -> action.getRoundStep().equals(RoundStep.PREFLOP))
                    .count() >= 2;
        }

        boolean bigBlindAlreadyPlayed = round.getActions()
                .stream()
                .filter(action -> action.getSeatIndex().equals(bigBlindPlayer.getSeatIndex()))
                .filter(action -> action.getRoundStep().equals(RoundStep.PREFLOP))
                .count() >= 2;

        return smallBlindAlreadyPlayed && bigBlindAlreadyPlayed;
    }

    /**
     * Retrieves the highest bet value for the current round step.
     *
     * @param round The current round of the game.
     * @return The highest bet value in the current round step or {@code 0} if no bets have been made.
     */
    public static Integer getHighestBetValueForCurrentRoundStep(Round round) {
        return round.getActions()
                .stream()
                .filter(action -> action.getRoundStep().equals(round.getRoundStep()))
                .mapToInt(Action::getAmount)
                .max()
                .orElse(0);
    }

    /**
     * Calculates the highest bet value placed by a specific player in the current round step.
     *
     * @param round The current round of the game.
     * @param seatIndex The seat index of the player.
     * @return The highest bet value placed by the player in the current round step.
     */
    public static Integer getHighestBetValueForPlayerInCurrentRoundStep(Round round, Integer seatIndex) {
        return round.getActions()
                .stream()
                .filter(action -> action.getRoundStep().equals(round.getRoundStep()))
                .filter(action -> action.getSeatIndex().equals(seatIndex))
                .mapToInt(Action::getAmount)
                .max()
                .orElse(0);
    }

    /**
     * Retrieves a list of the last actions made by each player in the current round.
     *
     * @param currentGame The current game session.
     * @param currentRound The round for which to retrieve the last actions.
     * @return A list of PlayerLastAction objects representing each player's last action in the round.
     */
    public static List<PlayerLastAction> getRoundPlayersLastActionList(GameSession currentGame, Round currentRound) {
        List<PlayerLastAction> playerLastActionList = new ArrayList<>();
        List<Player> players = currentGame.getPlayers();

        for(Player player : players){
            playerLastActionList.add(getPlayerLastAction(currentGame, currentRound, player.getSeatIndex()));
        }

        return playerLastActionList;
    }

    /**
     * Retrieves the last action performed by a specific player in the current round.
     * If the player has folded, this will be their last action. Otherwise, it fetches the last action based on the amount.
     *
     * @param currentGame The current game session.
     * @param currentRound The round for which to retrieve the player's last action.
     * @param seatIndex The seat index of the player.
     * @return PlayerLastAction object representing the player's last action.
     */
    public static PlayerLastAction getPlayerLastAction(GameSession currentGame, Round currentRound, Integer seatIndex) {
        PlayerLastAction playerLastAction = new PlayerLastAction();
        playerLastAction.setPlayer(getPlayerBySeatIndex(currentGame, seatIndex));

        Optional<Action> playerFoldedAction = currentRound.getActions()
                .stream()
                .filter(action -> action.getSeatIndex().equals(seatIndex))
                .filter(action -> action.getActionType().equals(Action.ActionType.FOLD))
                .findFirst();

        if(playerFoldedAction.isPresent()){
            playerLastAction.setLastAction(playerFoldedAction.get());
            return playerLastAction;
        }

        Optional<Action> lastAction = getLastPlayerAction(currentRound, seatIndex);
        playerLastAction.setLastAction(lastAction.orElse(null));

        return playerLastAction;
    }

    /**
     * Retrieves the most recent action for a specific player in the current round step.
     * The latest action is determined based on the highest amount bet by the player.
     *
     * @param currentRound The current round of the game.
     * @param seatIndex The seat index of the player.
     * @return An Optional containing the player's last action, if it exists.
     */
    public static Optional<Action> getLastPlayerAction(Round currentRound, Integer seatIndex) {
        return currentRound.getActions()
                .stream()
                .filter(action -> action.getSeatIndex().equals(seatIndex))
                .filter(action -> action.getRoundStep().equals(currentRound.getRoundStep()))
                .max(Comparator.comparingInt(Action::getAmount));
    }

    /**
     * Formats a message for a PokerException based on the exception type and a custom message.
     *
     * @param pokerExceptionType The type of the poker exception.
     * @param message The custom message to include in the exception.
     * @return A formatted string representing the exception message.
     */
    public static String formatPokerExceptionMessage(PokerExceptionType pokerExceptionType, String message) {
        return pokerExceptionType.toString() + " : " + message;
    }
}