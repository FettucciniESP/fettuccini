package fr.fettuccini.backend.repository;

import fr.fettuccini.backend.model.poker.CardMapper;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CardMapperRepository extends MongoRepository<CardMapper, String> {
    Optional<CardMapper> findByNfcId(String cardId);
}
