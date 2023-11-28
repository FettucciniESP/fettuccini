import { GameActionEnum } from '../enums/GameAction.enum'

export interface PlayerHandInfosModel {
  lastAction: GameActionEnum
  seatIndex: number
  betValue: number
  betIsValid: boolean
}
