import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {CardModel} from "@/app/models/Card.model";

export interface CardMisreadModel {
    player: PlayerInfosModel | null;
    cards: Array<CardModel|null>;
}