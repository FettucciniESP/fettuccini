import {LevelInfosModel} from "@/app/models/LevelInfos.model";
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {RoundInfosModel} from "@/app/models/RoundInfos.model";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";

export interface StartGameResponseModel {
    levelsStructure: LevelInfosModel[]
    players: PlayerHandInfosModel[]
    playerActionResponse: RoundInfosModel
}