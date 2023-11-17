package fr.fettuccini.backend.repository;

import fr.fettuccini.backend.model.GameSession;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameSessionRepository extends MongoRepository<GameSession, String> {
}
