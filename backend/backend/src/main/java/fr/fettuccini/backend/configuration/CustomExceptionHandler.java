package fr.fettuccini.backend.configuration;

import fr.fettuccini.backend.model.exception.PokerException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(PokerException.class)
    public ResponseEntity<String> handlePokerException(PokerException e) {
        return e.getResponseEntity();
    }

}
