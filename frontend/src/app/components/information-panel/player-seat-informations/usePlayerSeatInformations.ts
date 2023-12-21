import {GameActionEnum} from "@/app/enums/GameAction.enum";
import {VariantStyleEnum} from "@/app/enums/VariantStyle.enum";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";

export default function usePlayerSeatInformations() {
    return {
        seatPlaying: (playerHandInfos: PlayerHandInfosModel, currentPlayerSeatIndex: number): VariantStyleEnum => {
            if (playerHandInfos.player.seatIndex === currentPlayerSeatIndex) {
                return VariantStyleEnum.IS_SELECTED;
            }
            if (playerHandInfos.lastAction?.actionType === GameActionEnum.FOLD || playerHandInfos.lastAction?.actionType === GameActionEnum.ALL_IN || playerHandInfos.player.balance === 0) {
                return VariantStyleEnum.BLUR;
            }
            return VariantStyleEnum.DEFAULT;
        },
    }
}