package fr.fettuccini.backend.model.poker;

import lombok.Data;

import java.util.HashSet;

@Data
public class PlayerCards {
    private final Integer seatIndex;
    private HashSet<Card> cards = new HashSet<>();

    public PlayerCards(Integer seatIndex) {
        this.seatIndex = seatIndex;
    }

    public void addCard(Card card) {
        cards.add(card);
    }

    public void resetCards() {
        cards.clear();
    }
}
