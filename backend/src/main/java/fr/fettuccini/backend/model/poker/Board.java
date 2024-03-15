package fr.fettuccini.backend.model.poker;

import fr.fettuccini.backend.enums.CommunityCardType;
import fr.fettuccini.backend.enums.PokerExceptionType;
import fr.fettuccini.backend.model.exception.PokerException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Slf4j
public class Board {
    private static final int FLOP_SIZE = 3;
    private static final int TURN_SIZE = 1;
    private static final int RIVER_SIZE = 1;

    private final Set<Card> communityCards = new HashSet<>();
    private CommunityCardType lastAddedType = null;

    /**
     * Add cards to the community cards
     *
     * @param cards             cards to add
     * @param communityCardType community card type
     * @throws PokerException if adding cards is not possible
     */
    public void addCards(Set<Card> cards, CommunityCardType communityCardType) throws PokerException {
        log.debug("Attempting to add {} cards to the board. Current stage: {}", communityCardType, lastAddedType);

        if (!isValidSequence(communityCardType)) {
            log.error("Invalid community card sequence. Attempted to add {}, but last added type was {}", communityCardType, lastAddedType);
            throw new PokerException(PokerExceptionType.IMPOSSIBLE_COMMUNITY_CARD_TYPE, "Invalid sequence of community card types.");
        }

        if (!isValidCardSetForType(cards, communityCardType)) {
            log.error("Invalid number of cards for {}: {}", communityCardType, cards.size());
            throw new PokerException(PokerExceptionType.IMPOSSIBLE_COMMUNITY_CARD_TYPE, String.format("Invalid number of cards for %s.", communityCardType));
        }

        communityCards.addAll(cards);
        lastAddedType = communityCardType;

        log.info("Cards added to the community cards: {}. Last added type: {}.", cards, lastAddedType);
    }

    private boolean isValidSequence(CommunityCardType communityCardType) {
        if (lastAddedType == null && communityCardType == CommunityCardType.FLOP) return true;
        if (lastAddedType == CommunityCardType.FLOP && communityCardType == CommunityCardType.TURN) return true;
        return lastAddedType == CommunityCardType.TURN && communityCardType == CommunityCardType.RIVER;
    }

    private boolean isValidCardSetForType(Set<Card> cards, CommunityCardType communityCardType) {
        return switch (communityCardType) {
            case FLOP -> cards.size() == FLOP_SIZE;
            case TURN -> cards.size() == TURN_SIZE;
            case RIVER -> cards.size() == RIVER_SIZE;
        };
    }
}
