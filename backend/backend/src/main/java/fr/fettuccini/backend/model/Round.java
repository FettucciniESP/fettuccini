package fr.fettuccini.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedList;
import java.util.List;

@Data
@NoArgsConstructor
public class Round {
    private List<Action> actions = new LinkedList<>();
    private Board board = new Board();

    public void addAction(Action action) {
        actions.add(action);
    }

    public void updateBoard(Card card) {
        board.addCard(card);
    }
}
