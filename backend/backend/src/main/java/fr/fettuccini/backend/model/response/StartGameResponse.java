package fr.fettuccini.backend.model.response;

import fr.fettuccini.backend.model.poker.Level;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class StartGameResponse {
    private PlayerActionResponse playerActionResponse;
    private List<Level> levelsStructure;
}
