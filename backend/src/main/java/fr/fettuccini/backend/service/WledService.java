package fr.fettuccini.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.fettuccini.backend.model.poker.Action;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Map;

//

@Service
@Slf4j
public class WledService {

    private final WebClient webClient;
    private static final String BASE_URL = "/json/state";
    private final ObjectMapper objectMapper = new ObjectMapper();

    //@Value("${wled.device.url:http://192.168.241.15}")
    private final String WLED_DEVICE_URL = "http://192.168.241.15";

    @Value("${wled.max.player.count:6}")
    private int maxPlayerCount;

    @Value("${wled.timeout.seconds:5}")
    private int timeoutInSeconds;

    private int[] losers;

    private static final Map<Action.ActionType, int[]> ACTION_LED_COLOR_MAP = Map.of(
            Action.ActionType.BET, new int[] {255, 200, 50}, // Jaune
            Action.ActionType.RAISE, new int[] {255, 200, 50}, // Jaune
            Action.ActionType.FOLD, new int[] {0, 0, 0}, // Eteint
            Action.ActionType.LOSE, new int[] {0, 0, 0}, // Eteint
            Action.ActionType.CHECK, new int[] {0, 255, 0}, // Vert
            Action.ActionType.CALL, new int[] {0, 255, 0}, // Vert
            Action.ActionType.ALL_IN, new int[] {255, 0, 0}, // Rouge
            Action.ActionType.PLAYER_TURN, new int[] {0, 0, 255}, // Bleu, tour du joueur pas encore d'action
            Action.ActionType.WIN, new int[] {0, 0, 255} // Animation WIN, FADE, 75% vitesse.
    );

    public WledService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(WLED_DEVICE_URL).build();
    }

    public Mono<String> resetPlayerLeds() {
        return Flux.range(0, maxPlayerCount)
                .flatMap(this::prepareAndSetLedState)
                .then(Mono.just("All LEDs have been reset."))
                .onErrorResume(e -> {
                    log.error("Failed to reset player LEDs: {}", e.getMessage(), e);
                    return Mono.just("Failed to reset all LEDs.");
                });
    }

    public void setPlayerLedColor(Action.ActionType action, int seatIndex) {
        int[] color = ACTION_LED_COLOR_MAP.get(action);
        if (color == null) {
            log.error("Invalid action type: {}", action);
            throw new IllegalArgumentException("Invalid action type: " + action);
        }
        String jsonPayload = String.format("""
            {"on": true, "seg": [{"id": %d, "fx": 0, "col": [[%d,%d,%d]], "effect": "Solid"}]}
            """, seatIndex - 1, color[0], color[1], color[2]);
        setLedState(jsonPayload).subscribe(
                result -> log.info("LED state set for seat {}: {}", seatIndex - 1, result),
                error -> log.error("Error setting LED state for seat {}: {}", seatIndex - 1, error.getMessage(), error)
        );
    }

    private Mono<String> prepareAndSetLedState(int seat) {
        String jsonPayload = String.format("""
            {"on": true, "seg": [{"id": %d, "fx": 0, "col": [[0,0,255]], "effect": "Solid"}]}
            """, seat - 1);
        return setLedState(jsonPayload);
    }

    private Mono<String> setLedState(String jsonPayload) {
        return this.webClient.post()
                .uri(BASE_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(jsonPayload))
                .retrieve()
                .bodyToMono(String.class)
                .onErrorMap(JsonProcessingException.class, ex -> new RuntimeException("JSON processing error", ex));
    }

    @PostConstruct
    public void init() {
        resetPlayerLeds().subscribe();
    }

    //@PreDestroy
    //public void cleanup() {
    //    try {
    //        resetPlayerLeds().block(Duration.ofSeconds(timeoutInSeconds));
    //    } catch (Exception e) {
    //        log.error("Failed to reset LEDs on shutdown: {}", e.getMessage(), e);
    //    }
    //}
}
