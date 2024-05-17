package fr.fettuccini.backend.model.request;

import fr.fettuccini.backend.model.poker.Level;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class StartGameRequest implements Serializable {
    private List<Level> levels;
    private List<Integer> seatsIndex;
    private Integer startingStack;
    private Integer authorizedReentryLevelIndex;
}
