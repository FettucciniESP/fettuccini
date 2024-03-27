package fr.fettuccini.backend.controller;

import fr.fettuccini.backend.mapper.BoardCardsRequestMapper;
import fr.fettuccini.backend.mapper.PlayerCardsRequestMapper;
import fr.fettuccini.backend.mapper.PlayerChipsRequestMapper;
import fr.fettuccini.backend.model.exception.PokerException;
import fr.fettuccini.backend.model.poker.GameSession;
import fr.fettuccini.backend.model.request.*;
import fr.fettuccini.backend.model.response.PlayerActionResponse;
import fr.fettuccini.backend.model.response.PlayerBetResponse;
import fr.fettuccini.backend.model.response.StartGameResponse;
import fr.fettuccini.backend.service.PokerService;
import fr.fettuccini.backend.service.UpdateBoardCardsService;
import fr.fettuccini.backend.service.UpdateCardsService;
import fr.fettuccini.backend.service.UpdatePlayerChipsService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/poker")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class PokerController {

    private final PokerService pokerService;
    private final UpdatePlayerChipsService updatePlayerChipsService;
    private final UpdateCardsService updateCardsService;
    private final UpdateBoardCardsService updateBoardCardsService;
    private final PlayerCardsRequestMapper playerCardsRequestMapper;
    private final PlayerChipsRequestMapper playerChipsRequestMapper;
    private final BoardCardsRequestMapper boardCardsRequestMapper;

    @PostMapping("/start")
    public StartGameResponse startGame(@RequestBody StartGameRequest startGameRequest) throws IOException, PokerException {
        return pokerService.startGame(startGameRequest);
    }

    @PostMapping("/playRound/{sessionId}")
    public PlayerActionResponse playRound(@PathVariable String sessionId) throws PokerException {
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

    @PostMapping("/playerCards")
    public ResponseEntity<HttpStatus> setPlayerCard(HttpServletRequest req, @RequestBody PlayerCardsRequest playerCardsRequest) {
        var ip = req.getRemoteAddr();
        var playerCards = playerCardsRequestMapper.map(playerCardsRequest, ip);

        updateCardsService.updatePlayerCards(playerCards);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/playerBet")
    public PlayerBetResponse setPlayerChip(HttpServletRequest req, @RequestBody PlayerChipsRequest playerChipsRequest) {
        var ip = req.getRemoteAddr();
        var playerChips = playerChipsRequestMapper.map(playerChipsRequest, ip);

        val totalAmount = updatePlayerChipsService.updatePlayerChips(playerChips);
        return new PlayerBetResponse(totalAmount);
    }

    @PostMapping("/boardCards")
    public ResponseEntity<HttpStatus> setBoardCards(@RequestBody BoardCardsRequest boardCardsRequest) throws PokerException {
        var boardCards = boardCardsRequestMapper.map(boardCardsRequest);

        updateBoardCardsService.updateBoardCards(boardCards, boardCardsRequest.getCommunityCardType());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
