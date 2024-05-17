import {CardMisreadModel} from "@/app/models/CardMisread.model";
import {CardModel} from "@/app/models/Card.model";

export interface ActionNeededInfosModel {
    cardMisreads: CardMisreadModel[];
    impossibleCards: CardModel[];
}