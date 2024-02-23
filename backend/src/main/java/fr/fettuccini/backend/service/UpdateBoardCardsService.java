package fr.fettuccini.backend.service;

import fr.fettuccini.backend.model.poker.Card;
import fr.fettuccini.backend.repository.GameSessionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@AllArgsConstructor
public class UpdateBoardCardsService {

    private final GameSessionRepository gameSessionRepository;

    /**
     * Update the board cards
     *
     * @param cards cards
     */
    public void updateBoardCards(Set<Card> cards) {
        var gameSession = gameSessionRepository.findFirstByOrderByDateGameStartedDesc().orElseThrow();

        gameSession.getBoard().setCommunityCards(cards);
        gameSessionRepository.save(gameSession);
    }

}
