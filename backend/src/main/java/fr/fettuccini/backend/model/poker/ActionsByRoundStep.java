package fr.fettuccini.backend.model.poker;

import fr.fettuccini.backend.enums.RoundStep;
import lombok.Data;

import java.util.List;

@Data
public class ActionsByRoundStep {

    private List<Action> preflop;
    private List<Action> flop;
    private List<Action> turn;
    private List<Action> river;

    public static ActionsByRoundStep buildActionByRoundStepFromActionList(List<Action> actions) {
        ActionsByRoundStep actionsByRoundStep = new ActionsByRoundStep();
        actionsByRoundStep.setPreflop(actions.stream().filter(action -> action.getRoundStep().equals(RoundStep.PREFLOP)).toList());
        actionsByRoundStep.setFlop(actions.stream().filter(action -> action.getRoundStep().equals(RoundStep.FLOP)).toList());
        actionsByRoundStep.setTurn(actions.stream().filter(action -> action.getRoundStep().equals(RoundStep.TURN)).toList());
        actionsByRoundStep.setRiver(actions.stream().filter(action -> action.getRoundStep().equals(RoundStep.RIVER)).toList());
        return actionsByRoundStep;
    }
}
