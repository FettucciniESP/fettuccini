package fr.fettuccini.backend.model.request;

import fr.fettuccini.backend.model.poker.Level;
import lombok.Getter;

import java.io.Serializable;
import java.util.List;

@Getter
public class StartGameRequest implements Serializable {
    private List<Level> levels;
    private List<Integer> seatsIndex;
    private Integer startingStack;
    private Integer authorizedReentryLevelIndex;
}
