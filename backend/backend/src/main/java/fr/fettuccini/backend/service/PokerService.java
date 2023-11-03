package fr.fettuccini.backend.service;

import fr.fettuccini.backend.model.GameSession;
import fr.fettuccini.backend.model.Player;
import fr.fettuccini.backend.repository.GameSessionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PokerService {

    private final GameSessionRepository gameSessionRepository;
    private final PokerEvaluatorService pokerEvaluatorService;

    public GameSession startGame() {
        var player = new Player();
        var gameSession = new GameSession(player);
        gameSession.startGame();

        return gameSessionRepository.save(gameSession);
    }

    public GameSession playRound(String sessionId) {
        GameSession gameSession = gameSessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("No game session found for the given sessionId"));

        // Drawing 5 cards for the player.
        // TODO: Check if the deck has enough cards to draw 5 cards.
        for (int i = 0; i < 5; i++) {
            gameSession.getPlayer().getHand().add(gameSession.getDeck().drawCard());
        }

        var handType = pokerEvaluatorService.evaluateHand(gameSession.getPlayer().getHand());

        // Adding the result to the game session's round results
        gameSession.addRoundResult(handType);

        return gameSessionRepository.save(gameSession);
    }


    public GameSession endGame(String sessionId) {
        var gameSession = gameSessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("No game session found for the given sessionId"));

        gameSession.endGame();

        return gameSessionRepository.save(gameSession);
    }
}
