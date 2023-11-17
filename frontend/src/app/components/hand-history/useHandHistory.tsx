import { GameActionEnum } from '@/app/enums/GameAction.enum'
import { HandHistoryModel } from '@/app/models/HandHistory.model'

export default function useHandHistory(HandHistoryInfos: HandHistoryModel[]) {
  return {
    getActionIcon: (action: any) => {
      switch (action) {
        case GameActionEnum.CALL:
        case GameActionEnum.BET:
          return require('../../assets/images/jeton_poker_v3_Blanc.png')
        case GameActionEnum.CHECK:
          return require('../../assets/images/check.png')
        case GameActionEnum.FOLD:
          return require('../../assets/images/fold.png')
        default:
          return ' '
      }
    },
  }
}
