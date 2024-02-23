package fr.fettuccini.backend.model.poker;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
public class Board {
    private Set<Card> communityCards = new HashSet<>();

    public void addCard(Card card) {
        if (communityCards.size() < 5) {
            communityCards.add(card);
        }
    }
}
