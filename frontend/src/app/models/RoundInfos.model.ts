import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {RoundPlayersActionsHistoryModel} from "@/app/models/RoundPlayersActionsHistoryModel";
import {RoundStepEnum} from "@/app/enums/RoundStep.enum";

export interface RoundInfosModel {
    currentPlayingUser: PlayerInfosModel
    currentPotAmount: number
    roundId: string
    roundPlayersActionsHistory: RoundPlayersActionsHistoryModel
    roundStep: RoundStepEnum
    sessionId: string
}