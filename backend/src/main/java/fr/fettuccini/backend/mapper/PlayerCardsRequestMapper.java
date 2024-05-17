package fr.fettuccini.backend.mapper;

import fr.fettuccini.backend.model.poker.PlayerCards;
import fr.fettuccini.backend.model.request.PlayerCardsRequest;
import fr.fettuccini.backend.repository.CardMapperRepository;
import fr.fettuccini.backend.repository.SeatRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class PlayerCardsRequestMapper {

    private final SeatRepository seatRepository;

    private final CardMapperRepository cardMapperRepository;

    public PlayerCards map(PlayerCardsRequest request, String ip) {
        var seat = seatRepository.findByIp(ip);

        request.setSeat(seat.isPresent() ? seat.get().getSeatNumber() : request.getSeat());
        var playerCards = new PlayerCards(request.getSeat());
        request.getCardsId().forEach(cardId -> {
            var card = cardMapperRepository.findByNfcId(cardId).orElseThrow();
            playerCards.addCard(card.getCard());
        });

        return playerCards;
    }

}
