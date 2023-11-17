package fr.fettuccini.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedList;
import java.util.List;

@Data
@NoArgsConstructor
public class Board {
    private List<Card> communityCards = new LinkedList<>();

    public void addCard(Card card) {
        if (communityCards.size() < 5) {
            communityCards.add(card);
        }
    }
}
