package fr.fettuccini.backend.model.poker;

import fr.fettuccini.backend.model.poker.Card;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

@Data
@NoArgsConstructor
public class Deck {
    private List<Card> cards = new LinkedList<>();

    public Deck(boolean initialize) {
        if (initialize) {
            for (var type : List.of("HEARTS", "DIAMONDS", "CLUBS", "SPADES")) {
                for (var value : List.of("ACE", "2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING")) {
                    cards.add(new Card(type, value));
                }
            }
        }
    }

    public void shuffle() {
        Collections.shuffle(cards);
    }

    public Card drawCard() {
        return cards.isEmpty() ? null : cards.remove(0);
    }
}
