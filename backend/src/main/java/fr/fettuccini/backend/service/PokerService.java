package fr.fettuccini.backend.service;

import fr.fettuccini.backend.enums.PokerExceptionType;
import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.GameSession;
import fr.fettuccini.backend.model.poker.Level;
import fr.fettuccini.backend.model.poker.Player;
import fr.fettuccini.backend.model.poker.Round;
import fr.fettuccini.backend.model.request.CardMisreadRequest;
import fr.fettuccini.backend.model.request.ChipsCountRequest;
import fr.fettuccini.backend.model.request.PlayerActionRequest;
import fr.fettuccini.backend.model.request.StartGameRequest;
import fr.fettuccini.backend.model.response.ChipsCountResponse;
import fr.fettuccini.backend.model.response.PlayerActionResponse;
import fr.fettuccini.backend.model.response.StartGameResponse;
import fr.fettuccini.backend.repository.GameSessionRepository;
import fr.fettuccini.backend.utils.PokerUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PokerService {
    private final GameSessionRepository gameSessionRepository;
    private final RoundService roundService;

    public StartGameResponse startGame(StartGameRequest startGameRequest) throws PokerException {
        List<Level> levels = startGameRequest.getLevels();

        var gameSession = new GameSession();
        gameSession.startGame();
        gameSession.setLevelsStructure(levels);
        gameSession.setAuthorizedReentryLevelIndex(startGameRequest.getAuthorizedReentryLevelIndex());
        for (Player player : initializePlayers(startGameRequest.getSeatsIndex(), startGameRequest.getStartingStack())) {
            gameSession.getPlayers().add(player);
        }

        gameSessionRepository.save(gameSession);

        return new StartGameResponse(
                playRound(gameSession.getId()),
                gameSession. getLevelsStructure()
        );
    }

    public List<Player> initializePlayers(List<Integer> seatsIndex, Integer startingStack) {
        List<Player> players = new ArrayList<>();
        for (Integer seatIndex : seatsIndex) {
            Player player = new Player();
            player.setSeatIndex(seatIndex);
            player.setBalance(startingStack);
            player.setName("Seat " + seatIndex);
            player.setHand(new HashSet<>());
            players.add(player);
        }
        return players;
    }
    
    public void addPlayer (Integer seatIndex, String sessionId) throws PokerException {
        var gameSession = gameSessionRepository.findById(sessionId)
                .orElseThrow(() ->
                        new PokerException(PokerExceptionType.GAME_NOT_FOUND, String.format(PokerExceptionType.GAME_NOT_FOUND.getMessage(), sessionId)));
        
        if (gameSession.getPlayers().stream().anyMatch(player -> player.getSeatIndex().equals(seatIndex))) {
            throw new PokerException(PokerExceptionType.PLAYER_ALREADY_EXISTS, String.format(PokerExceptionType.PLAYER_ALREADY_EXISTS.getMessage(), seatIndex));
        }
        if (Objects.requireNonNull(PokerUtils.getCurrentLevelByTime(gameSession)).getRoundIndex() > gameSession.getAuthorizedReentryLevelIndex()) {
            throw new PokerException(PokerExceptionType.REENTRY_NOT_ALLOWED, PokerExceptionType.REENTRY_NOT_ALLOWED.getMessage());
        }

        Player player = new Player();
        player.setSeatIndex(seatIndex);
        player.setBalance(gameSession.getStartingStack());
        player.setName("Seat " + seatIndex);
        player.setHand(new HashSet<>());
        gameSession.getPlayers().add(player);
        gameSessionRepository.save(gameSession);
    }

    public PlayerActionResponse playRound(String sessionId) throws PokerException {
        GameSession gameSession = gameSessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("No game session found for the given sessionId"));

        PlayerActionResponse playerActionResponse = roundService.initializeRoundForGame(gameSession);


        gameSessionRepository.save(gameSession);

        return playerActionResponse;
    }


    public GameSession endGame(String sessionId) throws PokerException {
        var gameSession = gameSessionRepository.findById(sessionId)
                .orElseThrow(() ->
                        new PokerException(PokerExceptionType.GAME_NOT_FOUND, String.format(PokerExceptionType.GAME_NOT_FOUND.getMessage(), sessionId)));

        gameSession.endGame();

        return gameSessionRepository.save(gameSession);
    }

    public PlayerActionResponse setPlayerAction(String sessionId, PlayerActionRequest playerActionRequest) throws PokerException {
        var gameSession = gameSessionRepository.findById(sessionId)
                .orElseThrow(() ->
                        new PokerException(PokerExceptionType.GAME_NOT_FOUND, String.format(PokerExceptionType.GAME_NOT_FOUND.getMessage(), sessionId)));

        PlayerActionResponse playerActionResponse = roundService.setPlayerAction(playerActionRequest, gameSession);

        gameSessionRepository.save(gameSession);
        return playerActionResponse;
    }

    public PlayerActionResponse handleCardMisread(CardMisreadRequest cardMisreadRequest, String sessionId) throws PokerException {
        var gameSession = gameSessionRepository.findById(sessionId)
                .orElseThrow(() ->
                        new PokerException(PokerExceptionType.GAME_NOT_FOUND, String.format(PokerExceptionType.GAME_NOT_FOUND.getMessage(), sessionId)));


        PlayerActionResponse playerActionResponse = roundService.handleCardMisread(cardMisreadRequest, gameSession);

        gameSessionRepository.save(gameSession);

        return playerActionResponse;
    }

    public ChipsCountResponse getChipsCount(String sessionId, ChipsCountRequest chipsCountRequest) {
        var gameSession = gameSessionRepository.findById(sessionId)
                .orElseThrow(() ->
                        new IllegalArgumentException("No game session found for the given sessionId"));

        Player player = gameSession.getPlayers().stream()
                .filter(p -> p.getSeatIndex().equals(chipsCountRequest.getSeatIndex()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No player found for the given seat index"));

        Optional<Round> currentRound = PokerUtils.getLastRound(gameSession);

        if (currentRound.isEmpty()) {
            throw new IllegalArgumentException("No round found for the given game session");
        }

        return new ChipsCountResponse(
                player.getSeatIndex(),
                currentRound.get().getId(),
                player.getChipsReaded()
        );
    }
}
