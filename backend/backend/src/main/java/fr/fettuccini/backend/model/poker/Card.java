package fr.fettuccini.backend.model.poker;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Card {
    private String type;
    private String value;
}