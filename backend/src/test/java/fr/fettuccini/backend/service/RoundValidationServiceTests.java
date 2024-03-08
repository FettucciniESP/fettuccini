package fr.fettuccini.backend.service;

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
        gameSession.setLevelsStructure(createLevelsStructure());

        round = new Round();
        round.setId("roundId");
        round.setRoundIndex(defaultRoundIndex);
        round.setRoundStep(RoundStep.PREFLOP);
        round.setNextPlayerToPlaySeatIndex(1);
        round.setCurrentLevel(PokerUtils.getCurrentLevelByTime(gameSession));

        gameSession.addRound(round);
    }

    public List<Level> createLevelsStructure(){
        Level level1 = new Level();
        level1.setRoundIndex(1);
        level1.setBigBlindAmount(10);
        level1.setSmallBlindAmount(5);
        level1.setAnteAmount(0);
        level1.setDuration(15);

        Level level2 = new Level();
        level2.setRoundIndex(2);
        level2.setBigBlindAmount(20);
        level2.setSmallBlindAmount(10);
        level2.setAnteAmount(0);
        level2.setDuration(15);

        List<Level> levels = new ArrayList<>();
        levels.add(level1);
        levels.add(level2);

        return levels;
    }

    public PlayerActionRequest createPlayerActionRequest(RoundStep roundStep,
                                                         Action.ActionType actionType,
                                                         Integer amount,
                                                         Integer seatIndex) {
        Action action = new Action(actionType, amount, seatIndex, roundStep);

        PlayerActionRequest playerActionRequest = new PlayerActionRequest();
        playerActionRequest.setRoundId(round.getId());
        playerActionRequest.setAction(action);
        return playerActionRequest;
    }

    @Test
    public void testPlayerActionSameRoundStepThanExpected() {
        var playerActionRequest = createPlayerActionRequest(
                RoundStep.PREFLOP,
                Action.ActionType.FOLD,
                0,
                1);

        Assertions.assertDoesNotThrow(() -> {
            roundValidationService.validatePayerActionRoundStep(playerActionRequest, gameSession, round);
        });
    }

    @Test
    public void testPlayerActionDifferentRoundStepThanExpected() {
        var playerActionRequest = createPlayerActionRequest(
                RoundStep.FLOP,
                Action.ActionType.FOLD,
                0,
                1);

        Exception exception = assertThrows(PokerException.class,
                () -> {
                    roundValidationService.validatePayerActionRoundStep(playerActionRequest, gameSession, round);
                });

        assertEquals("BAD_ROUND_STEP : Round with id roundId is not in step FLOP", exception.getMessage());
    }

    @Test
    public void testIsPlayerActionForRoundAlreadyFinished() {
        var playerActionRequest = createPlayerActionRequest(
                RoundStep.PREFLOP,
                Action.ActionType.FOLD,
                0,
                1);

        round.setRoundStep(RoundStep.SHOWDOWN);

        Exception exception = assertThrows(PokerException.class,
                () -> {
                    roundValidationService.validatePayerActionRoundStep(playerActionRequest, gameSession, round);
                });

        assertEquals("BAD_ROUND : Round with id roundId is not the current round", exception.getMessage());
    }

    @Test
    public void testIsPlayerActionSamePlayerThanExpected() {
        var playerActionRequest = createPlayerActionRequest(
                RoundStep.PREFLOP,
                Action.ActionType.FOLD,
                0,
                2);

        Exception exception = assertThrows(PokerException.class,
                () -> {
                    roundValidationService.validatePayerActionRoundStep(playerActionRequest, gameSession, round);
                });

        assertEquals("EXPECTED_OTHER_PLAYER_ACTION : Expected player seat 1 to make action", exception.getMessage());
    }

    @Test
    public void testIsPlayerStillInTheRound() {
        var playerActionRequest = createPlayerActionRequest(
                RoundStep.PREFLOP,
                Action.ActionType.FOLD,
                0,
                1);

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

        var playerActionFoldRequest = createPlayerActionRequest(
                RoundStep.PREFLOP,
                Action.ActionType.FOLD,
                0,
                1);

        assertDoesNotThrow(
                () -> roundValidationService.validatePayerActionRoundStep(playerActionFoldRequest, gameSession, round)
        );

        var playerActionBetUnderBigBlindValueRequest = createPlayerActionRequest(
                RoundStep.PREFLOP,
                Action.ActionType.BET,
                8,
                1);

        Exception exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePayerActionRoundStep(playerActionBetUnderBigBlindValueRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionBetIncreaseUnderBigBlindValueRequest = createPlayerActionRequest(
                RoundStep.PREFLOP,
                Action.ActionType.BET,
                12,
                1);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePayerActionRoundStep(playerActionBetIncreaseUnderBigBlindValueRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionCallUnderRequest = createPlayerActionRequest(
                RoundStep.PREFLOP,
                Action.ActionType.CALL,
                5,
                1);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePayerActionRoundStep(playerActionCallUnderRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionCallHigherRequest = createPlayerActionRequest(
                RoundStep.PREFLOP,
                Action.ActionType.CALL,
                15,
                1);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePayerActionRoundStep(playerActionCallHigherRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionCallLegitRequest = createPlayerActionRequest(
                RoundStep.PREFLOP,
                Action.ActionType.CALL,
                10,
                1);

        assertDoesNotThrow(
                () -> roundValidationService.validatePayerActionRoundStep(playerActionCallLegitRequest, gameSession, round)
        );

        var playerActionRaiseLegitRequest = createPlayerActionRequest(
                RoundStep.PREFLOP,
                Action.ActionType.RAISE,
                100,
                1);

        assertDoesNotThrow(
                () -> roundValidationService.validatePayerActionRoundStep(playerActionRaiseLegitRequest, gameSession, round)
        );

        var playerActionRaiseUnderBigBlindValueRequest = createPlayerActionRequest(
                RoundStep.PREFLOP,
                Action.ActionType.RAISE,
                8,
                1);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePayerActionRoundStep(playerActionRaiseUnderBigBlindValueRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());

        var playerActionRaiseIncreaseUnderBigBlindValueRequest = createPlayerActionRequest(
                RoundStep.PREFLOP,
                Action.ActionType.RAISE,
                14,
                1);

        exception = assertThrows(PokerException.class,
                () -> roundValidationService.validatePayerActionRoundStep(playerActionRaiseIncreaseUnderBigBlindValueRequest, gameSession, round)
        );

        assertEquals("BAD_BET_AMOUNT : Minimum bet amount is 10", exception.getMessage());
    }
}
