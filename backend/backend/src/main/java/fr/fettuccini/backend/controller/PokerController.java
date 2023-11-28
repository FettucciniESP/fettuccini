package fr.fettuccini.backend.controller;

import fr.fettuccini.backend.model.GameSession;
import fr.fettuccini.backend.service.PokerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/poker")
public class PokerController {

    private final PokerService pokerService;

    @Autowired
    public PokerController(PokerService pokerService) {
        this.pokerService = pokerService;
    }

    @PostMapping("/start")
    public GameSession startGame() {
        return pokerService.startGame();
    }

    @PostMapping("/playRound/{sessionId}")
    public GameSession playRound(@PathVariable String sessionId) {
        return pokerService.playRound(sessionId);
    }

    @PostMapping("/end/{sessionId}")
    public GameSession endGame(@PathVariable String sessionId) {
        return pokerService.endGame(sessionId);
    }
}