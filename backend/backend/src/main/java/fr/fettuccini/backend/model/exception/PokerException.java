package fr.fettuccini.backend.model.exception;

import fr.fettuccini.backend.enums.PokerExceptionType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class PokerException extends Exception {

    private final PokerExceptionType type;

    private final String message;

    public PokerException(PokerExceptionType type, String message) {
        this.type = type;
        this.message = message;
    }

    public PokerException(PokerExceptionType type) {
        this.type = type;
        this.message = type.getMessage();
    }

    public ResponseEntity<String> getResponseEntity() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(formatMessage(this.message));
    }

    private String formatMessage(String message) {
        return this.type.toString() + " : " + message;
    }
}
