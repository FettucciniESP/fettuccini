package fr.fettuccini.backend.service;

import fr.fettuccini.backend.TestUtils;
import fr.fettuccini.backend.enums.*;
import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.*;
import fr.fettuccini.backend.model.request.CardMisreadRequest;
import fr.fettuccini.backend.model.request.PlayerActionRequest;
import fr.fettuccini.backend.model.response.PlayerActionResponse;
import fr.fettuccini.backend.utils.PokerUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class RoundServiceTests {

    @Mock
    private RoundValidationService roundValidationService;

    @Mock
    private WledService wledService;

    @Mock
    private PokerEvaluatorService pokerEvaluatorService;

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
    @Disabled
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

    @Test
    void testDetermineWinnerAndAllocatePot() throws PokerException {
        GameSession gameSession = new GameSession();
        gameSession.setId("gameSessionId");
        Round round = new Round();
        round.setId("roundId");
        round.setPotAmount(100);
        round.setRoundStep(RoundStep.SHOWDOWN);
        round.setButtonSeatIndex(1);

        Player player1 = new Player();
        player1.setSeatIndex(1);
        player1.setBalance(1000);
        player1.setHand(new HashSet<>(Set.of(new Card(CardType.HEARTS, CardValue.ACE))));

        Player player2 = new Player();
        player2.setSeatIndex(2);
        player2.setBalance(1000);
        player2.setHand(new HashSet<>(Set.of(new Card(CardType.SPADES, CardValue.ACE))));

        gameSession.setPlayers(List.of(player1, player2));
        gameSession.setRounds(List.of(round));

        round.setBoard(new Board());
        round.getBoard().addCards(Set.of(
                new Card(CardType.HEARTS, CardValue.TEN),
                new Card(CardType.SPADES, CardValue.JACK),
                new Card(CardType.HEARTS, CardValue.QUEEN)
        ),
                CommunityCardType.FLOP);

        when(pokerEvaluatorService.evaluateHand(any(), any())).thenReturn(100L, 90L);

        roundService.determineWinnerAndAllocatePot(gameSession, round);

        assertEquals(1100, player1.getBalance());
        assertEquals(1000, player2.getBalance());
        assertEquals(RoundStep.FINISHED, round.getRoundStep());
    }

    @Test
    void testHandleCardMisread() throws PokerException {
        GameSession gameSession = new GameSession();
        gameSession.setId("gameSessionId");
        Round round = new Round();
        round.setId("roundId");
        round.setRoundStep(RoundStep.ACTION_NEEDED);
        round.setButtonSeatIndex(1);
        round.setNextPlayerToPlaySeatIndex(1);
        gameSession.setRounds(List.of(round));

        Player player = new Player();
        player.setSeatIndex(1);
        player.setHand(new HashSet<>());
        gameSession.setPlayers(List.of(player));

        CardMisreadRequest cardMisreadRequest = new CardMisreadRequest();
        cardMisreadRequest.setRoundId("roundId");
        cardMisreadRequest.setPlayerSeatId(1);
        cardMisreadRequest.setCards(List.of(new Card(CardType.HEARTS, CardValue.ACE)));

        PlayerActionResponse response = roundService.handleCardMisread(cardMisreadRequest, gameSession);

        assertEquals(1, player.getHand().size());
        assertTrue(player.getHand().contains(new Card(CardType.HEARTS, CardValue.ACE)));
        assertNotNull(response);
    }

    @Test
    void testHandleCommunityCardMisread() throws PokerException {
        GameSession gameSession = new GameSession();
        gameSession.setId("gameSessionId");
        Round round = new Round();
        round.setId("roundId");
        round.setRoundStep(RoundStep.ACTION_NEEDED);
        round.setBoard(new Board());
        gameSession.setRounds(List.of(round));

        CardMisreadRequest cardMisreadRequest = new CardMisreadRequest();
        cardMisreadRequest.setRoundId("roundId");
        cardMisreadRequest.setCards(List.of(new Card(CardType.HEARTS, CardValue.ACE)));

        Board updatedBoard = roundService.handleCommunityCardMisread(round, cardMisreadRequest);

        assertEquals(1, updatedBoard.getCommunityCards().size());
        assertTrue(updatedBoard.getCommunityCards().contains(new Card(CardType.HEARTS, CardValue.ACE)));
    }

    @Test
    void testGetImpossibleCards() throws PokerException {
        GameSession gameSession = new GameSession();
        gameSession.setId("gameSessionId");
        Round round = new Round();
        round.setId("roundId");
        round.setRoundStep(RoundStep.ACTION_NEEDED);
        round.setBoard(new Board());
        gameSession.setRounds(List.of(round));

        Player player = new Player();
        player.setSeatIndex(1);
        player.setHand(new HashSet<>(Set.of(new Card(CardType.HEARTS, CardValue.ACE))));
        gameSession.setPlayers(List.of(player));

        round.getBoard().addCards(Set.of(new Card(CardType.SPADES, CardValue.KING)), CommunityCardType.FLOP);

        List<Card> impossibleCards = roundService.getImpossibleCards(round, gameSession);

        assertEquals(2, impossibleCards.size());
        assertTrue(impossibleCards.contains(new Card(CardType.HEARTS, CardValue.ACE)));
        assertTrue(impossibleCards.contains(new Card(CardType.SPADES, CardValue.KING)));
    }
}
