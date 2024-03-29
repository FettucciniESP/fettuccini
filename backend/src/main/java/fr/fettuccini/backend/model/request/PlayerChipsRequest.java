package fr.fettuccini.backend.model.request;

import lombok.Getter;

import java.io.Serializable;
import java.util.List;

@Getter
public class PlayerChipsRequest implements Serializable {
    private int seat;
    private List<String> chipsId;
}
