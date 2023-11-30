import {LevelInfosModel} from "@/app/models/LevelInfos.model";
import {RoundInfosModel} from "@/app/models/RoundInfos.model";

export interface StartGameResponseModel {
    levelsStructure: LevelInfosModel[]
    playerActionResponse: RoundInfosModel
}