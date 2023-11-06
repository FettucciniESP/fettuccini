import { GameActionEnum } from '../enums/GameAction.enum'

export interface PlayerHandInfosModel {
  lastAction: GameActionEnum;
  siege: number;
  betValue: number;
  betIsValid: boolean;
}
