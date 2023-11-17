package fr.fettuccini.backend;

import fr.fettuccini.backend.enums.CardType;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "cards")
public class Card {

    CardType cardType;

    Integer value;

}
