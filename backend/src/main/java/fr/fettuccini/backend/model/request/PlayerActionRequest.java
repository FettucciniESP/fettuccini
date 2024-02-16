package fr.fettuccini.backend.model.request;

import fr.fettuccini.backend.model.poker.Action;
import lombok.Data;

import java.io.Serializable;

@Data
public class PlayerActionRequest implements Serializable {
    private String roundId;
    private Action action;
}
