package fr.fettuccini.backend.model.response;

import fr.fettuccini.backend.model.poker.Level;
import fr.fettuccini.backend.model.poker.Player;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class StartGameResponse {
    private PlayerActionResponse playerActionResponse;
    private List<Player> players;
    private List<Level> levelsStructure;
}
