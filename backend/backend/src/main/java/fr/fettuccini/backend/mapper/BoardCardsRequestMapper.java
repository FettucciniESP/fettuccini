package fr.fettuccini.backend.mapper;

import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.Card;
import fr.fettuccini.backend.model.poker.CardMapper;
import fr.fettuccini.backend.model.request.BoardCardsRequest;
import fr.fettuccini.backend.repository.CardMapperRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/mapper/BoardCardsRequestMapper.java
import java.util.List;
=======
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/mapper/BoardCardsRequestMapper.java

import static fr.fettuccini.backend.enums.PokerExceptionType.IMPOSSIBLE_MAPPING;

@Component
@AllArgsConstructor
public class BoardCardsRequestMapper {

    private final CardMapperRepository cardMapperRepository;

<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/mapper/BoardCardsRequestMapper.java
    public List<Card> map(BoardCardsRequest request) throws PokerException {
        var cards = cardMapperRepository.findAllById(request.getCardsId());
=======
    public Set<Card> map(BoardCardsRequest request) throws PokerException {
        var cards = new HashSet<>(cardMapperRepository.findAllById(request.getCardsId()));
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/mapper/BoardCardsRequestMapper.java

        if (cards.size() != request.getCardsId().size()) {
            throw new PokerException(IMPOSSIBLE_MAPPING, "Impossible to map cards");
        }

<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/mapper/BoardCardsRequestMapper.java
        return cards.stream().map(CardMapper::getCard).toList();
=======
        return cards.stream().map(CardMapper::getCard).collect(Collectors.toSet());
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/mapper/BoardCardsRequestMapper.java
    }

}
