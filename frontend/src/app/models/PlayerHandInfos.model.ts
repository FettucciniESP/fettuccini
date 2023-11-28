import { GameActionEnum } from '../enums/GameAction.enum'
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";

export interface PlayerHandInfosModel extends PlayerInfosModel {
  lastAction: GameActionEnum
  betValue: number
  betIsValid: boolean
}
