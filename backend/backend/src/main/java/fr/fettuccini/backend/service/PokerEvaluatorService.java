package fr.fettuccini.backend.service;

import fr.fettuccini.backend.enums.HandType;
import fr.fettuccini.backend.model.poker.Card;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PokerEvaluatorService {

    public int evaluateHand(HashSet<Card> playerHand, HashSet<Card> communityCards) {
        if (playerHand.size() != 2 || communityCards.size() != 5) {
            throw new IllegalArgumentException("Invalid hand or community cards size");
        }

        var combinedHand = new HashSet<>(playerHand);
        combinedHand.addAll(communityCards);

        var combinedHandList = new ArrayList<>(combinedHand);
        var allCombinations = generateCombinations(combinedHandList);

        return allCombinations.stream()
                .mapToInt(this::scoreHand)
                .max()
                .orElseThrow(() -> new IllegalStateException("Unable to evaluate hand"));
    }

    private List<List<Card>> generateCombinations(List<Card> cards) {
        List<List<Card>> combinations = new ArrayList<>();
        generateCombinationsRecursive(cards, 5, 0, new ArrayList<Card>(), combinations);
        return combinations;
    }

    private void generateCombinationsRecursive(List<Card> cards, int n, int start, List<Card> current, List<List<Card>> combinations) {
        if (current.size() == n) {
            combinations.add(new ArrayList<>(current));
            return;
        }
        for (var i = start; i < cards.size(); i++) {
            current.add(cards.get(i));
            generateCombinationsRecursive(cards, n, i + 1, current, combinations);
            current.remove(current.size() - 1);
        }
    }

    private int scoreHand(List<Card> hand) {
        if (isFlush(hand) && isStraight(hand)) return calculateScore(HandType.STRAIGHT_FLUSH, hand);
        if (isFourOfAKind(hand)) return calculateScore(HandType.FOUR_OF_A_KIND, hand);
        if (isFullHouse(hand)) return calculateScore(HandType.FULL_HOUSE, hand);
        if (isFlush(hand)) return calculateScore(HandType.FLUSH, hand);
        if (isStraight(hand)) return calculateScore(HandType.STRAIGHT, hand);
        if (isThreeOfAKind(hand)) return calculateScore(HandType.THREE_OF_A_KIND, hand);
        if (isTwoPair(hand)) return calculateScore(HandType.TWO_PAIR, hand);
        if (isOnePair(hand)) return calculateScore(HandType.PAIR, hand);

        return calculateScore(HandType.HIGH_CARD, hand);
    }

    private boolean isFlush(List<Card> hand) {
        return hand.stream().map(Card::getType).distinct().count() == 1;
    }

    private boolean isStraight(List<Card> hand) {
        var values = hand.stream()
                .map(card -> card.getValue().getValue())
                .sorted()
                .collect(Collectors.toList());

        // Check for straight with Ace as high
        var straightHigh = isStraightHelper(values);

        // Check for straight with Ace as low, if Ace is present
        var straightLow = values.contains(14) && isStraightHelper(lowAceValues(values));

        return straightHigh || straightLow;
    }

    private boolean isStraightHelper(List<Integer> values) {
        for (var i = 0; i < values.size() - 4; i++) {
            if (values.get(i + 4) - values.get(i) == 4 &&
                    new HashSet<>(values.subList(i, i + 5)).size() == 5) {
                return true;
            }
        }
        return false;
    }

    private List<Integer> lowAceValues(List<Integer> values) {
        var modifiedValues = new ArrayList<>(values);
        modifiedValues.remove(Integer.valueOf(14)); // Remove high Ace
        modifiedValues.add(1); // Add low Ace
        Collections.sort(modifiedValues); // Re-sort the list
        return modifiedValues;
    }

    private boolean isFourOfAKind(List<Card> hand) {
        return hasNOfAKind(hand, 4);
    }

    private boolean isFullHouse(List<Card> hand) {
        var cardFrequency = hand.stream()
                .collect(Collectors.groupingBy(Card::getValue, Collectors.counting()));

        var hasThreeOfAKind = cardFrequency.containsValue(3L);
        var hasPair = cardFrequency.containsValue(2L);

        return hasThreeOfAKind && hasPair;
    }

    private boolean isThreeOfAKind(List<Card> hand) {
        return hasNOfAKind(hand, 3);
    }

    private boolean isTwoPair(List<Card> hand) {
        var cardFrequency = hand.stream()
                .collect(Collectors.groupingBy(Card::getValue, Collectors.counting()));

        var pairCount = cardFrequency.values().stream()
                .filter(count -> count == 2)
                .count();

        return pairCount == 2;
    }

    private boolean isOnePair(List<Card> hand) {
        return hasNOfAKind(hand, 2);
    }

    private boolean hasNOfAKind(List<Card> hand, int n) {
        var cardFrequency = hand.stream()
                .collect(Collectors.groupingBy(Card::getValue, Collectors.counting()));
        return cardFrequency.containsValue((long) n);
    }

    private int calculateScore(HandType handType, List<Card> hand) {
        var score = handType.ordinal() * 10000;

        hand.sort((c1, c2) -> c2.getValue().getValue() - c1.getValue().getValue());

        for (var i = 0; i < hand.size(); i++) {
            score += (int) (hand.get(i).getValue().getValue() * Math.pow(100, hand.size() - i - 1));
        }

        return score;
    }
}