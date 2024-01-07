package fr.fettuccini.backend.rc522client.exception;

public class SectorOutOfRangeException extends RuntimeException {

    public SectorOutOfRangeException(String message) {
        super(message);
    }
}
