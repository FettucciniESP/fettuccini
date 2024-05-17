package fr.fettuccini.backend.model.poker;

import fr.fettuccini.backend.enums.HandType;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Data
@Document
public class GameSession {

    @Id
    private String id;
    private LocalDateTime dateGameStarted;
    private List<Player> players;
    private Deck deck;
    private Board board;
    private List<Round> rounds = new ArrayList<>();
    private GameState gameState;
    private List<HandType> roundResults = new ArrayList<>();
    private List<Level> levelsStructure;
    private Integer startingStack;
    private Integer authorizedReentryLevelIndex;

    public GameSession() {
        this.players = new ArrayList<>();
        this.deck = new Deck(true);
        this.deck.shuffle();
        this.board = new Board();
        this.gameState = GameState.NOT_STARTED;
    }

    public void startGame() {
        this.gameState = GameState.IN_PROGRESS;
        this.dateGameStarted = LocalDateTime.now();
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
