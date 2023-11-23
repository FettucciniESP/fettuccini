package fr.fettuccini.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Action {
    private ActionType actionType;
    private Integer amount; // Amount of money for actions like BET, RAISE. Ignored for FOLD.

    public enum ActionType {
        BET, RAISE, CALL, FOLD, CHECK
    }
}
