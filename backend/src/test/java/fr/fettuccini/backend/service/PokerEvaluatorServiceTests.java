package fr.fettuccini.backend.service;

import fr.fettuccini.backend.enums.CardType;
import fr.fettuccini.backend.enums.CardValue;
import fr.fettuccini.backend.model.poker.Card;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class PokerEvaluatorServiceTests {
    @Test
    public void testEvaluateHand() {
        PokerEvaluatorService service = new PokerEvaluatorService();

        // Royal Flush
        HashSet<Card> playerHand1 = new HashSet<>();

        playerHand1.add(new Card(CardType.HEARTS, CardValue.ACE));
        playerHand1.add(new Card(CardType.HEARTS, CardValue.KING));

        HashSet<Card> communityCards = new HashSet<>();
        communityCards.add(new Card(CardType.HEARTS, CardValue.QUEEN));
        communityCards.add(new Card(CardType.HEARTS, CardValue.JACK));
        communityCards.add(new Card(CardType.HEARTS, CardValue.TEN));
        communityCards.add(new Card(CardType.CLUBS, CardValue.TEN));
        communityCards.add(new Card(CardType.CLUBS, CardValue.THREE));

        Long royalFlushScore = service.evaluateHand(playerHand1, communityCards);

        // Straight Flush
        HashSet<Card> playerHand2 = new HashSet<>();
        playerHand2.add(new Card(CardType.HEARTS, CardValue.KING));
        playerHand2.add(new Card(CardType.HEARTS, CardValue.NINE));

        Long straightFlushScore = service.evaluateHand(playerHand2, communityCards);

        // Four of a Kind qui plante et deviens plus fort que le Straight Flush
        // les aces et les rois sont trop fort.
        HashSet<Card> playerHand3 = new HashSet<>();
        playerHand3.add(new Card(CardType.SPADES, CardValue.TEN));
        playerHand3.add(new Card(CardType.DIAMONDS, CardValue.TEN));

        Long fourOfAKindScore = service.evaluateHand(playerHand3, communityCards);

        // Full House
        HashSet<Card> playerHand4 = new HashSet<>();
        playerHand4.add(new Card(CardType.CLUBS, CardValue.JACK));
        playerHand4.add(new Card(CardType.DIAMONDS, CardValue.JACK));

        Long fullHouseScore = service.evaluateHand(playerHand4, communityCards);

        // Flush
        HashSet<Card> playerHand5 = new HashSet<>();
        playerHand5.add(new Card(CardType.HEARTS, CardValue.ACE));
        playerHand5.add(new Card(CardType.HEARTS, CardValue.TWO));

        Long flushScore = service.evaluateHand(playerHand5, communityCards);

        // Straight
        HashSet<Card> playerHand6 = new HashSet<>();
        playerHand6.add(new Card(CardType.DIAMONDS, CardValue.ACE));
        playerHand6.add(new Card(CardType.DIAMONDS, CardValue.KING));

        Long straightScore = service.evaluateHand(playerHand6, communityCards);

        // Three of a Kind
        HashSet<Card> playerHand7 = new HashSet<>();
        playerHand7.add(new Card(CardType.HEARTS, CardValue.TWO));
        playerHand7.add(new Card(CardType.DIAMONDS, CardValue.TEN));

        Long threeOfAKindScore = service.evaluateHand(playerHand7, communityCards);

        // Two Pair
        HashSet<Card> playerHand8 = new HashSet<>();
        playerHand8.add(new Card(CardType.HEARTS, CardValue.TWO));
        playerHand8.add(new Card(CardType.DIAMONDS, CardValue.TWO));

        Long twoPairScore = service.evaluateHand(playerHand8, communityCards);

        // Pair
        HashSet<Card> playerHand9 = new HashSet<>();
        playerHand9.add(new Card(CardType.HEARTS, CardValue.SEVEN));
        playerHand9.add(new Card(CardType.DIAMONDS, CardValue.EIGHT));

        Long pairScore = service.evaluateHand(playerHand9, communityCards);

        System.out.println(royalFlushScore + ": royalFlushScore");
        System.out.println(straightFlushScore + ": straightFlushScore");
        System.out.println(fourOfAKindScore + ": fourOfAKindScore");
        System.out.println(fullHouseScore + ": fullHouseScore");
        System.out.println(flushScore + ": flushScore");
        System.out.println(straightScore + ": straightScore");
        System.out.println(threeOfAKindScore + ": threeOfAKindScore");
        System.out.println(twoPairScore + ": twoPairScore");
        System.out.println(pairScore + ": pairScore");

        // Assert that the hands are ranked correctly
        assertTrue(royalFlushScore > straightFlushScore, "Royal Flush should have a higher score than Straight Flush");

        // Plante =>
        assertTrue(straightFlushScore > fourOfAKindScore, "Straight Flush should have a higher score than Four of a Kind");

        assertTrue(fourOfAKindScore > fullHouseScore, "Four of a Kind should have a higher score than Full House");

        // Plante =>
        assertTrue(fullHouseScore > flushScore, "Full House should have a higher score than Flush");

        assertTrue(flushScore > straightScore, "Flush should have a higher score than Straight");
        assertTrue(straightScore > threeOfAKindScore, "Straight should have a higher score than Three of a Kind");

        // Plante =>
        assertTrue(threeOfAKindScore > twoPairScore, "Three of a Kind should have a higher score than Two Pair");

        // Plante =>
        assertTrue(twoPairScore > pairScore, "Two Pair should have a higher score than Pair");
    }

    @Test
    void testCompareSameCombinationsOnDifferentHigh(){
        PokerEvaluatorService service = new PokerEvaluatorService();

        HashSet<Card> communityCards = new HashSet<>();
        communityCards.add(new Card(CardType.HEARTS, CardValue.QUEEN));
        communityCards.add(new Card(CardType.HEARTS, CardValue.JACK));
        communityCards.add(new Card(CardType.HEARTS, CardValue.TEN));
        communityCards.add(new Card(CardType.CLUBS, CardValue.TEN));
        communityCards.add(new Card(CardType.CLUBS, CardValue.THREE));

        // Straight flush
        HashSet<Card> playerStraightFlush1 = new HashSet<>();
        playerStraightFlush1.add(new Card(CardType.HEARTS, CardValue.ACE));
        playerStraightFlush1.add(new Card(CardType.HEARTS, CardValue.KING));

        HashSet<Card> playerStraightFlush2 = new HashSet<>();
        playerStraightFlush2.add(new Card(CardType.HEARTS, CardValue.NINE));
        playerStraightFlush2.add(new Card(CardType.HEARTS, CardValue.EIGHT));

        Assertions.assertTrue(service.evaluateHand(
                playerStraightFlush1, communityCards) > service.evaluateHand(playerStraightFlush2, communityCards),
                "Royal flush score must be superior than straight flush"
        );

        // Four of a king
        HashSet<Card> fourOfAKindCommunityCards = new HashSet<>();
        fourOfAKindCommunityCards.add(new Card(CardType.HEARTS, CardValue.QUEEN));
        fourOfAKindCommunityCards.add(new Card(CardType.SPADES, CardValue.QUEEN));
        fourOfAKindCommunityCards.add(new Card(CardType.HEARTS, CardValue.TEN));
        fourOfAKindCommunityCards.add(new Card(CardType.CLUBS, CardValue.TEN));
        fourOfAKindCommunityCards.add(new Card(CardType.CLUBS, CardValue.THREE));

        HashSet<Card> playerFourOfAKind1 = new HashSet<>();
        playerFourOfAKind1.add(new Card(CardType.DIAMONDS, CardValue.QUEEN));
        playerFourOfAKind1.add(new Card(CardType.CLUBS, CardValue.QUEEN));

        HashSet<Card> playerFourOfAKind2 = new HashSet<>();
        playerFourOfAKind2.add(new Card(CardType.DIAMONDS, CardValue.TEN));
        playerFourOfAKind2.add(new Card(CardType.SPADES, CardValue.TEN));

        Assertions.assertTrue(service.evaluateHand(
                        playerFourOfAKind1, fourOfAKindCommunityCards) > service.evaluateHand(playerFourOfAKind2, fourOfAKindCommunityCards),
                "Four of a kind with queens score must be superior than tens"
        );

        // Full House
        HashSet<Card> playerFullHouse1 = new HashSet<>();
        playerFullHouse1.add(new Card(CardType.DIAMONDS, CardValue.QUEEN));
        playerFullHouse1.add(new Card(CardType.CLUBS, CardValue.QUEEN));

        HashSet<Card> playerFullHouse2 = new HashSet<>();
        playerFullHouse2.add(new Card(CardType.DIAMONDS, CardValue.JACK));
        playerFullHouse2.add(new Card(CardType.CLUBS, CardValue.JACK));

        Assertions.assertTrue(service.evaluateHand(
                        playerFullHouse1, communityCards) > service.evaluateHand(playerFullHouse2, communityCards),
                "Full House QQQTT score must be superior than JJJTT"
        );

        // Flush
        HashSet<Card> playerFlush1 = new HashSet<>();
        playerFlush1.add(new Card(CardType.HEARTS, CardValue.ACE));
        playerFlush1.add(new Card(CardType.HEARTS, CardValue.EIGHT));

        HashSet<Card> playerFlush2 = new HashSet<>();
        playerFlush2.add(new Card(CardType.HEARTS, CardValue.NINE));
        playerFlush2.add(new Card(CardType.HEARTS, CardValue.SEVEN));

        Assertions.assertTrue(service.evaluateHand(
                        playerFlush1, communityCards) > service.evaluateHand(playerFlush2, communityCards),
                "Flush Ace high score must be superior than Nine high"
        );

        // Straight
        HashSet<Card> playerStraight1 = new HashSet<>();
        playerStraight1.add(new Card(CardType.SPADES, CardValue.ACE));
        playerStraight1.add(new Card(CardType.SPADES, CardValue.KING));

        HashSet<Card> playerStraight2 = new HashSet<>();
        playerStraight2.add(new Card(CardType.SPADES, CardValue.NINE));
        playerStraight2.add(new Card(CardType.SPADES, CardValue.EIGHT));

        Assertions.assertTrue(service.evaluateHand(
                        playerStraight1, communityCards) > service.evaluateHand(playerStraight2, communityCards),
                "Straight Ace high score must be superior than Queen high"
        );

        // Three of a kind
        HashSet<Card> threeOfAKindCommunityCards = new HashSet<>();
        threeOfAKindCommunityCards.add(new Card(CardType.HEARTS, CardValue.ACE));
        threeOfAKindCommunityCards.add(new Card(CardType.SPADES, CardValue.QUEEN));
        threeOfAKindCommunityCards.add(new Card(CardType.HEARTS, CardValue.TEN));
        threeOfAKindCommunityCards.add(new Card(CardType.CLUBS, CardValue.NINE));
        threeOfAKindCommunityCards.add(new Card(CardType.CLUBS, CardValue.THREE));

        HashSet<Card> playerThreeOfAKind1 = new HashSet<>();
        playerThreeOfAKind1.add(new Card(CardType.SPADES, CardValue.ACE));
        playerThreeOfAKind1.add(new Card(CardType.CLUBS, CardValue.ACE));

        HashSet<Card> playerThreeOfAKind2 = new HashSet<>();
        playerThreeOfAKind2.add(new Card(CardType.SPADES, CardValue.NINE));
        playerThreeOfAKind2.add(new Card(CardType.DIAMONDS, CardValue.NINE));

        Assertions.assertTrue(service.evaluateHand(
                        playerThreeOfAKind1, threeOfAKindCommunityCards) > service.evaluateHand(playerThreeOfAKind2, threeOfAKindCommunityCards),
                "ThreeOfAKind Ace high score must be superior than Nine high"
        );

        // Two pair
        HashSet<Card> playerTwoPair1 = new HashSet<>();
        playerTwoPair1.add(new Card(CardType.DIAMONDS, CardValue.QUEEN));
        playerTwoPair1.add(new Card(CardType.DIAMONDS, CardValue.TWO));

        HashSet<Card> playerTwoPair2 = new HashSet<>();
        playerTwoPair2.add(new Card(CardType.DIAMONDS, CardValue.JACK));
        playerTwoPair2.add(new Card(CardType.DIAMONDS, CardValue.FIVE));

        Assertions.assertTrue(service.evaluateHand(
                        playerTwoPair1, communityCards) > service.evaluateHand(playerTwoPair2, communityCards),
                "TwoPair QQTTJ high score must be superior than Nine JJTTQ"
        );

        // Pair
        HashSet<Card> playerPair1 = new HashSet<>();
        playerPair1.add(new Card(CardType.DIAMONDS, CardValue.QUEEN));
        playerPair1.add(new Card(CardType.DIAMONDS, CardValue.TWO));

        HashSet<Card> playerPair2 = new HashSet<>();
        playerPair2.add(new Card(CardType.DIAMONDS, CardValue.JACK));
        playerPair2.add(new Card(CardType.DIAMONDS, CardValue.FIVE));

        Assertions.assertTrue(service.evaluateHand(
                        playerPair1, threeOfAKindCommunityCards) > service.evaluateHand(playerPair2, threeOfAKindCommunityCards),
                "Pair QQTTJ high score must be superior than Nine JJTTQ"
        );

        // High
        HashSet<Card> HighCommunityCards = new HashSet<>();
        HighCommunityCards.add(new Card(CardType.HEARTS, CardValue.QUEEN));
        HighCommunityCards.add(new Card(CardType.SPADES, CardValue.JACK));
        HighCommunityCards.add(new Card(CardType.HEARTS, CardValue.TEN));
        HighCommunityCards.add(new Card(CardType.CLUBS, CardValue.FOUR));
        HighCommunityCards.add(new Card(CardType.CLUBS, CardValue.THREE));

        HashSet<Card> playerHigh1 = new HashSet<>();
        playerHigh1.add(new Card(CardType.DIAMONDS, CardValue.ACE));
        playerHigh1.add(new Card(CardType.DIAMONDS, CardValue.EIGHT));

        HashSet<Card> playerHigh2 = new HashSet<>();
        playerHigh2.add(new Card(CardType.DIAMONDS, CardValue.KING));
        playerHigh2.add(new Card(CardType.DIAMONDS, CardValue.FIVE));

        Assertions.assertTrue(service.evaluateHand(
                        playerHigh1, HighCommunityCards) > service.evaluateHand(playerHigh2, HighCommunityCards),
                "Ace high score must be superior than King high"
        );
    }

}
