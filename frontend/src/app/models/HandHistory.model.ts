import { GameActionEnum } from '../enums/GameAction.enum'

export interface HandHistoryModel {
  siege: number
  action: GameActionEnum
  betValue: number
}
