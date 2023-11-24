package fr.fettuccini.backend.repository;

import fr.fettuccini.backend.model.poker.GameSession;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameSessionRepository extends MongoRepository<GameSession, String> {
}
