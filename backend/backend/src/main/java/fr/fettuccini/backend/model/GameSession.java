package fr.fettuccini.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Document
public class GameSession {

    @Id
    private String id;

    private Player player;
    private Deck deck;
    private Board board;
    private List<Round> rounds = new ArrayList<>();
    private GameState gameState;
    private List<HandType> roundResults = new ArrayList<>();

    // Constructor to initialize a new game session
    public GameSession(Player player) {
        this.player = player;
        this.deck = new Deck(true);
        this.deck.shuffle();
        this.board = new Board();
        this.gameState = GameState.NOT_STARTED;
    }

    public void startGame() {
        this.gameState = GameState.IN_PROGRESS;
        // Further initialization logic if needed
    }

    public void endGame() {
        this.gameState = GameState.FINISHED;
        // Logic to conclude the game, calculate winnings, etc.
    }

    public void addRoundResult(HandType handType) {
        roundResults.add(handType);
    }

    public void addRound(Round round) {
        rounds.add(round);
    }

    public enum GameState {
        NOT_STARTED, IN_PROGRESS, FINISHED
    }
}
