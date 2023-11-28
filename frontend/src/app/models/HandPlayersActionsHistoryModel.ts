import {PlayerActionModel} from "@/app/models/PlayerAction.model";

export interface HandPlayersActionsHistoryModel {
  preflop: PlayerActionModel[] | null
  flop: PlayerActionModel[] | null
  turn: PlayerActionModel[] | null
  river: PlayerActionModel[] | null
}
