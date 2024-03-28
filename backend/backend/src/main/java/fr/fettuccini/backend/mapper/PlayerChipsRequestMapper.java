package fr.fettuccini.backend.mapper;

import fr.fettuccini.backend.model.poker.PlayerChips;
import fr.fettuccini.backend.model.request.PlayerChipsRequest;
import fr.fettuccini.backend.repository.SeatRepository;
import fr.fettuccini.backend.repository.TokenMapperRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Mapper class
 * Takes a PlayerChipsRequest and returns a PlayerChips
 */
@Component
@AllArgsConstructor
public class PlayerChipsRequestMapper {

    private final SeatRepository seatRepository;
    private final TokenMapperRepository tokenMapperRepository;

    /**
     * @param request PlayerChipsRequest
     * @return PlayerChips
     */
    public PlayerChips map(PlayerChipsRequest request, String ip) {
        var playerChips = new PlayerChips();
<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/mapper/PlayerChipsRequestMapper.java
        var seat = seatRepository.findByIp(ip).orElseThrow();

        playerChips.setSeatIndex(seat.getSeatNumber());
=======
        var seat = seatRepository.findByIp(ip);

        playerChips.setSeatIndex(seat.isPresent() ? seat.get().getSeatNumber() : request.getSeat());
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/mapper/PlayerChipsRequestMapper.java
        request.getChipsId().forEach(chipId -> {
            var tokenMapper = tokenMapperRepository.findById(chipId).orElseThrow();
            playerChips.addChip(tokenMapper.getValue());
        });

        return playerChips;
    }

}
