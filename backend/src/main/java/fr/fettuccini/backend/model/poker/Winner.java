package fr.fettuccini.backend.model.poker;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Winner {
    private Integer seatIndex;
    private Integer amount;
}
