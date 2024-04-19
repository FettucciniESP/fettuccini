import {GameActionEnum} from "@/app/enums/GameAction.enum";
import {VariantStyleEnum} from "@/app/enums/VariantStyle.enum";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";

export default function usePlayerSeatInformations() {
    let playerIsSelected: boolean = false;
    return {
        playerSelected: (): boolean => playerIsSelected,
        seatPlaying: (playerHandInfos: PlayerHandInfosModel, currentPlayerSeatIndex: number): VariantStyleEnum => {
            if (playerHandInfos.player.seatIndex === currentPlayerSeatIndex) {
                playerIsSelected = true;
                return VariantStyleEnum.IS_SELECTED;
            }
            if (playerHandInfos.lastAction?.actionType === GameActionEnum.FOLD || playerHandInfos.lastAction?.actionType === GameActionEnum.ALL_IN || playerHandInfos.player.balance === 0) {
                playerIsSelected = false;
                return VariantStyleEnum.BLUR;
            }
            playerIsSelected = false;
            return VariantStyleEnum.DEFAULT;
        },
    }
}