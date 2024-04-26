import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {RoundPlayersActionsHistoryModel} from "@/app/models/RoundPlayersActionsHistory.model";
import {RoundStepEnum} from "@/app/enums/RoundStep.enum";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";

export interface RoundInfosModel {
    currentPlayingUser: PlayerInfosModel
    currentPotAmount: number
    roundId: string
    roundPlayersActionsHistory: RoundPlayersActionsHistoryModel
    roundStep: RoundStepEnum
    sessionId: string
    currentButtonUser: PlayerInfosModel
    playersLastActions: PlayerHandInfosModel[]
    gameStartedDatetime: Date
    breakTime: boolean
}