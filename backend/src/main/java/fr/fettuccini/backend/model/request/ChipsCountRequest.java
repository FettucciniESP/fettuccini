package fr.fettuccini.backend.model.request;

import lombok.Data;

@Data
public class ChipsCountRequest {
    private Integer seatIndex;
    private String roundId;
}
