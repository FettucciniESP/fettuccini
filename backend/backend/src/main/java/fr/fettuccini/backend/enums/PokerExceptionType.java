package fr.fettuccini.backend.enums;


import lombok.Getter;

@Getter
public enum PokerExceptionType {

    GAME_NOT_FOUND("Game with session id %s not found"),
    ROUND_NOT_FOUND("Round with id %s not found"),
    BAD_ROUND("Round with id %s is not the current round"),
    BAD_ROUND_STEP("Round with id %s is not in step %s"),
    BAD_BET_AMOUNT("Minimum bet amount is %s"),
    BAD_ACTION_TYPE("Action type %s is not valid"),
    PLAYER_ALREADY_FOLD("Player seat %s already fold"),
    EXPECTED_OTHER_PLAYER_ACTION("Expected player seat %s to make action"),
    IMPOSSIBLE_MAPPING("Impossible to map card or chip to value"),
    ;

    private final String message;

    PokerExceptionType(String message) {
        this.message = message;
    }

}
