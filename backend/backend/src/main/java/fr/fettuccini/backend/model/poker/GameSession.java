package fr.fettuccini.backend.model.poker;

import fr.fettuccini.backend.enums.HandType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
         for (int i = 1; i <= 6; i++) {
             Player player = new Player();
             player.setName("Seat " + i);
             player.setSeatIndex(i);
             player.setBalance(1000);
             players.add(player);
         }
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
