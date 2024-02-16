package fr.fettuccini.backend.model.poker;

import lombok.Data;

import java.util.List;

@Data
public class PlayerChips {
    private Integer seatIndex;
    private List<Integer> chips;

    public void addChip(Integer value) {
        chips.add(value);
    }
}
