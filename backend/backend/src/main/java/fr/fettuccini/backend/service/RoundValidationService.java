package fr.fettuccini.backend.service;

import fr.fettuccini.backend.enums.RoundStep;
import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.GameSession;
import fr.fettuccini.backend.model.poker.Round;
import fr.fettuccini.backend.model.request.PlayerActionRequest;
import fr.fettuccini.backend.utils.PokerUtils;
import fr.fettuccini.backend.enums.PokerExceptionType;
import org.springframework.stereotype.Service;

@Service
public class RoundValidationService {

    /**
     * Validates a player's action in the context of the current round and game session.
     * This method checks various conditions like whether the round is already finished,
     * if the action is from the expected player, and if the action amount is valid.
     *
     * @param playerActionRequest The request containing the player's action.
     * @param currentGame The current game session.
     * @param round The current round of the game.
     * @throws PokerException if any validation fails.
     */
    public void validatePayerActionRoundStep(PlayerActionRequest playerActionRequest, GameSession currentGame, Round round) throws PokerException {
        isPlayerActionForRoundAlreadyFinished(playerActionRequest, round);
        isPlayerActionSamePlayerThanExpected(playerActionRequest, round);
        isPlayerActionSameRoundStepThanExpected(playerActionRequest, round);
        isPlayerStillInTheRound(playerActionRequest, round, currentGame);
        isPlayerActionAmountValid(playerActionRequest, round, currentGame);
    }

    /**
     * Checks if the player's action is appropriate for the current round step.
     *
     * @param playerActionRequest The player action request being validated.
     * @param round The current round in which the action is being made.
     * @throws PokerException Thrown if the player's action does not match the expected round step.
     */
    private void isPlayerActionSameRoundStepThanExpected(PlayerActionRequest playerActionRequest, Round round) throws PokerException {
        if(!playerActionRequest.getAction().getRoundStep().equals(round.getRoundStep())){
            throw new PokerException(PokerExceptionType.BAD_ROUND_STEP,
                    String.format(PokerExceptionType.BAD_ROUND_STEP.getMessage(), playerActionRequest.getRoundId()));
        }
    }

    /**
     * Validates that the player's action is allowed in the current state of the round.
     *
     * @param playerActionRequest The player action request being validated.
     * @param round The current round in which the action is being made.
     * @throws PokerException Thrown if the round is already finished or at the showdown step.
     */
    private void isPlayerActionForRoundAlreadyFinished(PlayerActionRequest playerActionRequest, Round round) throws PokerException {
        if(round.getRoundStep().equals(RoundStep.FINISHED) ||
                round.getRoundStep().equals(RoundStep.SHOWDOWN)){
            throw new PokerException(PokerExceptionType.BAD_ROUND,
                    String.format(PokerExceptionType.BAD_ROUND.getMessage(), playerActionRequest.getRoundId()));
        }
    }

    /**
     * Validates that the player's action is coming from the player who is expected to act next.
     *
     * @param playerActionRequest The player action request being validated.
     * @param round               The current round in which the action is being made.
     * @throws PokerException Thrown if the action is not from the expected player.
     */
    private void isPlayerActionSamePlayerThanExpected(PlayerActionRequest playerActionRequest, Round round) throws PokerException {
        if(!playerActionRequest.getAction().getSeatIndex().equals(round.getNextPlayerToPlaySeatIndex())){
            throw new PokerException(PokerExceptionType.EXPECTED_OTHER_PLAYER_ACTION,
                    String.format(PokerExceptionType.EXPECTED_OTHER_PLAYER_ACTION.getMessage(), round.getNextPlayerToPlaySeatIndex()));
        }
    }

    /**
     * Validates that the player is still in the round.
     *
     * @param playerActionRequest The player action request being validated.
     * @param round The current round in which the action is being made.
     * @param currentGame The current game session.
     * @throws PokerException Thrown if the player is not in the round.
     */
    private void isPlayerStillInTheRound(PlayerActionRequest playerActionRequest, Round round, GameSession currentGame) throws PokerException {
        if(PokerUtils.getPlayersWithoutFoldThisRound(currentGame,round).stream()
                .noneMatch(player -> player.getSeatIndex().equals(playerActionRequest.getAction().getSeatIndex()))){
            throw new PokerException(PokerExceptionType.PLAYER_ALREADY_FOLD,
                    String.format(PokerExceptionType.PLAYER_ALREADY_FOLD.getMessage(), playerActionRequest.getAction().getSeatIndex()));
        }
    }

    /**
     * Validates that the player's action amount is valid.
     *
     * @param playerActionRequest The player action request being validated.
     * @param round The current round in which the action is being made.
     * @param currentGame The current game session.
     * @throws PokerException Thrown if the player's action amount is not valid.
     */
    private void isPlayerActionAmountValid(PlayerActionRequest playerActionRequest, Round round, GameSession currentGame) throws PokerException {
        switch (playerActionRequest.getAction().getActionType()) {
            case FOLD, CHECK -> playerActionRequest.getAction().getAmount().equals(0);
            case BET, RAISE -> isBetAmountValid(playerActionRequest, round);
            case CALL -> isCallAmountValid(playerActionRequest, round);
        }
    }

    /**
     * Validates that the bet amount in the player's action is valid.
     *
     * @param playerActionRequest The player action request being validated.
     * @param round The current round in which the action is being made.
     * @throws PokerException Thrown if the bet amount is not valid.
     */
    private void isBetAmountValid(PlayerActionRequest playerActionRequest, Round round) throws PokerException {
        Integer highestBetValue = PokerUtils.getHighestBetValueForCurrentRoundStep(round);
        if(playerActionRequest.getAction().getAmount() - highestBetValue >= highestBetValue){
            throw new PokerException(PokerExceptionType.BAD_BET_AMOUNT,
                    String.format(PokerExceptionType.BAD_BET_AMOUNT.getMessage(), highestBetValue));
        }
    }

    /**
     * Validates that the call amount in the player's action is valid.
     *
     * @param playerActionRequest The player action request being validated.
     * @param round The current round in which the action is being made.
     * @throws PokerException Thrown if the call amount is not valid.
     */
    private void isCallAmountValid(PlayerActionRequest playerActionRequest, Round round) throws PokerException {
        Integer amountToCall = PokerUtils.getHighestBetValueForCurrentRoundStep(round);
        if(!playerActionRequest.getAction().getAmount().equals(amountToCall)){
            throw new PokerException(PokerExceptionType.BAD_BET_AMOUNT,
                    String.format(PokerExceptionType.BAD_BET_AMOUNT.getMessage(), amountToCall));
        }
    }
}
