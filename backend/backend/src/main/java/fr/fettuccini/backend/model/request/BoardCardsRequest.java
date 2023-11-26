package fr.fettuccini.backend.model.request;

import fr.fettuccini.backend.enums.RoundStep;
import lombok.Getter;

import java.util.List;

@Getter
public class BoardCardsRequest {
    private RoundStep roundStep;
    private List<String> cardsId;
}
