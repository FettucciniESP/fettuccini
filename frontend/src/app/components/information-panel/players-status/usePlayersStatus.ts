import {GameActionEnum} from '@/app/enums/GameAction.enum'
import {PlayerHandInfosModel} from '@/app/models/PlayerHandInfos.model'

export default function usePlayersStatus(
    playersHandInfos: PlayerHandInfosModel[]
) {
    return {
        getActionIcon: (action: GameActionEnum) => {
            switch (action) {
                case GameActionEnum.CALL:
                case GameActionEnum.ALL_IN:
                case GameActionEnum.BET:
                    return require('../../../assets/images/jeton_poker_v3_Blanc.png');
                case GameActionEnum.CHECK:
                    return require('../../../assets/images/check.png');
                case GameActionEnum.FOLD:
                    return require('../../../assets/images/fold.png');
                case GameActionEnum.NOTHING:
                default:
                    return require('../../../assets/images/wait.png');
            }
        },
    }
}
