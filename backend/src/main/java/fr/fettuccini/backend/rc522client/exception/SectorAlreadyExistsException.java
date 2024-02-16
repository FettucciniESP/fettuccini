package fr.fettuccini.backend.rc522client.exception;

public class SectorAlreadyExistsException extends RuntimeException {

    public SectorAlreadyExistsException(String message) {
        super(message);
    }
}
