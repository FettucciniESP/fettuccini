import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {RoundPlayersActionsHistoryModel} from "@/app/models/RoundPlayersActionsHistory.model";
import {RoundStepEnum} from "@/app/enums/RoundStep.enum";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";
import {CardMisreadModel} from "@/app/models/CardMisread.model";
import {ActionNeededInfosModel} from "@/app/models/ActionNeededInfos.model";
import {WinnerInfosModel} from "@/app/models/WinnerInfos.model";

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
    actionNeededInfos: ActionNeededInfosModel
    winners: WinnerInfosModel[]
}