package fr.fettuccini.backend.model.poker;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;

@Data
@NoArgsConstructor
public class Player {
    private String name;
    private Integer seatIndex;
    private Integer balance;
    private Integer bet;
    @JsonIgnore
    private HashSet<Card> hand;
    @JsonIgnore
    private Integer chipsReaded;
}