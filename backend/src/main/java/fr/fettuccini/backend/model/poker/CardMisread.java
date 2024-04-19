package fr.fettuccini.backend.model.poker;

import lombok.Data;

import java.util.Set;

@Data
public class CardMisread {
    private Player player;
    private Set<Card> cards;
}
