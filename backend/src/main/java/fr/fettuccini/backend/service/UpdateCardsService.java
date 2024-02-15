package fr.fettuccini.backend.service;

import fr.fettuccini.backend.model.poker.PlayerCards;
import fr.fettuccini.backend.repository.GameSessionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UpdateCardsService {

    private GameSessionRepository gameSessionRepository;

    /**
     * Update the cards of a player
     *
     * @param playerCards PlayerCards
     */
    public void updatePlayerCards(PlayerCards playerCards) {
        var gameSession = gameSessionRepository.findFirstByOrderByDateGameStartedDesc().orElseThrow();
        var player = gameSession.getPlayers().get(playerCards.getSeatIndex());

        player.setHand(playerCards.getCards());
        gameSessionRepository.save(gameSession);
    }

}
