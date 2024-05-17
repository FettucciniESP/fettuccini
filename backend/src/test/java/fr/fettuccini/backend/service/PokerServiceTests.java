package fr.fettuccini.backend.service;

import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.GameSession;
import fr.fettuccini.backend.model.poker.Level;
import fr.fettuccini.backend.model.poker.Player;
import fr.fettuccini.backend.model.poker.Round;
import fr.fettuccini.backend.model.request.CardMisreadRequest;
import fr.fettuccini.backend.model.request.ChipsCountRequest;
import fr.fettuccini.backend.model.request.PlayerActionRequest;
import fr.fettuccini.backend.model.response.ChipsCountResponse;
import fr.fettuccini.backend.model.response.PlayerActionResponse;
import fr.fettuccini.backend.repository.GameSessionRepository;
import fr.fettuccini.backend.utils.PokerUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class PokerServiceTest {

    @Mock
    private GameSessionRepository gameSessionRepository;

    @Mock
    private RoundService roundService;

    @InjectMocks
    private PokerService pokerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddPlayer() throws PokerException {
        GameSession gameSession = new GameSession();
        gameSession.setId("sessionId");
        gameSession.setAuthorizedReentryLevelIndex(2);
        gameSession.setPlayers(new ArrayList<>());
        gameSession.startGame();

        Level level = new Level();
        level.setDuration(10);
        level.setRoundIndex(1);

        gameSession.setLevelsStructure(List.of(level));
        when(gameSessionRepository.findById("sessionId")).thenReturn(Optional.of(gameSession));
        when(gameSessionRepository.save(any(GameSession.class))).thenAnswer(invocation -> invocation.getArgument(0));

        pokerService.addPlayer(1, "sessionId");

        assertEquals(1, gameSession.getPlayers().size());
        verify(gameSessionRepository, times(1)).save(any(GameSession.class));
    }

    @Test
    void testPlayRound() throws PokerException {
        GameSession gameSession = new GameSession();
        gameSession.setId("sessionId");
        when(gameSessionRepository.findById("sessionId")).thenReturn(Optional.of(gameSession));
        when(roundService.initializeRoundForGame(gameSession)).thenReturn(new PlayerActionResponse());

        PlayerActionResponse response = pokerService.playRound("sessionId");

        assertNotNull(response);
        verify(gameSessionRepository, times(1)).save(gameSession);
    }

    @Test
    void testSetPlayerAction() throws PokerException {
        GameSession gameSession = new GameSession();
        gameSession.setId("sessionId");
        PlayerActionRequest playerActionRequest = new PlayerActionRequest();
        when(gameSessionRepository.findById("sessionId")).thenReturn(Optional.of(gameSession));
        when(roundService.setPlayerAction(playerActionRequest, gameSession)).thenReturn(new PlayerActionResponse());

        PlayerActionResponse response = pokerService.setPlayerAction("sessionId", playerActionRequest);

        assertNotNull(response);
        verify(gameSessionRepository, times(1)).save(gameSession);
    }

    @Test
    void testHandleCardMisread() throws PokerException {
        GameSession gameSession = new GameSession();
        gameSession.setId("sessionId");
        CardMisreadRequest cardMisreadRequest = new CardMisreadRequest();
        when(gameSessionRepository.findById("sessionId")).thenReturn(Optional.of(gameSession));
        when(roundService.handleCardMisread(cardMisreadRequest, gameSession)).thenReturn(new PlayerActionResponse());

        PlayerActionResponse response = pokerService.handleCardMisread(cardMisreadRequest, "sessionId");

        assertNotNull(response);
        verify(gameSessionRepository, times(1)).save(gameSession);
    }

    @Test
    void testGetChipsCount() {
        GameSession gameSession = new GameSession();
        gameSession.setId("sessionId");
        Player player = new Player();
        player.setSeatIndex(1);
        player.setChipsReaded(500);
        gameSession.setPlayers(List.of(player));
        Round round = new Round();
        round.setId("roundId");
        gameSession.setRounds(List.of(round));

        when(gameSessionRepository.findById("sessionId")).thenReturn(Optional.of(gameSession));
        try (MockedStatic<PokerUtils> mocked = mockStatic(PokerUtils.class)) {
            mocked.when(() -> PokerUtils.getLastRound(gameSession)).thenReturn(Optional.of(round));

            ChipsCountRequest chipsCountRequest = new ChipsCountRequest();
            chipsCountRequest.setSeatIndex(1);
            ChipsCountResponse response = pokerService.getChipsCount("sessionId", chipsCountRequest);

            assertNotNull(response);
            assertEquals(1, response.getSeatIndex());
            assertEquals("roundId", response.getRoundId());
            assertEquals(500, response.getChipsCount());
        }
    }
}

