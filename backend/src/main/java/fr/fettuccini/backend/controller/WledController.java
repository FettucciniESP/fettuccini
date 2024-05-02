package fr.fettuccini.backend.controller;

import fr.fettuccini.backend.model.poker.Action;
import fr.fettuccini.backend.service.WledService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class WledController {

    private final WledService wledService;

    @PostMapping("/control/led")
    public Mono<String> controlLed(@RequestBody String jsonPayload) {
        wledService.setPlayerLedColor(Action.ActionType.ALL_IN, 0);
        return Mono.just("Led has been set.");
        //return wledService.setLedState(jsonPayload, 0);
    }
}
