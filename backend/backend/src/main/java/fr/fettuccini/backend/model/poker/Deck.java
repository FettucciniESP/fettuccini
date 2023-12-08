package fr.fettuccini.backend.model.poker;

import fr.fettuccini.backend.enums.CardType;
import fr.fettuccini.backend.enums.CardValue;
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
            for (var cardType : CardType.values()) {
                for (var cardValue : CardValue.values()) {
                    cards.add(new Card(cardType, cardValue));
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
