import { GameActionEnum } from '@/app/enums/GameAction.enum'

export default function useHandHistory() {
  return {
    getActionIcon: (action: any) => {
      switch (action) {
        case GameActionEnum.CALL:
        case GameActionEnum.ALL_IN:
        case GameActionEnum.BET:
          return require('../../../assets/images/jeton_poker_v3_Blanc.png')
        case GameActionEnum.CHECK:
          return require('../../../assets/images/check.png')
        case GameActionEnum.FOLD:
          return require('../../../assets/images/fold.png')
        case GameActionEnum.NOTHING:
        default:
          return ''
      }
    },
  }
}
