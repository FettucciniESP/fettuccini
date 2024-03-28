package fr.fettuccini.backend.model.request;

import lombok.Getter;

import java.io.Serializable;
import java.util.List;

@Getter
public class PlayerChipsRequest implements Serializable {
<<<<<<< HEAD:backend/backend/src/main/java/fr/fettuccini/backend/model/request/PlayerChipsRequest.java
=======
    private int seat;
>>>>>>> origin/develop:backend/src/main/java/fr/fettuccini/backend/model/request/PlayerChipsRequest.java
    private List<String> chipsId;
}
