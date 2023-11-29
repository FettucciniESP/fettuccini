import {PlayerActionModel} from "@/app/models/PlayerAction.model";
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";

export interface PlayerHandInfosModel {
  lastAction: PlayerActionModel | null
  player: PlayerInfosModel
}
