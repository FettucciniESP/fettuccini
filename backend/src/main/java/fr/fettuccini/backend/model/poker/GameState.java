package fr.fettuccini.backend.model.poker;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class GameState {

    @Id
    private String id;
    private Integer round;
    private List<Player> players;
    private LocalDateTime dateGameStarted;
    private LocalDateTime dateRoundStarted;
    private Integer smallBlind;
    private Integer bigBlind;
    private Integer ante;
    private Integer pot;

}
