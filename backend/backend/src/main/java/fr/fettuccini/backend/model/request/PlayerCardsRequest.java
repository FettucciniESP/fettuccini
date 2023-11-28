package fr.fettuccini.backend.model.request;

import lombok.Getter;

import java.io.Serializable;
import java.util.List;

@Getter
public class PlayerCardsRequest implements Serializable {

    private String ip;
    private List<String> cardsId;
}
