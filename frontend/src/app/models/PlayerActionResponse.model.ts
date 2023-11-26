import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {RoundPlayersActionsHistoryModel} from "@/app/models/RoundPlayersActionsHistoryModel";
import {RoundStepEnum} from "@/app/enums/RoundStep.enum";

export interface PlayerActionResponseModel {
    currentPlayingUser: PlayerInfosModel
    currentPotAmount: number
    roundId: string
    roundPlayersActionHistory: RoundPlayersActionsHistoryModel
    roundStep: RoundStepEnum
    sessionId: string
}