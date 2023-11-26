import {LevelInfosModel} from "@/app/models/LevelInfos.model";
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {PlayerActionResponseModel} from "@/app/models/PlayerActionResponse.model";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";
import {LevelsStructureModel} from "@/app/models/LevelsStructure.model";

export interface StartGameResponseModel {
    levelsStructure: LevelsStructureModel
    players: PlayerHandInfosModel[]
    playerActionResponse: PlayerActionResponseModel
}