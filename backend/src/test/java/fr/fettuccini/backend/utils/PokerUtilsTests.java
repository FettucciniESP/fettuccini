package fr.fettuccini.backend.utils;

import fr.fettuccini.backend.enums.PokerExceptionType;
import fr.fettuccini.backend.enums.RoundStep;
import fr.fettuccini.backend.model.poker.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import org.mockito.MockedStatic;
import org.mockito.Mockito;

import java.time.LocalDateTime;
import java.util.*;

public class PokerUtilsTests {
    private GameSession gameSession;
    private Round round;
    private List<Player> players;
    private Level level;

    @BeforeEach
    public void setUp() {
        gameSession = new GameSession();
        gameSession.setDateGameStarted(LocalDateTime.now());

        List<Level> levels = new ArrayList<>();
        levels.add(createLevel(1, 10)); // Round index 1, duration 10 minutes
        levels.add(createLevel(2, 15)); // Round index 2, duration 15 minutes
        levels.add(createLevel(3, 20)); // Round index 3, duration 20 minutes

        gameSession.setLevelsStructure(levels);

        // Setting up players for the testGetPlayersWithoutFoldThisRound test
        round = new Round();
        round.setActions(new ArrayList<>());

        players = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            Player player = new Player();
            player.setName("Player " + i);
            player.setSeatIndex(i);
            players.add(player);
        }
        gameSession.setPlayers(players);

    }

    private Level createLevel(int roundIndex, int duration) {
        Level level = new Level();
        level.setRoundIndex(roundIndex);
        level.setDuration(duration);
        return level;
    }

    @Test
    public void testGetCurrentLevelByTime() {
        // Testing for a time in the first level
        LocalDateTime testTime = gameSession.getDateGameStarted().plusMinutes(5);
        try (MockedStatic<LocalDateTime> mockedStatic = Mockito.mockStatic(LocalDateTime.class)) {
            mockedStatic.when(LocalDateTime::now).thenReturn(testTime);

            Level currentLevel = PokerUtils.getCurrentLevelByTime(gameSession);
            assertNotNull(currentLevel, "Current level should not be null");
            assertEquals(1, currentLevel.getRoundIndex().intValue(), "Incorrect level for the given time");
        }

        // Testing for a time in the second level
        testTime = gameSession.getDateGameStarted().plusMinutes(15);
        try (MockedStatic<LocalDateTime> mockedStatic = Mockito.mockStatic(LocalDateTime.class)) {
            mockedStatic.when(LocalDateTime::now).thenReturn(testTime);

            Level currentLevel = PokerUtils.getCurrentLevelByTime(gameSession);
            assertNotNull(currentLevel, "Current level should not be null");
            assertEquals(2, currentLevel.getRoundIndex().intValue(), "Incorrect level for the given time");
        }

        // Testing for a time in the third level
        testTime = gameSession.getDateGameStarted().plusMinutes(30);
        try (MockedStatic<LocalDateTime> mockedStatic = Mockito.mockStatic(LocalDateTime.class)) {
            mockedStatic.when(LocalDateTime::now).thenReturn(testTime);

            Level currentLevel = PokerUtils.getCurrentLevelByTime(gameSession);
            assertNotNull(currentLevel, "Current level should not be null");
            assertEquals(3, currentLevel.getRoundIndex().intValue(), "Incorrect level for the given time");
        }
    }

    @Test
    public void testGetPlayersWithoutFoldThisRound() {
        // Simulating actions for the round
        addActionToRound(1, Action.ActionType.FOLD);
        addActionToRound(2, Action.ActionType.BET);
        addActionToRound(3, Action.ActionType.FOLD);
        addActionToRound(4, Action.ActionType.CALL);
        addActionToRound(5, Action.ActionType.RAISE);

        round = new Round();
        round.setActions(new ArrayList<>());
        gameSession.getRounds().add(round);

        List<Player> playersWithoutFold = PokerUtils.getPlayersWithoutFoldThisRound(gameSession, round);

        // Verifying that the list contains the correct players
        assertEquals(6, playersWithoutFold.size(), "Incorrect number of players who haven't folded.");
        assertTrue(playersWithoutFold.contains(players.get(1)), "Player 2 should be in the list.");
        assertTrue(playersWithoutFold.contains(players.get(3)), "Player 4 should be in the list.");
        assertTrue(playersWithoutFold.contains(players.get(4)), "Player 5 should be in the list.");
    }

    private void addActionToRound(int seatIndex, Action.ActionType actionType) {
        Integer amount = 100; // Example amount, adjust as needed for the test scenario

        Action action = new Action(actionType, amount, seatIndex, RoundStep.PREFLOP);
        round.getActions().add(action);
    }

    @Test
    public void testGetPlayersIndexListFromPlayersList() {
        List<Integer> seatIndexes = PokerUtils.getPlayersIndexListFromPlayersList(players);

        // Check if the size of the returned list matches the size of the players list
        assertEquals(players.size(), seatIndexes.size(), "The size of the seat indexes list should match the number of players");

        // Check if each player's seat index is correctly mapped
        for (int i = 0; i < players.size(); i++) {
            assertEquals(players.get(i).getSeatIndex(), seatIndexes.get(i), "Seat index of player " + (i + 1) + " does not match");
        }
    }

    @Test
    public void testGetButtonSeatIndexWithNoLastRound() {
        // Case when there is no last round
        assertTrue(gameSession.getRounds().isEmpty(), "There should be no rounds for this test case");

        Integer buttonSeatIndex = PokerUtils.getButtonSeatIndex(gameSession);
        assertNotNull(buttonSeatIndex, "Button seat index should not be null");
        assertTrue(buttonSeatIndex >= 1 && buttonSeatIndex <= players.size(), "Button seat index should be within valid range");
    }

    @Test
    public void testGetButtonSeatIndexWithLastRound() {
        // Add a last round to the game session
        Round lastRound = new Round();
        lastRound.setButtonSeatIndex(3); // Assume the button was at seat index 3 in the last round
        gameSession.getRounds().add(lastRound);

        Integer buttonSeatIndex = PokerUtils.getButtonSeatIndex(gameSession);
        assertNotNull(buttonSeatIndex, "Button seat index should not be null");
        assertNotEquals(Integer.valueOf(3), buttonSeatIndex, "Button seat index should not be the same as the last round");
    }

    @Test
    public void testGetRandomIndexInListReturnsValidIndex() {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
        Integer randomIndex = PokerUtils.getRandomIndexInList(list);

        assertNotNull(randomIndex, "Random index should not be null");
        assertTrue(list.contains(randomIndex), "Random index should be one of the list elements");
    }

    @Test
    public void testGetRandomIndexInListWithEmptyList() {
        List<Integer> emptyList = Collections.emptyList();

        // Expect a NoSuchElementException when the list is empty
        assertThrows(NoSuchElementException.class, () -> {
            PokerUtils.getRandomIndexInList(emptyList);
        });
    }

    @Test
    public void testGetNextPlayerIndexNotAtMaxIndex() {
        // Test that the next player index is correctly identified when the last player is not at the maximum index.
        List<Integer> seatIndexes = Arrays.asList(1, 2, 3, 4, 5);
        Integer lastPlayerIndex = 3;
        Integer nextPlayerIndex = PokerUtils.getNextPlayerIndex(seatIndexes, lastPlayerIndex);

        assertEquals(Integer.valueOf(4), nextPlayerIndex, "Next player index should be 4");
    }

    @Test
    public void testGetNextPlayerIndexAtMaxIndex() {
        // Test that the next player index wraps around to the beginning when the last player is at the maximum index.
        List<Integer> seatIndexes = Arrays.asList(1, 2, 3, 4, 5);
        Integer lastPlayerIndex = 5;
        Integer nextPlayerIndex = PokerUtils.getNextPlayerIndex(seatIndexes, lastPlayerIndex);

        assertEquals(Integer.valueOf(1), nextPlayerIndex, "Next player index should wrap around to 1");
    }

    @Test
    public void testGetNextPlayerIndexEmptyList() {
        // Test that the method returns a default value when the list of seat indexes is empty.
        List<Integer> seatIndexes = Collections.emptyList();
        Integer lastPlayerIndex = 3;
        Integer nextPlayerIndex = PokerUtils.getNextPlayerIndex(seatIndexes, lastPlayerIndex);

        assertEquals(Integer.valueOf(1), nextPlayerIndex, "Default value should be 1 for an empty list");
    }

    @Test
    public void testGetNextPlayerIndexSingleElement() {
        // Test that the next player index is the same as the last player index when there is only one element in the list.
        List<Integer> seatIndexes = Collections.singletonList(2);
        Integer lastPlayerIndex = 2;
        Integer nextPlayerIndex = PokerUtils.getNextPlayerIndex(seatIndexes, lastPlayerIndex);

        assertEquals(Integer.valueOf(2), nextPlayerIndex, "Next player index should be the only element in the list");
    }

    @Test
    public void testGetSmallBlindPlayer() {
        // Set button seat index to 3, small blind should be at seat index 4
        round.setButtonSeatIndex(3);
        Optional<Player> smallBlindPlayer = PokerUtils.getSmallBlindPlayer(players, round);

        assertTrue(smallBlindPlayer.isPresent(), "There should be a player assigned to the small blind");
        assertEquals(Integer.valueOf(4), smallBlindPlayer.get().getSeatIndex(), "The small blind player should have the seat index 4");
    }

    @Test
    public void testGetSmallBlindPlayerNoPlayers() {
        // Test with no players
        round.setButtonSeatIndex(3);
        Optional<Player> smallBlindPlayer = PokerUtils.getSmallBlindPlayer(new ArrayList<>(), round);

        assertFalse(smallBlindPlayer.isPresent(), "There should not be a small blind player when no players are present");
    }

    @Test
    public void testGetBigBlindPlayer() {
        // Set button seat index so that small blind is at seat index 4, big blind should be at seat index 5
        round.setButtonSeatIndex(3);
        Optional<Player> bigBlindPlayer = PokerUtils.getBigBlindPlayer(players, round);

        assertTrue(bigBlindPlayer.isPresent(), "There should be a player assigned to the big blind");
        assertEquals(Integer.valueOf(5), bigBlindPlayer.get().getSeatIndex(), "The big blind player should have the seat index 5");
    }

    @Test
    public void testGetBigBlindPlayerNoPlayers() {
        // Test with no players
        round.setButtonSeatIndex(3);
        Optional<Player> bigBlindPlayer = PokerUtils.getBigBlindPlayer(new ArrayList<>(), round);

        assertFalse(bigBlindPlayer.isPresent(), "There should not be a big blind player when no players are present");
    }

    @Test
    public void testGetLastRoundWithMultipleRounds() {
        // Adding multiple rounds to the game session
        for (int i = 1; i <= 5; i++) {
            Round round = new Round();
            round.setRoundIndex(i);
            gameSession.getRounds().add(round);
        }

        Optional<Round> lastRound = PokerUtils.getLastRound(gameSession);

        assertTrue(lastRound.isPresent(), "There should be a last round");
        assertEquals(5, lastRound.get().getRoundIndex(), "The last round should have the highest round index");
    }

    @Test
    public void testGetLastRoundWithNoRounds() {
        // Ensure no rounds are added to the game session
        assertTrue(gameSession.getRounds().isEmpty(), "There should be no rounds in the game session");

        Optional<Round> lastRound = PokerUtils.getLastRound(gameSession);

        assertFalse(lastRound.isPresent(), "There should not be a last round when no rounds are present");
    }

    @Test
    public void testGetRoundIndexWithNoRounds() {
        // Ensure no rounds are added to the game session
        assertTrue(gameSession.getRounds().isEmpty(), "There should be no rounds in the game session");

        Integer nextRoundIndex = PokerUtils.getRoundIndex(gameSession);

        assertEquals(Integer.valueOf(1), nextRoundIndex, "The next round index should be 1 when there are no rounds");
    }

    @Test
    public void testGetRoundIndexWithMultipleRounds() {
        // Adding multiple rounds to the game session
        for (int i = 1; i <= 5; i++) {
            Round round = new Round();
            round.setRoundIndex(i);
            gameSession.getRounds().add(round);
        }

        Integer nextRoundIndex = PokerUtils.getRoundIndex(gameSession);

        assertEquals(Integer.valueOf(6), nextRoundIndex, "The next round index should be one greater than the last round's index");
    }

    @Test
    public void testGetPlayerBySeatIndexValid() {
        Integer seatIndex = 3;
        Player player = PokerUtils.getPlayerBySeatIndex(gameSession, seatIndex);

        assertNotNull(player, "Player should not be null");
        assertEquals(seatIndex, player.getSeatIndex(), "The retrieved player should have the correct seat index");
    }

    @Test
    public void testGetPlayerBySeatIndexInvalid() {
        Integer seatIndex = 10; // An invalid seat index

        assertThrows(NoSuchElementException.class, () -> {
            PokerUtils.getPlayerBySeatIndex(gameSession, seatIndex);
        }, "Should throw NoSuchElementException for an invalid seat index");
    }

    @Test
    public void testDidAllPlayersPlayedThisRoundStepAllPlayed() {
        // Set the round step
        round.setRoundStep(RoundStep.FLOP);

        // Simulate a scenario where all players have played
        for (Player player : players) {
            Action action = new Action(Action.ActionType.CALL, 100, player.getSeatIndex(), RoundStep.FLOP);
            round.addAction(action);
        }

        boolean allPlayed = PokerUtils.didAllPlayersPlayedThisRoundStep(round, gameSession);

        assertTrue(allPlayed, "All players should have played in this round step");
    }

    @Test
    public void testDidAllPlayersPlayedThisRoundStepNotAllPlayed() {
        // Set the round step
        round.setRoundStep(RoundStep.FLOP);

        // Simulate a scenario where not all players have played
        for (int i = 0; i < players.size() / 2; i++) {
            Action action = new Action(Action.ActionType.CALL, 100, players.get(i).getSeatIndex(), RoundStep.FLOP);
            round.addAction(action);
        }

        boolean allPlayed = PokerUtils.didAllPlayersPlayedThisRoundStep(round, gameSession);

        assertFalse(allPlayed, "Not all players should have played in this round step");
    }

    @Test
    public void testAreBlindsPlayersAlreadyPlayedPreflopNotAllPlayed() {
        if (!gameSession.getPlayers().isEmpty()) {
            round.setButtonSeatIndex(gameSession.getPlayers().get(0).getSeatIndex()); // or any valid index
        }
        round.setRoundStep(RoundStep.PREFLOP);

        // Add an action for only the assumed small blind player
        // Replace 1 with the actual small blind seat index
        round.addAction(new Action(Action.ActionType.CALL, 100, 1, RoundStep.PREFLOP));

        boolean blindsPlayed = PokerUtils.areBlindsPlayersAlreadyPlayedPreflop(round, gameSession);

        assertFalse(blindsPlayed, "Not all blind players have played in the pre-flop");
    }

    @Test
    public void testGetHighestBetValueForCurrentRoundStepWithMultipleBets() {
        round = new Round();
        round.setRoundStep(RoundStep.FLOP); // Assuming the current round step is FLOP
        round.setActions(new ArrayList<>());
        // Adding multiple bet actions
        round.addAction(new Action(Action.ActionType.BET, 50, 1, RoundStep.FLOP));
        round.addAction(new Action(Action.ActionType.RAISE, 100, 2, RoundStep.FLOP));
        round.addAction(new Action(Action.ActionType.CALL, 100, 3, RoundStep.FLOP));

        // Checking if actions are correctly added
        assertEquals(3, round.getActions().size(), "There should be 3 actions in the round");

        Integer highestBet = PokerUtils.getHighestBetValueForCurrentRoundStep(round);
        assertEquals(Integer.valueOf(100), highestBet, "Highest bet should be 100");
    }

    @Test
    public void testGetHighestBetValueForCurrentRoundStepWithNoBets() {
        // No bet actions added

        Integer highestBet = PokerUtils.getHighestBetValueForCurrentRoundStep(round);

        assertEquals(Integer.valueOf(0), highestBet, "Highest bet should be 0 when there are no bets");
    }

    @Test
    public void testGetHighestBetValueForPlayerInCurrentRoundStepWithMultipleBets() {
        round = new Round();
        round.setRoundStep(RoundStep.FLOP); // Assuming the current round step is FLOP
        round.setActions(new ArrayList<>());
        int playerSeatIndex = 1;
        // Adding multiple bet actions for the specific player
        round.addAction(new Action(Action.ActionType.BET, 50, playerSeatIndex, RoundStep.FLOP));
        round.addAction(new Action(Action.ActionType.RAISE, 100, playerSeatIndex, RoundStep.FLOP));
        // Adding bet actions for other players
        round.addAction(new Action(Action.ActionType.CALL, 200, 2, RoundStep.FLOP));

        Integer highestBet = PokerUtils.getHighestBetValueForPlayerInCurrentRoundStep(round, playerSeatIndex);

        assertEquals(Integer.valueOf(100), highestBet, "Highest bet for the player should be 100");
    }

    @Test
    public void testGetHighestBetValueForPlayerInCurrentRoundStepWithNoBets() {
        int playerSeatIndex = 1;
        // No bet actions added for the specific player

        Integer highestBet = PokerUtils.getHighestBetValueForPlayerInCurrentRoundStep(round, playerSeatIndex);

        assertEquals(Integer.valueOf(0), highestBet, "Highest bet should be 0 when the player has no bets");
    }

    @Test
    public void testGetRoundPlayersLastActionList() {
        GameSession gameSession = new GameSession();
        Round round = new Round();
        round.setRoundStep(RoundStep.PREFLOP);
        gameSession.getRounds().add(round);

        List<Player> players = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            Player player = new Player();
            player.setName("Player " + i);
            player.setSeatIndex(i);
            players.add(player);
        }
        gameSession.setPlayers(players);
        for (Player player : players) {
            Action action = new Action(Action.ActionType.CALL, 100, player.getSeatIndex(), RoundStep.PREFLOP);
            round.addAction(action);
        }

        List<PlayerLastAction> playerLastActionList = PokerUtils.getRoundPlayersLastActionList(gameSession, round);
        assertEquals(players.size(), playerLastActionList.size(), "The size of the list should match the number of players");

        for (PlayerLastAction pla : playerLastActionList) {
            System.out.println(pla.getLastAction());
            assertNotNull(pla.getLastAction(), "The last action of the player should not be null");
            assertEquals(Action.ActionType.CALL, pla.getLastAction().getActionType(), "The action type should match");
            assertEquals(100, pla.getLastAction().getAmount(), "The amount of the action should match");
        }
    }

    @Test
    public void testGetPlayerLastAction() {
        // Create a new game session and round
        GameSession gameSession = new GameSession();
        Round round = new Round();
        round.setRoundStep(RoundStep.PREFLOP);
        gameSession.getRounds().add(round);

        // Add players to the game session
        List<Player> players = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            Player player = new Player();
            player.setName("Player " + i);
            player.setSeatIndex(i);
            players.add(player);
        }
        gameSession.setPlayers(players);

        // Add actions to the round for each player
        for (Player player : players) {
            Action action = new Action(Action.ActionType.CALL, 100, player.getSeatIndex(), RoundStep.PREFLOP);
            round.addAction(action);
        }

        // Test getPlayerLastAction for each player
        for (Player player : players) {
            PlayerLastAction pla = PokerUtils.getPlayerLastAction(gameSession, round, player.getSeatIndex());
            assertNotNull(pla, "PlayerLastAction should not be null");
            assertNotNull(pla.getLastAction(), "The last action of the player should not be null");
            assertEquals(Action.ActionType.CALL, pla.getLastAction().getActionType(), "The action type should match");
            assertEquals(100, pla.getLastAction().getAmount(), "The amount of the action should match");
        }
    }

    @Test
    public void testGetLastPlayerAction() {
        // Create a new game session and round
        GameSession gameSession = new GameSession();
        Round round = new Round();
        round.setRoundStep(RoundStep.PREFLOP);
        gameSession.getRounds().add(round);

        // Add players to the game session
        List<Player> players = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            Player player = new Player();
            player.setName("Player " + i);
            player.setSeatIndex(i);
            players.add(player);
        }
        gameSession.setPlayers(players);

        // Add actions to the round for each player
        for (Player player : players) {
            Action action = new Action(Action.ActionType.CALL, 100, player.getSeatIndex(), RoundStep.PREFLOP);
            round.addAction(action);
        }

        // Test getLastPlayerAction for each player
        for (Player player : players) {
            Optional<Action> lastAction = PokerUtils.getLastPlayerAction(round, player.getSeatIndex());
            assertTrue(lastAction.isPresent(), "Last action of the player should be present");
            assertEquals(Action.ActionType.CALL, lastAction.get().getActionType(), "The action type should match");
            assertEquals(100, lastAction.get().getAmount(), "The amount of the action should match");
        }
    }

    @Test
    public void testFormatPokerExceptionMessage() {
        // Define a custom message
        String message = "This is a test message.";

        // Loop through all PokerExceptionType values
        for (PokerExceptionType pokerExceptionType : PokerExceptionType.values()) {
            // Call the method with the current PokerExceptionType and the custom message
            String result = PokerUtils.formatPokerExceptionMessage(pokerExceptionType, message);

            // Define the expected result
            String expectedResult = pokerExceptionType.toString() + " : " + message;

            // Assert that the result matches the expected result
            assertEquals(expectedResult, result, "The formatted message should match the expected result for " + pokerExceptionType);
        }
    }
}