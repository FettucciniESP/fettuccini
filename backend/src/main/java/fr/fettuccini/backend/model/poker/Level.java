package fr.fettuccini.backend.model.poker;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Level {
    @JsonProperty("levelIndex")
    private Integer roundIndex;

    @JsonProperty("label")
    private String label;

    @JsonProperty("bigBlind")
    private Integer bigBlindAmount;

    @JsonProperty("smallBlind")
    private Integer smallBlindAmount;

    @JsonProperty("ante")
    private Integer anteAmount;

    @JsonProperty("duration")
    private Integer duration;
}
