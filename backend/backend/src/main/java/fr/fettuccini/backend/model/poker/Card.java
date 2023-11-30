package fr.fettuccini.backend.model.poker;

import fr.fettuccini.backend.enums.CardType;
import fr.fettuccini.backend.enums.CardValue;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Card {
    private CardType type;
    private CardValue value;
}