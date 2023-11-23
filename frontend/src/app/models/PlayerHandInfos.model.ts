import { GameActionEnum } from '../enums/GameAction.enum'

export interface PlayerHandInfosModel {
  lastAction: GameActionEnum
  seat: number
  betValue: number
  betIsValid: boolean
}
