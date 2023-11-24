import { GameActionEnum } from '@/app/enums/GameAction.enum'
import { RoundStepEnum } from '@/app/enums/RoundStep.enum'
import { PlayerActionModel } from '@/app/models/PlayerAction.model'
import CroupierLoadingService from '@/app/services/croupier-loading.service'

export default function useActionFooter() {
  async function handleActionButtonClick(
    idPlayer: number,
    action: GameActionEnum
  ) {
    try {
      let playerAction: PlayerActionModel = {
        actionType: action,
        amount: 0,
      }
      if (action === GameActionEnum.BET) {
        playerAction.amount = 10
      }
      CroupierLoadingService().setPlayerAction(
        idPlayer,
        playerAction,
        1,
        RoundStepEnum.FLOP
      )
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de l'envoi de l'action : ",
        error
      )
    }
  }

  return {
    handleActionButtonClick,
  }
}
