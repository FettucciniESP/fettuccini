package fr.fettuccini.backend.repository;

import fr.fettuccini.backend.model.poker.TokenMapper;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TokenMapperRepository extends MongoRepository<TokenMapper, String> {
}
