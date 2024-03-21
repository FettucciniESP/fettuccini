package fr.fettuccini.backend;

import fr.fettuccini.backend.enums.RoundStep;
import fr.fettuccini.backend.model.poker.Action;
import fr.fettuccini.backend.model.poker.Level;
import fr.fettuccini.backend.model.poker.Player;
import fr.fettuccini.backend.model.poker.Round;
import fr.fettuccini.backend.model.request.PlayerActionRequest;

import java.util.ArrayList;
import java.util.List;

public class TestUtils {

    public static Round createRound() {
        Round round = new Round();
        round.setId("roundId");
        round.setRoundIndex(1);
        round.setRoundStep(RoundStep.PREFLOP);
        round.setNextPlayerToPlaySeatIndex(1);
        round.setCurrentLevel(createLevelsStructure().get(0));
        return round;
    }

    public static List<Level> createLevelsStructure() {
        Level level1 = new Level();
        level1.setRoundIndex(1);
        level1.setBigBlindAmount(10);
        level1.setSmallBlindAmount(5);
        level1.setAnteAmount(0);
        level1.setDuration(15);

        Level level2 = new Level();
        level2.setRoundIndex(2);
        level2.setBigBlindAmount(20);
        level2.setSmallBlindAmount(10);
        level2.setAnteAmount(0);
        level2.setDuration(15);

        List<Level> levels = new ArrayList<>();
        levels.add(level1);
        levels.add(level2);

        return levels;
    }

    public static PlayerActionRequest createPlayerActionRequest(Action.ActionType actionType, Integer amount, Integer seatIndex, Round round, RoundStep roundStep) {
        Action action = new Action(actionType, amount, seatIndex, roundStep);

        PlayerActionRequest playerActionRequest = new PlayerActionRequest();
        playerActionRequest.setRoundId(round.getId());
        playerActionRequest.setAction(action);
        return playerActionRequest;
    }

    public static PlayerActionRequest createPlayerActionRequest(Action.ActionType actionType, Integer amount, Integer seatIndex, Round round) {
        return createPlayerActionRequest(actionType, amount, seatIndex, round, RoundStep.PREFLOP);
    }

    public static List<Player> createPlayers() {
        List<Player> players = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Player player = new Player();
            player.setSeatIndex(i);
            player.setBalance(1000);
            players.add(player);
        }
        return players;
    }
}
