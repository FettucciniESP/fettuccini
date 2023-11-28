package fr.fettuccini.backend.model.request;

import fr.fettuccini.backend.enums.RoundStep;
import lombok.Getter;

import java.io.Serializable;
import java.util.List;

@Getter
public class BoardCardsRequest implements Serializable {
    private List<String> cardsId;
}
