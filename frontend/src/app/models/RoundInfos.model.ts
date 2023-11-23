import {GameActionEnum} from "@/app/enums/GameAction.enum";
import {BoardInfosModel} from "@/app/models/BoardInfos.model";

export interface RoundInfosModel {
    id: number;
    gameId: string;
    roundIndex: number;
    actions: GameActionEnum[];
    board: BoardInfosModel[];
    buttonSeatIndex: number;
    potAmount: number;
}