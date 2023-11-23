package fr.fettuccini.backend.model;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class Player {
    private String name;
    private Integer balance;
    private List<Card> hand;
}