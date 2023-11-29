import {LevelInfosModel} from "@/app/models/LevelInfos.model";
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {RoundInfosModel} from "@/app/models/RoundInfos.model";

export interface StartGameResponseModel {
    levelsStructure: LevelInfosModel[]
    playerActionResponse: RoundInfosModel
}