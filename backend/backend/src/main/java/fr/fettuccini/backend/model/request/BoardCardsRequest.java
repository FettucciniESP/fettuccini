package fr.fettuccini.backend.model.request;

<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/model/request/BoardCardsRequest.java
import lombok.Getter;

import java.io.Serializable;
import java.util.List;

@Getter
public class BoardCardsRequest implements Serializable {
    private List<String> cardsId;
=======
import fr.fettuccini.backend.enums.CommunityCardType;
import lombok.Getter;

import java.io.Serializable;
import java.util.HashSet;

@Getter
public class BoardCardsRequest implements Serializable {
    private CommunityCardType communityCardType;
    private HashSet<String> cardsId;
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/model/request/BoardCardsRequest.java
}
