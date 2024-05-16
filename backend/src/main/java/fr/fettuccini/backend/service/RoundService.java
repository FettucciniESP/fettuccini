package fr.fettuccini.backend.service;

import fr.fettuccini.backend.enums.CommunityCardType;
import fr.fettuccini.backend.enums.PokerExceptionType;
import fr.fettuccini.backend.enums.RoundStep;
import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.*;
import fr.fettuccini.backend.model.request.CardMisreadRequest;
import fr.fettuccini.backend.model.request.PlayerActionRequest;
import fr.fettuccini.backend.model.response.PlayerActionResponse;
import fr.fettuccini.backend.utils.PokerUtils;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class RoundService {
    private final RoundValidationService roundValidationService;

    private final PokerEvaluatorService pokerEvaluatorService;

    private final WledService wledService;

    /**
     * Initializes a new round for a given game session.
     *
     * @param currentGame The current game session.
     * @return PlayerActionResponse containing details of the new round.
     */
    public PlayerActionResponse initializeRoundForGame(GameSession currentGame) {
        String id = UUID.randomUUID().toString();
        String gameId = currentGame.getId();
        Integer buttonSeatIndex = PokerUtils.getButtonSeatIndex(currentGame);

        wledService.resetPlayerLeds().subscribe();

        Level currentLevel = PokerUtils.getCurrentLevelByTime(currentGame);
        if (currentLevel != null && currentLevel.getRoundIndex().equals(0)) {
            return buildBreakResponse(currentGame, currentLevel);
        }

        Round newRound = new Round().startRound(id, gameId, buttonSeatIndex);

        newRound.setRoundIndex(PokerUtils.getRoundIndex(currentGame));
        newRound.setCurrentLevel(PokerUtils.getCurrentLevelByTime(currentGame));
        Action bigBlindAction = applyBlindsToRound(currentGame, newRound);
        newRound.setNextPlayerToPlaySeatIndex(PokerUtils.getNextPlayerIndex(
                currentGame.getPlayers().stream().map(Player::getSeatIndex).toList(),
                bigBlindAction.getSeatIndex())
        );

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
    public PlayerActionResponse buildPlayerActionResponse(GameSession currentGame, Round round, Action action) {
        PlayerActionResponse playerActionResponse = new PlayerActionResponse();
        playerActionResponse.setRoundId(round.getId());
        playerActionResponse.setGameStartedDatetime(currentGame.getDateGameStarted());
        playerActionResponse.setSessionId(currentGame.getId());
        playerActionResponse.setCurrentPotAmount(round.getPotAmount());
        playerActionResponse.setRoundStep(round.getRoundStep());
        playerActionResponse.setRoundPlayersActionsHistory(ActionsByRoundStep.buildActionByRoundStepFromActionList(round.getActions()));
        playerActionResponse.setCurrentPlayingUser(PokerUtils.getPlayerBySeatIndex(currentGame, round.getNextPlayerToPlaySeatIndex()));
        playerActionResponse.setCurrentButtonUser(PokerUtils.getPlayerBySeatIndex(currentGame, round.getButtonSeatIndex()));
        playerActionResponse.setPlayersLastActions(PokerUtils.getRoundPlayersLastActionList(currentGame, round));

        if(round.getRoundStep().equals(RoundStep.ACTION_NEEDED)){
            playerActionResponse.setCardMisreads(getCardMisreads(round, currentGame));
        }

        if(!round.getWinners().isEmpty()){
            playerActionResponse.setWinners(round.getWinners());
        }

        return playerActionResponse;
    }

    /**
     * Builds a player action response for a break in the game.
     * This method is called when the round index of the current level is 0, indicating a break.
     * The response includes the session ID, the game start time, a flag indicating a break, and the label of the current level.
     *
     * @param currentGame The current game session.
     * @param currentLevel The current level of the game.
     * @return PlayerActionResponse indicating a break in the game.
     */
    public PlayerActionResponse buildBreakResponse(GameSession currentGame, Level currentLevel) {
        PlayerActionResponse breakResponse = new PlayerActionResponse();
        breakResponse.setSessionId(currentGame.getId());
        breakResponse.setGameStartedDatetime(currentGame.getDateGameStarted());
        breakResponse.setBreakTime(true);
        breakResponse.setLevelLabel(currentLevel.getLabel());
        return breakResponse;
    }

    /**
     * Sets a player's action for a given round in the game session.
     *
     * @param playerActionRequest The request containing the player's action.
     * @param gameSession         The game session in which the action is to be set.
     * @return PlayerActionResponse after processing the player's action.
     * @throws PokerException if any validation fails or the round is not found.
     */
    public PlayerActionResponse setPlayerAction(PlayerActionRequest playerActionRequest, GameSession gameSession) throws PokerException {
        Round currentRound = findRoundById(playerActionRequest.getRoundId(), gameSession);
        roundValidationService.validatePlayerActionRoundStep(playerActionRequest, gameSession, currentRound);

        // action valide
        wledService.setPlayerLedColor(playerActionRequest.getAction().getActionType(), playerActionRequest.getAction().getSeatIndex());

        processPlayerAction(playerActionRequest, gameSession, currentRound);
        manageRoundStepProgression(gameSession, currentRound);

        List<Player> playersWithoutFold = PokerUtils.getPlayersWithoutFoldThisRound(gameSession, currentRound);

        if(playersWithoutFold.size() == 1){
            Player winner = playersWithoutFold.get(0);
            winner.setBalance(winner.getBalance() + currentRound.getPotAmount());
            currentRound.setRoundStep(RoundStep.FINISHED);
        } else if (currentRound.getRoundStep().equals(RoundStep.FINISHED) && !areAllCardsReaded(currentRound, gameSession)){
            currentRound.setRoundStep(RoundStep.ACTION_NEEDED);
        } else if (currentRound.getRoundStep().equals(RoundStep.FINISHED)) {
            determineWinnerAndAllocatePot(gameSession, currentRound);
        }

        updateNextPlayerToPlay(gameSession, currentRound, playerActionRequest);
        return buildPlayerActionResponse(gameSession, currentRound, playerActionRequest.getAction());
    }


    public boolean areAllCardsReaded(Round currentRound, GameSession gameSession) {
        List<CardMisread> cardMisreads = getCardMisreads(currentRound, gameSession);

        return cardMisreads.isEmpty();
    }

    public List<CardMisread> getCardMisreads(Round currentRound, GameSession gameSession) {
        List<CardMisread> cardMisreads = new ArrayList<>();
        if(!(currentRound.getBoard().getCommunityCards().size() == 5)){
            cardMisreads.add(PokerUtils.createBoardCardMisread(currentRound.getBoard().getCommunityCards()));
        }

        PokerUtils.getPlayersWithoutFoldThisRound(gameSession, currentRound).stream()
                .filter(player -> player.getHand().size() != 2)
                .forEach(player -> cardMisreads.add(PokerUtils.createPlayerCardMisread(player, player.getHand())));

        return cardMisreads;
    }

    /**
     * Determines the winner(s) of the current poker round and allocates the pot accordingly.
     * This method is called when the round reaches the SHOWDOWN stage. It evaluates the hands of all players
     * who have not folded, identifies the player(s) with the highest hand, and splits the pot among them.
     * In case of a tie (multiple players with the highest hand), the pot is evenly split among the winners.
     * If the pot amount does not split evenly, the remainder is allocated to one of the winners.
     *
     * @param gameSession  The current game session containing the round and player information.
     * @param currentRound The current round where the showdown occurs.
     */
    void determineWinnerAndAllocatePot(GameSession gameSession, Round currentRound) {
        HashSet<Card> communityCards = new HashSet<>(currentRound.getBoard().getCommunityCards());
        Map<Player, Long> playerScores = new HashMap<>();

        // Evaluate the hand for each player
        for (Player player : PokerUtils.getPlayersWithoutFoldThisRound(gameSession, currentRound)) {
            HashSet<Card> playerHand = new HashSet<>(player.getHand());
            Long handScore = pokerEvaluatorService.evaluateHand(playerHand, communityCards);
            playerScores.put(player, handScore);
        }

        // Find the highest score
        Long highestScore = (long) Math.toIntExact(playerScores.values().stream()
                .max(Long::compare)
                .orElseThrow(() -> new IllegalStateException("Unable to determine highest score")));

        // Identify all players with the highest score
        List<Player> winners = playerScores.entrySet().stream()
                .filter(entry -> entry.getValue().equals(highestScore))
                .map(Map.Entry::getKey)
                .toList();

        // Split the pot among the winners
        int potAmount = currentRound.getPotAmount();
        int splitAmount = potAmount / winners.size();
        for (Player winner : winners) {
            winner.setBalance(winner.getBalance() + splitAmount);
            Winner winnerInfo = new Winner(winner.getSeatIndex(), splitAmount);
            currentRound.addWinner(winnerInfo);
        }

        // Handle remainder if pot doesn't split evenly
        int remainder = potAmount % winners.size();
        if (remainder > 0) {
            Player remainderWinner = winners.getFirst();
            remainderWinner.setBalance(winners.getFirst().getBalance() + remainder);
            Winner winnerWithRemaind =  currentRound.getWinners().stream()
                    .filter(winner -> winner.getSeatIndex().equals(remainderWinner.getSeatIndex()))
                    .findFirst()
                    .orElseThrow();
            winnerWithRemaind.setAmount(winnerWithRemaind.getAmount() + remainder);
        }

        for (var winner : winners) {
            wledService.setPlayerLedColor(Action.ActionType.WIN, winner.getSeatIndex());
        }

        // Set round as finished
        currentRound.setRoundStep(RoundStep.FINISHED);
    }


    /**
     * Finds a round by its ID in the given game session.
     *
     * @param roundId     The ID of the round to find.
     * @param gameSession The game session containing the round.
     * @return The found round.
     * @throws PokerException if the round is not found.
     */
    Round findRoundById(String roundId, GameSession gameSession) throws PokerException {
        return gameSession.getRounds().stream()
                .filter(round -> round.getId().equals(roundId))
                .findFirst()
                .orElseThrow(() -> new PokerException(PokerExceptionType.ROUND_NOT_FOUND,
                        String.format(PokerExceptionType.ROUND_NOT_FOUND.getMessage(), roundId)));
    }

    /**
     * Processes the player's action based on its type within the current round.
     *
     * @param playerActionRequest The request containing the player's action.
     * @param gameSession         The game session in which the action is to be processed.
     * @param currentRound        The current round of the game.
     */
    private void processPlayerAction(PlayerActionRequest playerActionRequest, GameSession gameSession, Round currentRound) {
        Action action = playerActionRequest.getAction();
        wledService.setPlayerLedColor(playerActionRequest.getAction().getActionType(), action.getSeatIndex());
        switch (action.getActionType()) {
            case BET, RAISE ->
                    playerMakeABet(PokerUtils.getPlayerBySeatIndex(gameSession, action.getSeatIndex()), action, currentRound);
            case CALL ->
                    playerMakeACall(PokerUtils.getPlayerBySeatIndex(gameSession, action.getSeatIndex()), action, currentRound);
            default -> currentRound.addAction(action);
        }
    }

    /**
     * Updates the next player to play based on the current round step.
     * If the round has progressed to a new step, the next player is determined from the small blind
     * or the first player to the left who has not folded.
     *
     * @param gameSession         The current game session.
     * @param currentRound        The current round of the game.
     * @param playerActionRequest The request containing the player's action.
     */
    private void updateNextPlayerToPlay(GameSession gameSession, Round currentRound, PlayerActionRequest playerActionRequest) {
        if (hasRoundStepProgressed(currentRound, playerActionRequest)) {
            Integer nextPlayerSeatIndex = findNextActivePlayerFromButton(gameSession, currentRound);
            currentRound.setNextPlayerToPlaySeatIndex(nextPlayerSeatIndex);
        } else {
            List<Integer> playersWithoutFold = PokerUtils.getPlayersWithoutFoldThisRound(gameSession, currentRound)
                    .stream()
                    .map(Player::getSeatIndex).toList();
            currentRound.setNextPlayerToPlaySeatIndex(PokerUtils.getNextPlayerIndex(playersWithoutFold, playerActionRequest.getAction().getSeatIndex()));
        }
    }

    /**
     * Determines if the round step has progressed based on the player's action.
     *
     * @param currentRound        The current round of the game.
     * @param playerActionRequest The request containing the player's action.
     * @return {@code true} if the round step has progressed, {@code false} otherwise.
     */
    private boolean hasRoundStepProgressed(Round currentRound, PlayerActionRequest playerActionRequest) {
        return !currentRound.getRoundStep().equals(playerActionRequest.getAction().getRoundStep());
    }

    /**
     * Finds the next active player starting from the small blind position.
     *
     * @param gameSession  The current game session.
     * @param currentRound The current round of the game.
     * @return The seat index of the next active player.
     */
    private Integer findNextActivePlayerFromButton(GameSession gameSession, Round currentRound) {
        Integer buttonSeatIndex = currentRound.getButtonSeatIndex();
        List<Integer> playersWithoutFold = PokerUtils.getPlayersWithoutFoldThisRound(gameSession, currentRound)
                .stream()
                .map(Player::getSeatIndex).toList();
        return PokerUtils.getNextPlayerIndex(playersWithoutFold, buttonSeatIndex);
    }

    /**
     * Applies blinds to the current round.
     *
     * @param currentGame  The current game session.
     * @param currentRound The round to which blinds are to be applied.
     * @return The action representing the big blind.
     */
    public Action applyBlindsToRound(GameSession currentGame, Round currentRound) {
        List<Player> players = currentGame.getPlayers();

        Optional<Player> smallBlindPlayer = PokerUtils.getSmallBlindPlayer(players, currentRound);

        if (smallBlindPlayer.isPresent()) {
            Action smallBlindAction = new Action(Action.ActionType.BET,
                    currentRound.getCurrentLevel().getSmallBlindAmount(),
                    smallBlindPlayer.get().getSeatIndex(),
                    RoundStep.PREFLOP);

            playerMakeABet(smallBlindPlayer.get(), smallBlindAction, currentRound);
        }

        Player bigBlindPlayer = PokerUtils.getBigBlindPlayer(players, currentRound).orElseThrow();

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
    public void playerMakeABet(Player player, Action action, Round round) {
        Integer betAmount = action.getAmount();
        playerAction(player, action, round, betAmount);
    }

    private void playerAction(Player player, Action action, Round round, Integer betAmount) {
        if (player.getBalance() < betAmount) {
            action.setAmount(player.getBalance());
        }
        Integer amountToDecreaseFromPlayerBalance = getValueToDecreaseFromPlayerBalance(round, action);
        player.setBalance(player.getBalance() - amountToDecreaseFromPlayerBalance);
        if (player.getBalance() == 0) {
            wledService.setPlayerLedColor(Action.ActionType.ALL_IN, player.getSeatIndex());
        }
        round.addAction(action);
        round.setPotAmount(round.getPotAmount() + amountToDecreaseFromPlayerBalance);
    }

    /**
     * Calculates the amount to decrease from a player's balance based on their action and the current round.
     * This method considers the amount the player has already put in the pot during the current round step
     * and subtracts it from the action amount to find the net amount to be deducted from the player's balance.
     *
     * @param round  The current round of the game.
     * @param action The action taken by the player.
     * @return The net amount to decrease from the player's balance.
     */
    private Integer getValueToDecreaseFromPlayerBalance(Round round, Action action) {
        Integer alreadyPutInPotByPlayer = round.getActions()
                .stream()
                .filter(action1 -> round.getRoundStep().equals(action1.getRoundStep()))
                .filter(action1 -> action1.getSeatIndex().equals(action.getSeatIndex()))
                .mapToInt(Action::getAmount)
                .sum();

        return action.getAmount() - alreadyPutInPotByPlayer;
    }

    /**
     * Processes a calling action by a player in a given round.
     *
     * @param player The player making the call.
     * @param action The calling action.
     * @param round  The current round in which the call is made.
     */
    public void playerMakeACall(Player player, Action action, Round round) {
        Integer callAmount = round.getActions()
                .stream()
                .filter(action1 -> action1.getActionType().equals(Action.ActionType.BET))
                .mapToInt(Action::getAmount)
                .max()
                .orElseThrow();

        playerAction(player, action, round, callAmount);
    }

    /**
     * Manages the progression of the round step based on the current state of the game.
     * It progresses the round through the different stages (Pre-flop, Flop, Turn, River, Showdown)
     * based on the actions taken by the players.
     *
     * @param currentGame The current game session.
     * @param round       The round whose progression is to be managed.
     */
    public void manageRoundStepProgression(GameSession currentGame, Round round) {
        if (PokerUtils.didAllPlayersPlayedThisRoundStep(round, currentGame)) {
            if (round.getRoundStep().equals(RoundStep.PREFLOP)) {
                round.setRoundStep(RoundStep.FLOP);
            } else if (round.getRoundStep().equals(RoundStep.FLOP)) {
                round.setRoundStep(RoundStep.TURN);
            } else if (round.getRoundStep().equals(RoundStep.TURN)) {
                round.setRoundStep(RoundStep.RIVER);
            } else if (round.getRoundStep().equals(RoundStep.RIVER)) {
                round.setRoundStep(RoundStep.SHOWDOWN);
            }
        }

        if (isRoundFinished(currentGame, round)) {
            round.setRoundStep(RoundStep.FINISHED);
        }
    }

    /**
     * Determines whether the current round is finished.
     * A round is considered finished if it reaches the Showdown step or if only one player hasn't folded.
     *
     * @param currentGame The current game session.
     * @param round       The round to be checked for completion.
     * @return {@code true} if the round is finished, {@code false} otherwise.
     */
    public boolean isRoundFinished(GameSession currentGame, Round round) {
        return round.getRoundStep().equals(RoundStep.SHOWDOWN) ||
                PokerUtils.getPlayersWithoutFoldThisRound(currentGame, round).size() == 1;
    }

    public PlayerActionResponse handleCardMisread(CardMisreadRequest cardMisreadRequest, GameSession gameSession) throws PokerException {

        Round currentRound = findRoundById(cardMisreadRequest.getRoundId(), gameSession);
        if (currentRound == null) {
            throw new PokerException(PokerExceptionType.ROUND_NOT_FOUND, PokerExceptionType.ROUND_NOT_FOUND.getMessage());
        }

        if (!currentRound.getRoundStep().equals(RoundStep.ACTION_NEEDED)) {
            throw new PokerException(PokerExceptionType.NO_CARD_MISREAD_ALLOWED, PokerExceptionType.NO_CARD_MISREAD_ALLOWED.getMessage());
        }

        if (cardMisreadRequest.getCards().isEmpty()) {
            throw new PokerException(PokerExceptionType.NO_CARD_MISREAD_PROVIDED, PokerExceptionType.NO_CARD_MISREAD_PROVIDED.getMessage());
        }

        if (cardMisreadRequest.getPlayerSeatId() == null) {
            currentRound.setBoard(handleCommunityCardMisread(currentRound, cardMisreadRequest));
        } else {
            Player player = PokerUtils.getPlayerBySeatIndex(gameSession, cardMisreadRequest.getPlayerSeatId());
            player.setHand(handlePlayerCardMisread(player, cardMisreadRequest));
        }

        if (getCardMisreads(currentRound, gameSession).isEmpty()) {
            determineWinnerAndAllocatePot(gameSession, currentRound);
        }

        return buildPlayerActionResponse(gameSession, currentRound, null);
    }

    public Board handleCommunityCardMisread(Round currentRound, CardMisreadRequest cardMisreadRequest) throws PokerException {
        Board board = currentRound.getBoard();
        List<Card> cards = cardMisreadRequest.getCards();
        for (Card card : cards) {
            if (board.getCommunityCards().contains(card)) {
                throw new PokerException(PokerExceptionType.IMPOSSIBLE_COMMUNITY_CARD_TYPE, String.format(PokerExceptionType.IMPOSSIBLE_COMMUNITY_CARD_TYPE.getMessage(), card));
            }
            CommunityCardType cardType = board.getLastAddedType();
            CommunityCardType newCardType = null;
            if (board.getCommunityCards().size() > 2) {
                newCardType = switch (cardType) {
                    case FLOP -> CommunityCardType.TURN;
                    case TURN -> CommunityCardType.RIVER;
                    case RIVER -> throw new PokerException(PokerExceptionType.IMPOSSIBLE_COMMUNITY_CARD_TYPE, "Cannot add more than 5 community cards.");
                    default ->  CommunityCardType.FLOP;
                };
            } else {
                newCardType = CommunityCardType.FLOP;
            }

            board.addCards(new HashSet<>(List.of(card)), newCardType);
        }

        return board;
    }

    public HashSet<Card> handlePlayerCardMisread(Player player, CardMisreadRequest cardMisreadRequest) throws PokerException {
        List<Card> cards = cardMisreadRequest.getCards();
        if (player.getHand().size() > 2) {
            throw new PokerException(PokerExceptionType.IMPOSSIBLE_COMMUNITY_CARD_TYPE, "Cannot add more than 2 cards to a player's hand.");
        }
        return new HashSet<>(cards);
    }

}
