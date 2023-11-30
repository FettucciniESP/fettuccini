import { GameActionEnum } from '../enums/GameAction.enum'
import {RoundStepEnum} from "@/app/enums/RoundStep.enum";

export interface PlayerActionModel {
  actionType: GameActionEnum
  amount: number
  seatIndex: number
  roundStep: RoundStepEnum
}
