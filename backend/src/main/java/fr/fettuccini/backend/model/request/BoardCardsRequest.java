package fr.fettuccini.backend.model.request;

import lombok.Getter;

import java.io.Serializable;
import java.util.HashSet;

@Getter
public class BoardCardsRequest implements Serializable {
    private HashSet<String> cardsId;
}
