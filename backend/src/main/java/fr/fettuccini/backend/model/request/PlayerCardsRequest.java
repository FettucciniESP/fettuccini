package fr.fettuccini.backend.model.request;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
public class PlayerCardsRequest implements Serializable {
    @Setter
    int seat;
    private List<String> cardsId;
}
