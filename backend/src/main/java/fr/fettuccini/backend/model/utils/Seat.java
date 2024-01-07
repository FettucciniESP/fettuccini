package fr.fettuccini.backend.model.utils;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Seat {
    private String ip;

    private Integer seatNumber;
}
