package fr.fettuccini.backend.model.request;

import fr.fettuccini.backend.model.poker.Card;
import lombok.Data;

import java.util.List;

@Data
public class CardMisreadRequest {
    Integer playerSeatId;
    String roundId;
    List<Card> cards;
}
