package fr.fettuccini.backend.controller;

import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.GameSession;
import fr.fettuccini.backend.model.request.PlayerActionRequest;
import fr.fettuccini.backend.model.response.PlayerActionResponse;
import fr.fettuccini.backend.service.PokerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/poker")
public class PokerController {

    private final PokerService pokerService;

    @Autowired
    public PokerController(PokerService pokerService) {
        this.pokerService = pokerService;
    }

    @PostMapping("/start")
    public GameSession startGame() throws IOException {
        return pokerService.startGame();
    }

    @PostMapping("/playRound/{sessionId}")
    public PlayerActionResponse playRound(@PathVariable String sessionId) {
        return pokerService.playRound(sessionId);
    }

    @PostMapping("/end/{sessionId}")
    public GameSession endGame(@PathVariable String sessionId) throws PokerException {
        return pokerService.endGame(sessionId);
    }

    @PostMapping("/action/{sessionId}")
    public PlayerActionResponse setPlayerAction(@PathVariable String sessionId, @RequestBody PlayerActionRequest playerActionRequest) throws PokerException {
        return pokerService.setPlayerAction(sessionId, playerActionRequest);
    }
    @PostMapping("/card")
    public ResponseEntity<HttpStatus> setPlayerCard(@RequestBody PlayerActionRequest playerActionRequest){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/chip")
    public ResponseEntity<HttpStatus> setPlayerChip(@RequestBody PlayerActionRequest playerActionRequest){
        return new ResponseEntity<>(HttpStatus.OK);
    }
}