package fr.fettuccini.backend.model.request;

import fr.fettuccini.backend.enums.CommunityCardType;
import lombok.Getter;

import java.io.Serializable;
import java.util.HashSet;

@Getter
public class BoardCardsRequest implements Serializable {
    private CommunityCardType communityCardType;
    private HashSet<String> cardsId;
}
