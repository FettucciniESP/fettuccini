package fr.fettuccini.backend.mapper;

import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.Card;
import fr.fettuccini.backend.model.poker.CardMapper;
import fr.fettuccini.backend.model.request.BoardCardsRequest;
import fr.fettuccini.backend.repository.CardMapperRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.stream.Collectors;

import static fr.fettuccini.backend.enums.PokerExceptionType.IMPOSSIBLE_MAPPING;

@Component
@AllArgsConstructor
public class BoardCardsRequestMapper {

    private final CardMapperRepository cardMapperRepository;

    public HashSet<Card> map(BoardCardsRequest request) throws PokerException {
        var cards = new HashSet<>(cardMapperRepository.findAllById(request.getCardsId()));

        if (cards.size() != request.getCardsId().size()) {
            throw new PokerException(IMPOSSIBLE_MAPPING, "Impossible to map cards");
        }

        return (HashSet<Card>) cards.stream().map(CardMapper::getCard).collect(Collectors.toSet());
    }

}
