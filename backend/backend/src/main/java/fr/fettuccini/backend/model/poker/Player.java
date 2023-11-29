package fr.fettuccini.backend.model.poker;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;

@Data
@NoArgsConstructor
public class Player {
    private String name;
    private Integer seatIndex;
    private Integer balance;
    private Integer bet;
    private HashSet<Card> hand;
}