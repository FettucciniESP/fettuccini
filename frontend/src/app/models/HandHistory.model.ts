import { GameActionEnum } from '../enums/GameAction.enum'

export interface HandHistoryModel {
  seat: number
  action: GameActionEnum
  betValue: number
  cardStatus: string
}
