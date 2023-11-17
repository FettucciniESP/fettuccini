package fr.fettuccini.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
public class GameState {

    @Id
    private String id;

    private Integer round;

    private LocalDateTime dateGameStarted;

    private LocalDateTime dateRoundStarted;

    // TODO: list rounds

    private Integer smallBlind;

    private Integer bigBlind;

    private Integer ante;

    private Integer pot;



}
