import { GameActionEnum } from '@/app/enums/GameAction.enum';
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";

export default function usePlayersStatus(playersHandInfos: PlayerHandInfosModel[]) {
    return {
        getActionIcon: (action) => {
            switch (action) {
                case GameActionEnum.BET:
                    return 'IMG';
                case GameActionEnum.CHECK:
                    return 'ok';
                case GameActionEnum.FOLD:
                    return 'X';
                default:
                    return ' ';
            }
        }
    };
}
