import { GameActionEnum } from '@/app/enums/GameAction.enum'
import { HandHistoryModel } from '@/app/models/HandHistory.model'

export default function useHandHistory(HandHistoryInfos: HandHistoryModel[]) {
  return {
    getActionIcon: (action: any) => {
      switch (action) {
        case GameActionEnum.CALL:
        case GameActionEnum.BET:
          return 'IMG_JETON'
        case GameActionEnum.CHECK:
          return 'IMG_OK'
        case GameActionEnum.FOLD:
          return 'IMG_NOTOK'
        default:
          return ' '
      }
    },
  }
}
