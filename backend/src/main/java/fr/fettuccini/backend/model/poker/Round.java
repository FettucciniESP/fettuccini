package fr.fettuccini.backend.model.poker;

import fr.fettuccini.backend.enums.RoundStep;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedList;
import java.util.List;

@Data
@NoArgsConstructor
public class Round {
    private String id;
    private String gameId;
    private Integer roundIndex;
    private List<Action> actions = new LinkedList<>();
    private Board board = new Board();
    private Integer buttonSeatIndex;
    private Integer potAmount;
    private Level currentLevel;
    private RoundStep roundStep;
    private Integer nextPlayerToPlaySeatIndex;
    private List<Winner> winners = new LinkedList<>();
    public void addAction(Action action) {
        actions.add(action);
    }
    public void addWinner(Winner winner) {
        winners.add(winner);
    }

    public Round startRound(String id, String gameId, Integer buttonSeatIndex) {
        this.id = id;
        this.gameId = gameId;
        this.buttonSeatIndex = buttonSeatIndex;
        this.potAmount = 0;
        this.roundStep = RoundStep.PREFLOP;
        return this;
    }
}
