package fr.fettuccini.backend.service;

<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/service/UpdateBoardCardsService.java
=======
import fr.fettuccini.backend.enums.CommunityCardType;
import fr.fettuccini.backend.model.exception.PokerException;
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/service/UpdateBoardCardsService.java
import fr.fettuccini.backend.model.poker.Card;
import fr.fettuccini.backend.repository.GameSessionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/service/UpdateBoardCardsService.java
import java.util.HashSet;
=======
import java.util.Set;
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/service/UpdateBoardCardsService.java

@Service
@AllArgsConstructor
public class UpdateBoardCardsService {

    private final GameSessionRepository gameSessionRepository;

    /**
     * Update the board cards
     *
<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/service/UpdateBoardCardsService.java
     * @param cards cards
     */
    public void updateBoardCards(HashSet<Card> cards) {
        var gameSession = gameSessionRepository.findFirstByOrderByDateGameStartedDesc().orElseThrow();

        gameSession.getBoard().setCommunityCards(cards);
=======
     * @param cards             cards
     * @param communityCardType community card type
     */
    public void updateBoardCards(Set<Card> cards, CommunityCardType communityCardType) throws PokerException {
        var gameSession = gameSessionRepository.findFirstByOrderByDateGameStartedDesc().orElseThrow();

        gameSession.getBoard().addCards(cards, communityCardType);
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/service/UpdateBoardCardsService.java
        gameSessionRepository.save(gameSession);
    }

}
