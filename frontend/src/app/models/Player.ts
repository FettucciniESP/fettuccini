import { GameAction } from "./Game";


export class PlayerInfo {
    lastAction: GameAction;
    siege: number;
    LastBet: number;
}

export class PlayersInfo {
    Game: PlayerInfo[];
}