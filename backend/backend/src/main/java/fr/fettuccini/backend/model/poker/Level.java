package fr.fettuccini.backend.model.poker;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Level {
    @JsonProperty("levelIndex")
    private Integer roundIndex;

<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/model/poker/Level.java
=======
    @JsonProperty("label")
    private String label;

>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/model/poker/Level.java
    @JsonProperty("bigBlind")
    private Integer bigBlindAmount;

    @JsonProperty("smallBlind")
    private Integer smallBlindAmount;

    @JsonProperty("ante")
    private Integer anteAmount;

    @JsonProperty("duration")
    private Integer duration;
}
