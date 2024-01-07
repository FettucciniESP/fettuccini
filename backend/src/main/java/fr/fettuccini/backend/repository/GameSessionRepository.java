package fr.fettuccini.backend.repository;

import fr.fettuccini.backend.model.poker.GameSession;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GameSessionRepository extends MongoRepository<GameSession, String> {

    Optional<GameSession> findFirstByOrderByDateGameStartedDesc();
}
