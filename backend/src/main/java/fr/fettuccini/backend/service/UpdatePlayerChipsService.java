package fr.fettuccini.backend.service;

import fr.fettuccini.backend.enums.PokerExceptionType;
import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.PlayerChips;
import fr.fettuccini.backend.model.poker.Round;
import fr.fettuccini.backend.repository.GameSessionRepository;
import lombok.AllArgsConstructor;
import fr.fettuccini.backend.utils.PokerUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UpdatePlayerChipsService {

    private GameSessionRepository gameSessionRepository;

    /**
     * Update the balance of a player
     * @param playerChips PlayerChips
     * @return total amount bet
     */
    public int updatePlayerChips(PlayerChips playerChips) throws PokerException {
        var gameSession = gameSessionRepository.findFirstByOrderByDateGameStartedDesc().orElseThrow();
        var player = gameSession.getPlayers().get(playerChips.getSeatIndex());

        Optional<Round> currentRound = PokerUtils.getLastRound(gameSession);

        if (currentRound.isEmpty()) {
            throw new PokerException(PokerExceptionType.ROUND_NOT_FOUND,
                    String.format(PokerExceptionType.ROUND_NOT_FOUND.getMessage()));
        }

        if (!player.getSeatIndex().equals(currentRound.get().getNextPlayerToPlaySeatIndex())) {
            throw new PokerException(PokerExceptionType.EXPECTED_OTHER_PLAYER_ACTION,
                    String.format(PokerExceptionType.EXPECTED_OTHER_PLAYER_ACTION.getMessage(), currentRound.get().getNextPlayerToPlaySeatIndex())
            );
        }

        int amount = playerChips.getChips().stream().mapToInt(Integer::intValue).sum();
        player.setChipsReaded(amount);

        gameSessionRepository.save(gameSession);

        return amount;
    }

}
