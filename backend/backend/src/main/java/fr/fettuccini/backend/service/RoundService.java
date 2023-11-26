package fr.fettuccini.backend.service;

import fr.fettuccini.backend.enums.PokerExceptionType;
import fr.fettuccini.backend.enums.RoundStep;
import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.*;
import fr.fettuccini.backend.model.request.PlayerActionRequest;
import fr.fettuccini.backend.model.response.PlayerActionResponse;
import fr.fettuccini.backend.utils.PokerUtils;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoundService {
    @Resource
    private RoundValidationService roundValidationService;

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
    public PlayerActionResponse buildPlayerActionResponse(GameSession currentGame, Round round, Action action){
        PlayerActionResponse playerActionResponse = new PlayerActionResponse();
        playerActionResponse.setRoundId(round.getId());
        playerActionResponse.setSessionId(currentGame.getId());
        playerActionResponse.setCurrentPotAmount(round.getPotAmount());
        playerActionResponse.setRoundStep(round.getRoundStep());
        playerActionResponse.setRoundPlayersActionsHistory(ActionsByRoundStep.buildActionByRoundStepFromActionList(round.getActions()));

        Optional<Player> nextPlayerToPlay = PokerUtils.getNextPlayerToPlay(action, currentGame, round);
        nextPlayerToPlay.ifPresent(playerActionResponse::setCurrentPlayingUser);

        return playerActionResponse;
    }

    /**
     * Sets a player's action for a given round.
     *
     * @param playerActionRequest The request containing the player's action.
     * @param gameSession         The game session in which the action is to be set.
     * @return PlayerActionResponse after setting the player's action.
     */
    public PlayerActionResponse setPlayerAction(PlayerActionRequest playerActionRequest, GameSession gameSession) throws PokerException {
        Round currentRound = gameSession.getRounds()
                .stream()
                .filter(round -> round.getId().equals(playerActionRequest.getRoundId()))
                .findFirst()
                .orElseThrow(() ->
                        new PokerException(PokerExceptionType.ROUND_NOT_FOUND,
                                String.format(PokerExceptionType.ROUND_NOT_FOUND.getMessage(), playerActionRequest.getRoundId())));

        roundValidationService.validatePayerActionRoundStep(playerActionRequest, gameSession, currentRound);

        if(playerActionRequest.getAction().getActionType().equals(Action.ActionType.BET) ||
                playerActionRequest.getAction().getActionType().equals(Action.ActionType.RAISE)){
            playerMakeABet(
                    PokerUtils.getPlayerBySeatIndex(gameSession, playerActionRequest.getAction().getSeatIndex()),
                    playerActionRequest.getAction(),
                    currentRound
            );
        } else if (playerActionRequest.getAction().getActionType().equals(Action.ActionType.CALL)){
            playerMakeACall(
                    PokerUtils.getPlayerBySeatIndex(gameSession, playerActionRequest.getAction().getSeatIndex()),
                    playerActionRequest.getAction(),
                    currentRound
            );
        } else {
            Action action = playerActionRequest.getAction();
            action.setAmount(0);
            currentRound.addAction(playerActionRequest.getAction());
        }

        manageRoundStepProgression(gameSession, currentRound);

        currentRound.setNextPlayerToPlaySeatIndex(
                PokerUtils.getNextPlayerIndex(
                    PokerUtils.getPlayersWithoutFoldThisRound(gameSession, currentRound)
                        .stream()
                        .map(Player::getSeatIndex).toList(),
                        playerActionRequest.getAction().getSeatIndex()
                )
        );

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

        Optional<Player> smallBlindPlayer = PokerUtils.getSmallBlindPlayer(players, currentRound);

        if(smallBlindPlayer.isPresent()){
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
    public void playerMakeABet(Player player, Action action, Round round){
        Integer betAmount = action.getAmount();
        if(player.getBalance() < betAmount){
            action.setAmount(player.getBalance());
        }
        Integer amountToDecreaseFromPlayerBalance = getValueToDecreaseFromPlayerBalance(round, action);
        player.setBalance(player.getBalance() - amountToDecreaseFromPlayerBalance);
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
    private Integer getValueToDecreaseFromPlayerBalance(Round round, Action action){
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
        Integer amountToDecreaseFromPlayerBalance = getValueToDecreaseFromPlayerBalance(round, action);
        player.setBalance(player.getBalance() - amountToDecreaseFromPlayerBalance);
        round.addAction(action);
        round.setPotAmount(round.getPotAmount() + amountToDecreaseFromPlayerBalance);
    }

    /**
     * Manages the progression of the round step based on the current state of the game.
     * It progresses the round through the different stages (Pre-flop, Flop, Turn, River, Showdown)
     * based on the actions taken by the players.
     *
     * @param currentGame The current game session.
     * @param round The round whose progression is to be managed.
     */
    public void manageRoundStepProgression(GameSession currentGame, Round round){
        if(PokerUtils.didAllPlayersPlayedThisRoundStep(round, currentGame)){
            if(round.getRoundStep().equals(RoundStep.PREFLOP)){
                round.setRoundStep(RoundStep.FLOP);
            } else if(round.getRoundStep().equals(RoundStep.FLOP)){
                round.setRoundStep(RoundStep.TURN);
            } else if(round.getRoundStep().equals(RoundStep.TURN)){
                round.setRoundStep(RoundStep.RIVER);
            } else if(round.getRoundStep().equals(RoundStep.RIVER)){
                round.setRoundStep(RoundStep.SHOWDOWN);
            }
        }

        if(isRoundFinished(currentGame, round)){
            round.setRoundStep(RoundStep.FINISHED);
        }
    }

    /**
     * Determines whether the current round is finished.
     * A round is considered finished if it reaches the Showdown step or if only one player hasn't folded.
     *
     * @param currentGame The current game session.
     * @param round The round to be checked for completion.
     * @return {@code true} if the round is finished, {@code false} otherwise.
     */
    public boolean isRoundFinished(GameSession currentGame, Round round){
        return round.getRoundStep().equals(RoundStep.SHOWDOWN) ||
                PokerUtils.getPlayersWithoutFoldThisRound(currentGame, round).size() == 1;
    }

}
