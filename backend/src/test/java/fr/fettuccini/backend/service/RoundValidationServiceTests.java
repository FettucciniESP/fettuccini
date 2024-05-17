package fr.fettuccini.backend.service;

import fr.fettuccini.backend.TestUtils;
import fr.fettuccini.backend.enums.RoundStep;
import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.*;
import fr.fettuccini.backend.utils.PokerUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

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

        Player player = new Player();
        player.setSeatIndex(1);
        player.setBalance(1000);
        gameSession.getPlayers().add(player);

        Action action = new Action(
                Action.ActionType.BET,
                10,
                1,
                RoundStep.PREFLOP
        );

        round = new Round();
        round.setId("roundId");
        round.setRoundIndex(defaultRoundIndex);
        round.setRoundStep(RoundStep.PREFLOP);
        round.setNextPlayerToPlaySeatIndex(1);
        round.setCurrentLevel(PokerUtils.getCurrentLevelByTime(gameSession));
        round.addAction(action);

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
            roundValidationService.validatePlayerActionRoundStep(playerActionRequest, gameSession, round);
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
                    roundValidationService.validatePlayerActionRoundStep(playerActionRequest, gameSession, round);
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
                    roundValidationService.validatePlayerActionRoundStep(playerActionRequest, gameSession, round);
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
                    roundValidationService.validatePlayerActionRoundStep(playerActionRequest, gameSession, round);
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
                    roundValidationService.validatePlayerActionRoundStep(playerActionRequest, gameSession, round);
                });

        assertEquals("PLAYER_ALREADY_FOLD : Player seat 1 already fold", exception.getMessage());
    }

    @Test
    public void testIsPlayerActionAmountValid() {
        Action betAction = new Action(
                Action.ActionType.BET,
                10,
                1,
                RoundStep.PREFLOP
        );
        
        Player player = new Player();
        player.setSeatIndex(2);
        player.setBalance(1000);
        gameSession.getPlayers().add(player);

        round.addAction(betAction);
        round.setNextPlayerToPlaySeatIndex(2);

        var playerActionFoldRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.FOLD,
                0,
                2,
                round);

        assertDoesNotThrow(
                () -> roundValidationService.validatePlayerActionRoundStep(playerActionFoldRequest, gameSession, round)
        );

        var playerActionBetUnderBigBlindValueRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.BET,
                8,
                2,
                round);

        Exception exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePlayerActionRoundStep(playerActionBetUnderBigBlindValueRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionBetIncreaseUnderBigBlindValueRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.BET,
                12,
                2,
                round);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePlayerActionRoundStep(playerActionBetIncreaseUnderBigBlindValueRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionCallUnderRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.CALL,
                5,
                2,
                round);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePlayerActionRoundStep(playerActionCallUnderRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionCallHigherRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.CALL,
                15,
                2,
                round);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePlayerActionRoundStep(playerActionCallHigherRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionCallLegitRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.CALL,
                10,
                2,
                round);

        assertDoesNotThrow(
                () -> roundValidationService.validatePlayerActionRoundStep(playerActionCallLegitRequest, gameSession, round)
        );

        var playerActionRaiseLegitRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.RAISE,
                100,
                2,
                round);

        assertDoesNotThrow(
                () -> roundValidationService.validatePlayerActionRoundStep(playerActionRaiseLegitRequest, gameSession, round)
        );

        var playerActionRaiseUnderBigBlindValueRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.RAISE,
                8,
                2,
                round);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePlayerActionRoundStep(playerActionRaiseUnderBigBlindValueRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionRaiseIncreaseUnderBigBlindValueRequest = TestUtils.createPlayerActionRequest(
                Action.ActionType.RAISE,
                14,
                2,
                round);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePlayerActionRoundStep(playerActionRaiseIncreaseUnderBigBlindValueRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());
    }
}
