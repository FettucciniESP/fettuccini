package fr.fettuccini.backend.service;

import fr.fettuccini.backend.enums.CommunityCardType;
import fr.fettuccini.backend.model.exception.PokerException;
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
     * @param cards             cards
     * @param communityCardType community card type
     */
    public void updateBoardCards(Set<Card> cards, CommunityCardType communityCardType) throws PokerException {
        var gameSession = gameSessionRepository.findFirstByOrderByDateGameStartedDesc().orElseThrow();

        gameSession.getBoard().addCards(cards, communityCardType);
        gameSessionRepository.save(gameSession);
    }

}
