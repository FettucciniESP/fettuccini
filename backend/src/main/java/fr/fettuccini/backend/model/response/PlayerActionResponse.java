package fr.fettuccini.backend.model.response;

import fr.fettuccini.backend.enums.RoundStep;
import fr.fettuccini.backend.model.poker.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PlayerActionResponse {
    String sessionId;
    String roundId;
    LocalDateTime gameStartedDatetime;
    RoundStep roundStep;
    Integer currentPotAmount;
    ActionsByRoundStep roundPlayersActionsHistory;
    Player currentPlayingUser;
    Player currentButtonUser;
    List<PlayerLastAction> playersLastActions;
    boolean isBreakTime;
    String levelLabel;
    List<CardMisread> cardMisreads;
    List<Winner> winners;
}
