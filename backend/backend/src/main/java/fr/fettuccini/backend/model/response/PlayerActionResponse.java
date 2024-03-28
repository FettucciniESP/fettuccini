package fr.fettuccini.backend.model.response;

import fr.fettuccini.backend.enums.RoundStep;
import fr.fettuccini.backend.model.poker.ActionsByRoundStep;
import fr.fettuccini.backend.model.poker.Player;
import fr.fettuccini.backend.model.poker.PlayerLastAction;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PlayerActionResponse {
    String sessionId;
    String roundId;
    LocalDateTime gameStartedDatetime;
    Integer currentPotAmount;
    ActionsByRoundStep roundPlayersActionsHistory;
    Player currentPlayingUser;
    Player currentButtonUser;
    RoundStep roundStep;
    List<PlayerLastAction> playersLastActions;
<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/model/response/PlayerActionResponse.java
=======
    boolean isBreakTime;
    String levelLabel;
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/model/response/PlayerActionResponse.java
}
