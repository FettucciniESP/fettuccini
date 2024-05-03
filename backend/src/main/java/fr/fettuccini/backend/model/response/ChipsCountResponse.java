package fr.fettuccini.backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChipsCountResponse {
    private Integer seatIndex;
    private String roundId;
    private Integer chipsCount;
}
