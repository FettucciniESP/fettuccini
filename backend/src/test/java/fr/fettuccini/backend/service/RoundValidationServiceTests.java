package fr.fettuccini.backend.service;

import fr.fettuccini.backend.TestUtils;
import fr.fettuccini.backend.enums.RoundStep;
import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.*;
import fr.fettuccini.backend.model.request.PlayerActionRequest;
import fr.fettuccini.backend.utils.PokerUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class RoundValidationServiceTests {

    @Autowired
    private RoundValidationService roundValidationService;
    private GameSession gameSession;
    private Round round;

    @BeforeEach
    public void setUp() {
        Integer defaultRoundIndex = 1;

        this.gameSession = new GameSession();
        gameSession.startGame();
        gameSession.setLevelsStructure(TestUtils.createLevelsStructure());

        round = new Round();
        round.setId("roundId");
        round.setRoundIndex(defaultRoundIndex);
        round.setRoundStep(RoundStep.PREFLOP);
        round.setNextPlayerToPlaySeatIndex(1);
        round.setCurrentLevel(PokerUtils.getCurrentLevelByTime(gameSession));

        gameSession.addRound(round);
    }



    @Test
    public void testPlayerActionSameRoundStepThanExpected() {
        var playerActionRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.FOLD,
                0,
                1,
                round);

        Assertions.assertDoesNotThrow(() -> {
            roundValidationService.validatePayerActionRoundStep(playerActionRequest, gameSession, round);
        });
    }

    @Test
    public void testPlayerActionDifferentRoundStepThanExpected() {
        var playerActionRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.FOLD,
                0,
                1,
                round,
                RoundStep.FLOP);

        Exception exception = assertThrows(PokerException.class,
                () -> {
                    roundValidationService.validatePayerActionRoundStep(playerActionRequest, gameSession, round);
                });

        assertEquals("BAD_ROUND_STEP : Round with id roundId is not in step FLOP", exception.getMessage());
    }

    @Test
    public void testIsPlayerActionForRoundAlreadyFinished() {
        var playerActionRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.FOLD,
                0,
                1,
                round);

        round.setRoundStep(RoundStep.SHOWDOWN);

        Exception exception = assertThrows(PokerException.class,
                () -> {
                    roundValidationService.validatePayerActionRoundStep(playerActionRequest, gameSession, round);
                });

        assertEquals("BAD_ROUND : Round with id roundId is not the current round", exception.getMessage());
    }

    @Test
    public void testIsPlayerActionSamePlayerThanExpected() {
        var playerActionRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.FOLD,
                0,
                2,
                round);

        Exception exception = assertThrows(PokerException.class,
                () -> {
                    roundValidationService.validatePayerActionRoundStep(playerActionRequest, gameSession, round);
                });

        assertEquals("EXPECTED_OTHER_PLAYER_ACTION : Expected player seat 1 to make action", exception.getMessage());
    }

    @Test
    public void testIsPlayerStillInTheRound() {
        var playerActionRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.FOLD,
                0,
                1,
                round);

        Action foldAction = new Action(
                Action.ActionType.FOLD,
                0,
                1,
                RoundStep.PREFLOP
        );

        round.addAction(foldAction);

        Exception exception = assertThrows(PokerException.class,
                () -> {
                    roundValidationService.validatePayerActionRoundStep(playerActionRequest, gameSession, round);
                });

        assertEquals("PLAYER_ALREADY_FOLD : Player seat 1 already fold", exception.getMessage());
    }

    @Test
    public void testIsPlayerActionAmountValid() {
        Action betAction = new Action(
                Action.ActionType.BET,
                10,
                6,
                RoundStep.PREFLOP
        );

        round.addAction(betAction);

        var playerActionFoldRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.FOLD,
                0,
                1,
                round);

        assertDoesNotThrow(
                () -> roundValidationService.validatePayerActionRoundStep(playerActionFoldRequest, gameSession, round)
        );

        var playerActionBetUnderBigBlindValueRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.BET,
                8,
                1,
                round);

        Exception exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePayerActionRoundStep(playerActionBetUnderBigBlindValueRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionBetIncreaseUnderBigBlindValueRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.BET,
                12,
                1,
                round);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePayerActionRoundStep(playerActionBetIncreaseUnderBigBlindValueRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionCallUnderRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.CALL,
                5,
                1,
                round);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePayerActionRoundStep(playerActionCallUnderRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionCallHigherRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.CALL,
                15,
                1,
                round);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePayerActionRoundStep(playerActionCallHigherRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionCallLegitRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.CALL,
                10,
                1,
                round);

        assertDoesNotThrow(
                () -> roundValidationService.validatePayerActionRoundStep(playerActionCallLegitRequest, gameSession, round)
        );

        var playerActionRaiseLegitRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.RAISE,
                100,
                1,
                round);

        assertDoesNotThrow(
                () -> roundValidationService.validatePayerActionRoundStep(playerActionRaiseLegitRequest, gameSession, round)
        );

        var playerActionRaiseUnderBigBlindValueRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.RAISE,
                8,
                1,
                round);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePayerActionRoundStep(playerActionRaiseUnderBigBlindValueRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionRaiseIncreaseUnderBigBlindValueRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.RAISE,
                14,
                1,
                round);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePayerActionRoundStep(playerActionRaiseIncreaseUnderBigBlindValueRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());
    }
}
