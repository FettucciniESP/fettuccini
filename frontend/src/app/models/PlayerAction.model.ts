import { GameActionEnum } from '../enums/GameAction.enum'

export interface PlayerActionModel {
  actionType: GameActionEnum
  amount: number
}
