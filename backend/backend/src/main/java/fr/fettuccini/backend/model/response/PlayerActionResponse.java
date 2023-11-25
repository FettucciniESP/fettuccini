package fr.fettuccini.backend.model.response;

import fr.fettuccini.backend.enums.RoundStep;
import fr.fettuccini.backend.model.poker.ActionsByRoundStep;
import fr.fettuccini.backend.model.poker.Player;
import lombok.Data;

@Data
public class PlayerActionResponse {
    String sessionId;
    String roundId;
    Integer currentPotAmount;
    ActionsByRoundStep roundPlayersActionsHistory;
    Player currentPlayingUser;
    RoundStep roundStep;
}
