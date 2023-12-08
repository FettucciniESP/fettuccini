package fr.fettuccini.backend.model.poker;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class CardMapper {
    private String nfcId;
    private Card card;
}
