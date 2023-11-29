package fr.fettuccini.backend.service;

import fr.fettuccini.backend.enums.CardValue;
import fr.fettuccini.backend.enums.HandType;
import fr.fettuccini.backend.model.poker.Card;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PokerEvaluatorService {

    public HandType evaluateHand(List<Card> hand) {
        if (hand.size() != 5) {
            throw new IllegalArgumentException("A poker hand must have 5 cards");
        }

        var isFlush = hand.stream().map(Card::getType).distinct().count() == 1;
        var isStraight = isStraight(hand);

        if (isFlush && isStraight) {
            return HandType.STRAIGHT_FLUSH;
        }

        var cardFrequency = hand.stream()
                .collect(Collectors.groupingBy(Card::getValue, Collectors.counting()));

        if (cardFrequency.containsValue(4L)) {
            return HandType.FOUR_OF_A_KIND;
        }
        if (cardFrequency.containsValue(3L) && cardFrequency.containsValue(2L)) {
            return HandType.FULL_HOUSE;
        }
        if (isFlush) {
            return HandType.FLUSH;
        }
        if (isStraight) {
            return HandType.STRAIGHT;
        }
        if (cardFrequency.containsValue(3L)) {
            return HandType.THREE_OF_A_KIND;
        }
        if (cardFrequency.values().stream().filter(count -> count == 2L).count() == 2) {
            return HandType.TWO_PAIR;
        }
        if (cardFrequency.containsValue(2L)) {
            return HandType.PAIR;
        }

        return HandType.HIGH_CARD;
    }

    private boolean isStraight(List<Card> hand) {
        var values = hand.stream().map(Card::getValue).sorted().toList();
        var allValues = CardValue.values();

        for (int i = 0; i <= allValues.length - 5; i++) {
            var subset = List.of(allValues).subList(i, i + 5);
            if (values.equals(subset)) {
                return true;
            }
        }
        return false;
    }

}
