package fr.fettuccini.backend.model.poker;

import lombok.Data;

import java.util.List;

@Data
public class PlayerCards {
    private Integer seatIndex;
    private List<Card> cards;

    public void addCard(Card card) {
        cards.add(card);
    }
}
