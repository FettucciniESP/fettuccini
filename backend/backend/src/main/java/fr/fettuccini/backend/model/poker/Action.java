package fr.fettuccini.backend.model.poker;

import fr.fettuccini.backend.enums.RoundStep;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Action {
    private ActionType actionType;
    private Integer amount;
    private Integer seatIndex;
    private RoundStep roundStep;

    public enum ActionType {
        BET, RAISE, CALL, FOLD, CHECK
    }
}
