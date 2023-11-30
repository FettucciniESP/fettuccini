package fr.fettuccini.backend.model.exception;

import fr.fettuccini.backend.enums.PokerExceptionType;
import fr.fettuccini.backend.utils.PokerUtils;
import lombok.Getter;

@Getter
public class PokerException extends Exception {
    private final PokerExceptionType type;
    private final String message;

    public PokerException(PokerExceptionType type, String message) {
        this.type = type;
        this.message = PokerUtils.formatPokerExceptionMessage(type,message);
    }
}
