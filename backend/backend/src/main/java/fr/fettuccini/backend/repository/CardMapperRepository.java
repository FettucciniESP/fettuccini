package fr.fettuccini.backend.repository;

import fr.fettuccini.backend.model.poker.CardMapper;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CardMapperRepository extends MongoRepository<CardMapper, String> {
}
