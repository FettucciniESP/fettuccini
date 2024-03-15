package fr.fettuccini.backend.model.poker;

import fr.fettuccini.backend.enums.CommunityCardType;
import fr.fettuccini.backend.model.exception.PokerException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class BoardTest {
    private Board board;
    private Card mockCard;

    @BeforeEach
    void setUp() {
        board = new Board();
        mockCard = Mockito.mock(Card.class);
    }

    @Test
    @DisplayName("Add flop cards successfully")
    void addFlopCardsSuccessfully() throws PokerException {
        Card card1 = Mockito.mock(Card.class, "card1");
        Card card2 = Mockito.mock(Card.class, "card2");
        Card card3 = Mockito.mock(Card.class, "card3");

        Set<Card> flopCards = new HashSet<>();
        flopCards.add(card1);
        flopCards.add(card2);
        flopCards.add(card3);

        board.addCards(flopCards, CommunityCardType.FLOP);
        assertEquals(3, board.getCommunityCards().size(), "The board should have 3 flop cards.");
    }


    @Test
    @DisplayName("Fail to add cards with invalid sequence")
    void failToAddCardsWithInvalidSequence() {
        Set<Card> turnCards = new HashSet<>();
        turnCards.add(mockCard);

        Exception exception = assertThrows(PokerException.class, () -> board.addCards(turnCards, CommunityCardType.TURN));

        assertTrue(exception.getMessage().contains("Invalid sequence of community card types."));
    }

    @Test
    @DisplayName("Fail to add incorrect number of flop cards")
    void failToAddIncorrectNumberOfFlopCards() {
        Set<Card> flopCards = new HashSet<>();
        flopCards.add(mockCard);
        flopCards.add(mockCard);

        Exception exception = assertThrows(PokerException.class, () -> board.addCards(flopCards, CommunityCardType.FLOP));

        assertTrue(exception.getMessage().contains("Invalid number of cards for FLOP."));
    }

    @Test
    @DisplayName("Add turn cards successfully after flop")
    void addTurnCardsSuccessfullyAfterFlop() throws PokerException {
        // First, add flop cards
        Set<Card> flopCards = Set.of(Mockito.mock(Card.class, "card1"), Mockito.mock(Card.class, "card2"), Mockito.mock(Card.class, "card3"));
        board.addCards(flopCards, CommunityCardType.FLOP);

        // Then, add turn card
        Set<Card> turnCards = Set.of(Mockito.mock(Card.class, "card4"));
        board.addCards(turnCards, CommunityCardType.TURN);

        assertEquals(4, board.getCommunityCards().size(), "The board should have 4 cards after adding TURN.");
    }

    @Test
    @DisplayName("Fail to add turn cards without flop")
    void failToAddTurnCardsWithoutFlop() {
        Set<Card> turnCards = Set.of(Mockito.mock(Card.class));

        PokerException exception = assertThrows(PokerException.class, () -> {
            board.addCards(turnCards, CommunityCardType.TURN);
        });

        assertTrue(exception.getMessage().contains("Invalid sequence of community card types."), "Should fail to add TURN cards without FLOP.");
    }

    @Test
    @DisplayName("Add river cards successfully after turn")
    void addRiverCardsSuccessfullyAfterTurn() throws PokerException {
        Set<Card> flopCards = Set.of(Mockito.mock(Card.class, "card1"), Mockito.mock(Card.class, "card2"), Mockito.mock(Card.class, "card3"));
        board.addCards(flopCards, CommunityCardType.FLOP);

        Set<Card> turnCards = Set.of(Mockito.mock(Card.class, "card4"));
        board.addCards(turnCards, CommunityCardType.TURN);

        Set<Card> riverCards = Set.of(Mockito.mock(Card.class, "card5"));
        board.addCards(riverCards, CommunityCardType.RIVER);

        assertEquals(5, board.getCommunityCards().size(), "The board should have 5 cards after adding RIVER.");
    }

    @Test
    @DisplayName("Fail to add river cards without turn")
    void failToAddRiverCardsWithoutTurn() throws PokerException {
        Set<Card> flopCards = Set.of(Mockito.mock(Card.class, "card1"), Mockito.mock(Card.class, "card2"), Mockito.mock(Card.class, "card3"));
        board.addCards(flopCards, CommunityCardType.FLOP);

        Set<Card> riverCards = Set.of(Mockito.mock(Card.class));

        PokerException exception = assertThrows(PokerException.class, () -> {
            board.addCards(riverCards, CommunityCardType.RIVER);
        });

        assertTrue(exception.getMessage().contains("Invalid sequence of community card types."), "Should fail to add RIVER cards without TURN.");
    }


}
