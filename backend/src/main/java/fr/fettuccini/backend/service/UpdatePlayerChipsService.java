package fr.fettuccini.backend.service;

import fr.fettuccini.backend.model.poker.PlayerChips;
import fr.fettuccini.backend.repository.GameSessionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UpdatePlayerChipsService {

    private GameSessionRepository gameSessionRepository;

    /**
     * Update the balance of a player
     * @param playerChips PlayerChips
     * @return total amount bet
     */
    public int updatePlayerChips(PlayerChips playerChips) {
        var gameSession = gameSessionRepository.findFirstByOrderByDateGameStartedDesc().orElseThrow();
        var player = gameSession.getPlayers().get(playerChips.getSeatIndex());

        player.setBalance(playerChips.getChips().stream().mapToInt(Integer::intValue).sum()); // Le bet est la somme des jetons
        gameSessionRepository.save(gameSession);

        return player.getBalance();
    }

}
