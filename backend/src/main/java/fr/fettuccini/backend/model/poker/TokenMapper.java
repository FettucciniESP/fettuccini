package fr.fettuccini.backend.model.poker;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class TokenMapper {

    @NonNull
    private String id;

    private Integer value = -1;
}
