package fr.fettuccini.backend.mapper;

import fr.fettuccini.backend.model.poker.PlayerCards;
import fr.fettuccini.backend.model.request.PlayerCardsRequest;
import fr.fettuccini.backend.repository.CardMapperRepository;
import fr.fettuccini.backend.repository.SeatRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@AllArgsConstructor
public class PlayerCardsRequestMapper {

    private SeatRepository seatRepository;
    private CardMapperRepository cardMapperRepository;

    public PlayerCards map(PlayerCardsRequest request, String ip) {
        var playerCards = new PlayerCards();
        var seat = seatRepository.findByIp(ip).orElseThrow();

        playerCards.setSeatIndex(seat.getSeatNumber());

        request.getCardsId().forEach(cardId -> {
            var card = cardMapperRepository.findById(cardId).orElseThrow();
            playerCards.addCard(card.getCard());
        });

        return playerCards;
    }

}
