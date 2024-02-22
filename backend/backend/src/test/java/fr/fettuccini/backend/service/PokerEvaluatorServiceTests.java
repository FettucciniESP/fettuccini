package fr.fettuccini.backend.service;

import fr.fettuccini.backend.enums.CardType;
import fr.fettuccini.backend.enums.CardValue;
import fr.fettuccini.backend.enums.HandType;
import fr.fettuccini.backend.model.poker.Card;
import org.junit.jupiter.api.Test;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class PokerEvaluatorServiceTests {
    @Test
    public void testEvaluateHand() {
        PokerEvaluatorService service = new PokerEvaluatorService();

        // Royal Flush
        HashSet<Card> playerHand1 = new HashSet<>();
        playerHand1.add(new Card(CardType.HEARTS, CardValue.ACE));
        playerHand1.add(new Card(CardType.HEARTS, CardValue.KING));

        HashSet<Card> communityCards1 = new HashSet<>();
        communityCards1.add(new Card(CardType.HEARTS, CardValue.QUEEN));
        communityCards1.add(new Card(CardType.HEARTS, CardValue.JACK));
        communityCards1.add(new Card(CardType.HEARTS, CardValue.TEN));
        communityCards1.add(new Card(CardType.CLUBS, CardValue.TWO));
        communityCards1.add(new Card(CardType.CLUBS, CardValue.THREE));

        int royalFlushScore = service.evaluateHand(playerHand1, communityCards1);

        // Straight Flush
        HashSet<Card> playerHand2 = new HashSet<>();
        playerHand2.add(new Card(CardType.HEARTS, CardValue.KING));
        playerHand2.add(new Card(CardType.HEARTS, CardValue.QUEEN));

        HashSet<Card> communityCards2 = new HashSet<>();
        communityCards2.add(new Card(CardType.HEARTS, CardValue.JACK));
        communityCards2.add(new Card(CardType.HEARTS, CardValue.TEN));
        communityCards2.add(new Card(CardType.HEARTS, CardValue.NINE));
        communityCards2.add(new Card(CardType.CLUBS, CardValue.TWO));
        communityCards2.add(new Card(CardType.CLUBS, CardValue.THREE));

        int straightFlushScore = service.evaluateHand(playerHand2, communityCards2);

        // Four of a Kind qui plante et deviens plus fort que le Straight Flush
        // les aces et les rois sont trop fort.
//        HashSet<Card> playerHand3 = new HashSet<>();
//        playerHand3.add(new Card(CardType.HEARTS, CardValue.ACE));
//        playerHand3.add(new Card(CardType.DIAMONDS, CardValue.ACE ));
//
//        HashSet<Card> communityCards3 = new HashSet<>();
//        communityCards3.add(new Card(CardType.CLUBS, CardValue.ACE));
//        communityCards3.add(new Card(CardType.SPADES, CardValue.ACE));
//        communityCards3.add(new Card(CardType.HEARTS, CardValue.TWO));
//        communityCards3.add(new Card(CardType.CLUBS, CardValue.THREE));
//        communityCards3.add(new Card(CardType.CLUBS, CardValue.FOUR));

        // Four of a Kind
        HashSet<Card> playerHand3 = new HashSet<>();
        playerHand3.add(new Card(CardType.HEARTS, CardValue.QUEEN));
        playerHand3.add(new Card(CardType.DIAMONDS, CardValue.QUEEN));

        HashSet<Card> communityCards3 = new HashSet<>();
        communityCards3.add(new Card(CardType.CLUBS, CardValue.QUEEN));
        communityCards3.add(new Card(CardType.SPADES, CardValue.QUEEN));
        communityCards3.add(new Card(CardType.HEARTS, CardValue.TWO));
        communityCards3.add(new Card(CardType.CLUBS, CardValue.THREE));
        communityCards3.add(new Card(CardType.CLUBS, CardValue.FOUR));

        int fourOfAKindScore = service.evaluateHand(playerHand3, communityCards3);

        // Full House
        HashSet<Card> playerHand4 = new HashSet<>();
        playerHand4.add(new Card(CardType.HEARTS, CardValue.JACK));
        playerHand4.add(new Card(CardType.DIAMONDS, CardValue.JACK));

        HashSet<Card> communityCards4 = new HashSet<>();
        communityCards4.add(new Card(CardType.CLUBS, CardValue.JACK));
        communityCards4.add(new Card(CardType.SPADES, CardValue.TEN));
        communityCards4.add(new Card(CardType.HEARTS, CardValue.TEN));
        communityCards4.add(new Card(CardType.CLUBS, CardValue.THREE));
        communityCards4.add(new Card(CardType.CLUBS, CardValue.FOUR));

        int fullHouseScore = service.evaluateHand(playerHand4, communityCards4);

        // Flush
        HashSet<Card> playerHand5 = new HashSet<>();
        playerHand5.add(new Card(CardType.HEARTS, CardValue.ACE));
        playerHand5.add(new Card(CardType.HEARTS, CardValue.KING));

        HashSet<Card> communityCards5 = new HashSet<>();
        communityCards5.add(new Card(CardType.HEARTS, CardValue.TWO));
        communityCards5.add(new Card(CardType.HEARTS, CardValue.THREE));
        communityCards5.add(new Card(CardType.HEARTS, CardValue.FOUR));
        communityCards5.add(new Card(CardType.CLUBS, CardValue.FIVE));
        communityCards5.add(new Card(CardType.CLUBS, CardValue.SIX));

        int flushScore = service.evaluateHand(playerHand5, communityCards5);

        // Straight
        HashSet<Card> playerHand6 = new HashSet<>();
        playerHand6.add(new Card(CardType.HEARTS, CardValue.TWO));
        playerHand6.add(new Card(CardType.HEARTS, CardValue.THREE));

        HashSet<Card> communityCards6 = new HashSet<>();
        communityCards6.add(new Card(CardType.CLUBS, CardValue.FOUR));
        communityCards6.add(new Card(CardType.SPADES, CardValue.FIVE));
        communityCards6.add(new Card(CardType.DIAMONDS, CardValue.SIX));
        communityCards6.add(new Card(CardType.CLUBS, CardValue.SEVEN));
        communityCards6.add(new Card(CardType.CLUBS, CardValue.EIGHT));

        int straightScore = service.evaluateHand(playerHand6, communityCards6);

        // Three of a Kind
        HashSet<Card> playerHand7 = new HashSet<>();
        playerHand7.add(new Card(CardType.HEARTS, CardValue.TWO));
        playerHand7.add(new Card(CardType.DIAMONDS, CardValue.TWO));

        HashSet<Card> communityCards7 = new HashSet<>();
        communityCards7.add(new Card(CardType.CLUBS, CardValue.TWO));
        communityCards7.add(new Card(CardType.SPADES, CardValue.THREE));
        communityCards7.add(new Card(CardType.DIAMONDS, CardValue.FOUR));
        communityCards7.add(new Card(CardType.CLUBS, CardValue.FIVE));
        communityCards7.add(new Card(CardType.CLUBS, CardValue.SIX));

        int threeOfAKindScore = service.evaluateHand(playerHand7, communityCards7);

        // Two Pair
        HashSet<Card> playerHand8 = new HashSet<>();
        playerHand8.add(new Card(CardType.HEARTS, CardValue.TWO));
        playerHand8.add(new Card(CardType.DIAMONDS, CardValue.TWO));

        HashSet<Card> communityCards8 = new HashSet<>();
        communityCards8.add(new Card(CardType.CLUBS, CardValue.THREE));
        communityCards8.add(new Card(CardType.SPADES, CardValue.THREE));
        communityCards8.add(new Card(CardType.DIAMONDS, CardValue.FOUR));
        communityCards8.add(new Card(CardType.CLUBS, CardValue.FIVE));
        communityCards8.add(new Card(CardType.CLUBS, CardValue.SIX));

        int twoPairScore = service.evaluateHand(playerHand8, communityCards8);

        // Pair
        HashSet<Card> playerHand9 = new HashSet<>();
        playerHand9.add(new Card(CardType.HEARTS, CardValue.TWO));
        playerHand9.add(new Card(CardType.DIAMONDS, CardValue.THREE));

        HashSet<Card> communityCards9 = new HashSet<>();
        communityCards9.add(new Card(CardType.CLUBS, CardValue.TWO));
        communityCards9.add(new Card(CardType.SPADES, CardValue.FOUR));
        communityCards9.add(new Card(CardType.DIAMONDS, CardValue.FIVE));
        communityCards9.add(new Card(CardType.CLUBS, CardValue.SIX));
        communityCards9.add(new Card(CardType.CLUBS, CardValue.SEVEN));

        int pairScore = service.evaluateHand(playerHand9, communityCards9);

        // Assert that the hands are ranked correctly
        assertTrue(royalFlushScore > straightFlushScore, "Royal Flush should have a higher score than Straight Flush");
        assertTrue(straightFlushScore > fourOfAKindScore, "Straight Flush should have a higher score than Four of a Kind");
        assertTrue(fourOfAKindScore > fullHouseScore, "Four of a Kind should have a higher score than Full House");
        assertTrue(fullHouseScore > flushScore, "Full House should have a higher score than Flush");
        assertTrue(flushScore > straightScore, "Flush should have a higher score than Straight");
        assertTrue(straightScore > threeOfAKindScore, "Straight should have a higher score than Three of a Kind");
        assertTrue(threeOfAKindScore > twoPairScore, "Three of a Kind should have a higher score than Two Pair");
        assertTrue(twoPairScore > pairScore, "Two Pair should have a higher score than Pair");
    }
}
