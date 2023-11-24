package fr.fettuccini.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.fettuccini.backend.model.poker.GameSession;
import fr.fettuccini.backend.model.poker.Level;
import fr.fettuccini.backend.model.poker.LevelsStructure;
import fr.fettuccini.backend.model.request.PlayerActionRequest;
import fr.fettuccini.backend.model.response.PlayerActionResponse;
import fr.fettuccini.backend.repository.GameSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PokerService {
    @Value("${defaultLevelsStructureFilePath}")
    private String defaultLevelsStructureFilePath;
    private final GameSessionRepository gameSessionRepository;
    private final PokerEvaluatorService pokerEvaluatorService;
    private final RoundService roundService;

    public GameSession startGame() throws IOException {
        var gameSession = new GameSession();
        gameSession.startGame();
        gameSession.setLevelsStructure(initializeLevelsStructureFromJson());

        return gameSessionRepository.save(gameSession);
    }

    public PlayerActionResponse playRound(String sessionId) {
        GameSession gameSession = gameSessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("No game session found for the given sessionId"));

        PlayerActionResponse playerActionResponse = roundService.initializeRoundForGame(gameSession);

        gameSessionRepository.save(gameSession);

        return playerActionResponse;
    }


    public GameSession endGame(String sessionId) {
        var gameSession = gameSessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("No game session found for the given sessionId"));

        gameSession.endGame();

        return gameSessionRepository.save(gameSession);
    }

    public PlayerActionResponse setPlayerAction(String sessionId, PlayerActionRequest playerActionRequest) {
        var gameSession = gameSessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("No game session found for the given sessionId"));


        return roundService.setPlayerAction(playerActionRequest, gameSession);
    }

    public LevelsStructure initializeLevelsStructureFromJson() throws IOException {
        LevelsStructure levelsStructure = new LevelsStructure();

        ObjectMapper mapper = new ObjectMapper();
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(defaultLevelsStructureFilePath);
        if (inputStream == null) {
            throw new IOException("Le fichier de structure de niveau par défaut est introuvable");
        }
        levelsStructure.setLevels(mapper.readValue(inputStream, new TypeReference<List<Level>>() {}));
        return levelsStructure;
    }
}
