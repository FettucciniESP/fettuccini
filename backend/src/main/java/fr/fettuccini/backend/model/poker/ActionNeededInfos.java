package fr.fettuccini.backend.model.poker;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ActionNeededInfos {

    List<CardMisread> cardMisreads;
    List<Card> impossibleCards;
}
