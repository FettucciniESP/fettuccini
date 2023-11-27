import {PlayerActionModel} from "@/app/models/PlayerAction.model";

export interface RoundPlayersActionsHistoryModel {
  preflop: PlayerActionModel[]
  flop: PlayerActionModel[]
  turn: PlayerActionModel[]
  river: PlayerActionModel[]
}
