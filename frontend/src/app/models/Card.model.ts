import {CardTypeEnum} from "@/app/enums/CardType.enum";
import {CardValueEnum} from "@/app/enums/CardValue.enum";

export interface CardModel {
    type: keyof typeof CardTypeEnum;
    value: keyof typeof CardValueEnum;
}