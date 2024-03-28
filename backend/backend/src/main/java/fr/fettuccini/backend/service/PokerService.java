package fr.fettuccini.backend.service;

<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/service/PokerService.java
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
=======
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/service/PokerService.java
import fr.fettuccini.backend.enums.PokerExceptionType;
import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.GameSession;
import fr.fettuccini.backend.model.poker.Level;
import fr.fettuccini.backend.model.request.PlayerActionRequest;
<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/service/PokerService.java
=======
import fr.fettuccini.backend.model.request.StartGameRequest;
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/service/PokerService.java
import fr.fettuccini.backend.model.response.PlayerActionResponse;
import fr.fettuccini.backend.model.response.StartGameResponse;
import fr.fettuccini.backend.repository.GameSessionRepository;
import lombok.RequiredArgsConstructor;
<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/service/PokerService.java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
=======
import org.springframework.stereotype.Service;

import java.io.IOException;
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/service/PokerService.java
import java.util.List;

@Service
@RequiredArgsConstructor
public class PokerService {
    private final GameSessionRepository gameSessionRepository;
<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/service/PokerService.java
    private final PokerEvaluatorService pokerEvaluatorService;
    private final RoundService roundService;
    @Value("${defaultLevelsStructureFilePath}")
    private String defaultLevelsStructureFilePath;

    public StartGameResponse startGame() throws IOException {
        var gameSession = new GameSession();
        gameSession.startGame();
        gameSession.setLevelsStructure(initializeLevelsStructureFromJson());
=======
    private final RoundService roundService;

    public StartGameResponse startGame(StartGameRequest startGameRequest) throws IOException {
        List<Level> levels = startGameRequest.getLevels();

        var gameSession = new GameSession();
        gameSession.startGame();
        gameSession.setLevelsStructure(levels);
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/service/PokerService.java

        gameSessionRepository.save(gameSession);

        return new StartGameResponse(
                playRound(gameSession.getId()),
<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/service/PokerService.java
                gameSession.getLevelsStructure()
=======
                gameSession. getLevelsStructure()
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/service/PokerService.java
        );
    }

    public PlayerActionResponse playRound(String sessionId) {
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
<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/service/PokerService.java

    public List<Level> initializeLevelsStructureFromJson() throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(defaultLevelsStructureFilePath);
        if (inputStream == null) {
            throw new IOException("Le fichier de structure de niveau par défaut est introuvable");
        }
        return (mapper.readValue(inputStream, new TypeReference<>() {
        }));
    }
=======
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/service/PokerService.java
}
