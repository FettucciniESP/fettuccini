package fr.fettuccini.backend.repository;

import fr.fettuccini.backend.model.utils.Seat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SeatRepository extends MongoRepository<Seat, String> {

    Optional<Seat> findByIp(String ip);
}
