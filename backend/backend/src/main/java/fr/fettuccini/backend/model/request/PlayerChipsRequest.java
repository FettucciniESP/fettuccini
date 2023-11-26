package fr.fettuccini.backend.model.request;

import lombok.Getter;

import java.util.List;

@Getter
public class PlayerChipsRequest {

    private Integer seatIndex;
    private List<String> chipsId;
}
