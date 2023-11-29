package fr.fettuccini.backend.mapper;

import fr.fettuccini.backend.model.poker.PlayerChips;
import fr.fettuccini.backend.model.request.PlayerChipsRequest;
import fr.fettuccini.backend.repository.SeatRepository;
import fr.fettuccini.backend.repository.TokenMapperRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Mapper class
 * Takes a PlayerChipsRequest and returns a PlayerChips
 */
@Component
@AllArgsConstructor
@RequiredArgsConstructor
public class PlayerChipsRequestMapper {

    private SeatRepository seatRepository;
    private TokenMapperRepository tokenMapperRepository;

    /**
     * @param request PlayerChipsRequest
     * @return PlayerChips
     */
    public PlayerChips map(PlayerChipsRequest request, String ip) {
        var playerChips = new PlayerChips();
        var seat = seatRepository.findByIp(ip).orElseThrow();

        playerChips.setSeatIndex(seat.getSeatNumber());
        request.getChipsId().forEach(chipId -> {
            var tokenMapper = tokenMapperRepository.findById(chipId).orElseThrow();
            playerChips.addChip(tokenMapper.getValue());
        });

        return playerChips;
    }

}
