package fr.fettuccini.backend.service;

import fr.fettuccini.backend.TestUtils;
import fr.fettuccini.backend.enums.PokerExceptionType;
import fr.fettuccini.backend.enums.RoundStep;
import fr.fettuccini.backend.model.poker.GameSession;
import fr.fettuccini.backend.model.poker.Player;
import fr.fettuccini.backend.model.poker.Round;
import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.Action;
import fr.fettuccini.backend.model.request.PlayerActionRequest;
import fr.fettuccini.backend.model.response.PlayerActionResponse;
import fr.fettuccini.backend.utils.PokerUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class RoundServiceTests {

    @Mock
    private RoundValidationService roundValidationService;

    @InjectMocks
    private RoundService roundService;

    GameSession mockGameSession;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockGameSession = mock(GameSession.class);
        mockGameSession.startGame();
        when(mockGameSession.getDateGameStarted()).thenReturn(LocalDateTime.now());
        when(mockGameSession.getId()).thenReturn(UUID.randomUUID().toString());
        when(mockGameSession.getPlayers()).thenReturn(TestUtils.createPlayers());
        when(mockGameSession.getLevelsStructure()).thenReturn(TestUtils.createLevelsStructure());
    }

    @Test
    void testInitializeRoundForGame() throws PokerException {
        PlayerActionResponse response = roundService.initializeRoundForGame(mockGameSession);
        assertNotNull(response);
        assertNotNull(response.getRoundId());
        verify(mockGameSession, times(1)).addRound(any(Round.class));
    }

    @Test
    void testSetPlayerAction() throws PokerException {
        PlayerActionRequest mockRequest = mock(PlayerActionRequest.class);
        when(mockRequest.getRoundId()).thenReturn(UUID.randomUUID().toString());
        doThrow(new PokerException(PokerExceptionType.ROUND_NOT_FOUND, "Round not found"))
                .when(roundValidationService).validatePlayerActionRoundStep(any(), any(), any());
        assertThrows(PokerException.class, () -> roundService.setPlayerAction(mockRequest, mockGameSession));
    }

    @Test
    void testSetPlayerActionSuccess() {
        try (MockedStatic<PokerUtils> mocked = mockStatic(PokerUtils.class)) {
            mocked.when(() -> PokerUtils.getPlayerBySeatIndex(any(GameSession.class), anyInt()))
                    .thenReturn(TestUtils.createPlayers().get(0));
            GameSession gameSession = new GameSession();
            gameSession.setId("gameSessionId");
            Player player = new Player();
            player.setSeatIndex(1);
            gameSession.setPlayers(List.of(player));
            Round round = new Round();
            round.setId("roundId");
            round.setPotAmount(0);
            round.setRoundIndex(1);
            round.setRoundStep(RoundStep.PREFLOP);
            gameSession.setRounds(List.of(round));
            PlayerActionRequest playerActionRequest = new PlayerActionRequest();
            playerActionRequest.setRoundId("roundId");
            playerActionRequest.setAction(new Action(Action.ActionType.BET, 100, 1, RoundStep.PREFLOP));
            assertDoesNotThrow(() -> {
                PlayerActionResponse response = roundService.setPlayerAction(playerActionRequest, gameSession);
                assertNotNull(response);
            });
        }
    }

    @Test
    void testProgressRoundStep() throws PokerException {
        try (MockedStatic<PokerUtils> mocked = mockStatic(PokerUtils.class)) {
            List<Player> players = TestUtils.createPlayers();
            mocked.when(() -> PokerUtils.getPlayerBySeatIndex(any(GameSession.class), anyInt()))
                    .thenReturn(players.get(2));
            mocked.when(() -> PokerUtils.getSmallBlindPlayer(anyList(), any(Round.class)))
                    .thenReturn(Optional.of(players.get(3)));
            mocked.when(() -> PokerUtils.getBigBlindPlayer(anyList(), any(Round.class)))
                    .thenReturn(Optional.of(players.get(4)));
            mocked.when(() -> PokerUtils.didAllPlayersPlayedThisRoundStep(any(Round.class), any(GameSession.class), any(Action.class)))
                    .thenReturn(true);
            Round mockRound = new Round();
            mockRound.setRoundStep(RoundStep.PREFLOP);
            mockRound.setId("roundId");
            mockRound.setPotAmount(0);
            mockRound.setCurrentLevel(TestUtils.createLevelsStructure().get(0));
            roundService.applyBlindsToRound(mockGameSession, mockRound);
            when(mockGameSession.getRounds()).thenReturn(List.of(mockRound));
            when(mockGameSession.getPlayers()).thenReturn(players);
            PlayerActionRequest mockRequest = new PlayerActionRequest();
            mockRequest.setAction(new Action(Action.ActionType.CALL, 10, 2, RoundStep.PREFLOP));
            mockRequest.setRoundId("roundId");
            roundService.setPlayerAction(mockRequest, mockGameSession);
            assertNotEquals(RoundStep.PREFLOP, mockRound.getRoundStep());
            assertEquals(RoundStep.FLOP, mockRound.getRoundStep());
        }
    }

    @Test
    void testApplyBlindsToRound() {
        try (MockedStatic<PokerUtils> mocked = mockStatic(PokerUtils.class)) {
            List<Player> players = TestUtils.createPlayers();
            mocked.when(() -> PokerUtils.getBigBlindPlayer(anyList(), any(Round.class)))
                    .thenReturn(Optional.of(players.get(4)));
            Round mockRound = Mockito.mock(Round.class);
            when(mockRound.getRoundStep()).thenReturn(RoundStep.PREFLOP);
            when(mockRound.getId()).thenReturn("roundId");
            when(mockRound.getPotAmount()).thenReturn(0);
            when(mockRound.getCurrentLevel()).thenReturn(TestUtils.createLevelsStructure().get(0));
            Action bigBlindAction = roundService.applyBlindsToRound(mockGameSession, mockRound);
            assertNotNull(bigBlindAction);
            assertTrue(bigBlindAction.getAmount() > 0);
            verify(mockRound, atLeastOnce()).addAction(any(Action.class));
        }
    }

    @Test
    void testFindRoundById() {
        GameSession gameSession = new GameSession();
        Round round = new Round();
        round.setId("roundId");
        gameSession.addRound(round);
        assertDoesNotThrow(() -> {
            Round foundRound = roundService.findRoundById("roundId", gameSession);
            assertNotNull(foundRound);
            assertEquals("roundId", foundRound.getId());
        });
    }

    @Test
    void testFindRoundByIdNotFound() {
        GameSession mockGameSession = new GameSession();
        assertThrows(PokerException.class, () -> {
            roundService.findRoundById(UUID.randomUUID().toString(), mockGameSession);
        });
    }

    @Test
    void testPlayerMakeABet() {
        GameSession gameSession = new GameSession();
        Player player = new Player();
        player.setBalance(1000);
        Action action = new Action(Action.ActionType.BET, 500, 1, RoundStep.PREFLOP);
        Round round = new Round();
        round.setActions(new ArrayList<>());
        round.setPotAmount(0);
        roundService.playerMakeABet(player, action, round, gameSession);
        assertEquals(500, player.getBalance().intValue());
        assertFalse(round.getActions().isEmpty());
    }

    @Test
    void testManageRoundStepProgressionToFlop() {
        try (MockedStatic<PokerUtils> mocked = mockStatic(PokerUtils.class)) {
            when(PokerUtils.didAllPlayersPlayedThisRoundStep(any(Round.class), any(GameSession.class), any(Action.class)))
                    .thenReturn(true);

            Action action = new Action(Action.ActionType.CALL, 10, 1, RoundStep.PREFLOP);

            GameSession gameSession = new GameSession();
            Round round = new Round();
            round.setRoundStep(RoundStep.PREFLOP);
            gameSession.addRound(round);
            roundService.manageRoundStepProgression(gameSession, round, action);
            assertEquals(RoundStep.FLOP, round.getRoundStep());
        }
    }

    @Test
    void testActionUpdatesRoundPot() throws PokerException {
        GameSession gameSession = setupGameSessionWithOnePlayerAndRound();
        gameSession.setPlayers(TestUtils.createPlayers());
        gameSession.getRounds().get(0).setRoundStep(RoundStep.PREFLOP);
        PlayerActionRequest playerActionRequest = new PlayerActionRequest();
        playerActionRequest.setRoundId("roundId");
        playerActionRequest.setAction(new Action(Action.ActionType.BET, 100, 1, RoundStep.PREFLOP));
        try (MockedStatic<PokerUtils> mockedStatic = mockStatic(PokerUtils.class)) {
            mockedStatic.when(() -> PokerUtils.getPlayerBySeatIndex(any(), eq(1)))
                    .thenReturn(gameSession.getPlayers().get(0));
            PlayerActionResponse response = roundService.setPlayerAction(playerActionRequest, gameSession);
            assertEquals(100, gameSession.getRounds().get(0).getPotAmount());
        }
    }

    private GameSession setupGameSessionWithOnePlayerAndRound() {
        GameSession gameSession = new GameSession();
        gameSession.setId("gameSessionId");
        Player player = new Player();
        player.setSeatIndex(1);
        gameSession.setPlayers(List.of(player));
        Round round = new Round();
        round.setId("roundId");
        round.setPotAmount(0);
        gameSession.setRounds(List.of(round));
        return gameSession;
    }
}
