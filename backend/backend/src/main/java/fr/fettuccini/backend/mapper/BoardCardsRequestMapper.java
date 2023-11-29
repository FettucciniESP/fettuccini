package fr.fettuccini.backend.mapper;

import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.Card;
import fr.fettuccini.backend.model.poker.CardMapper;
import fr.fettuccini.backend.model.request.BoardCardsRequest;
import fr.fettuccini.backend.repository.CardMapperRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

import static fr.fettuccini.backend.enums.PokerExceptionType.IMPOSSIBLE_MAPPING;

@Component
@AllArgsConstructor
@RequiredArgsConstructor
public class BoardCardsRequestMapper {

    private CardMapperRepository cardMapperRepository;

    public List<Card> map(BoardCardsRequest request) throws PokerException {
        var cards = cardMapperRepository.findAllById(request.getCardsId());

        if (cards.size() != request.getCardsId().size()) {
            throw new PokerException(IMPOSSIBLE_MAPPING, "Impossible to map cards");
        }

        return cards.stream().map(CardMapper::getCard).toList();
    }

}
