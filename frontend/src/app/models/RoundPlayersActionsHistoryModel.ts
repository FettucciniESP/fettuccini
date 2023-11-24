import {PlayerActionModel} from "@/app/models/PlayerAction.model";

export interface RoundPlayersActionsHistoryModel {
  preflop: PlayerActionModel[] | null
  flop: PlayerActionModel[] | null
  turn: PlayerActionModel[] | null
  river: PlayerActionModel[] | null
}
