import { GameActionEnum } from '@/app/enums/GameAction.enum'
import { RoundStepEnum } from '@/app/enums/RoundStep.enum'
import { PlayerActionModel } from '@/app/models/PlayerAction.model'
import croupierLoadingService from '@/app/services/croupier-loading.service'

export default function useActionFooter() {
  async function handleActionButtonClick(
    idPlayer: number,
    action: GameActionEnum
  ) {
    try {
      let playerAction: PlayerActionModel = {
        actionType: action,
        amount: 0,
        seatIndex: idPlayer,
        roundStep: RoundStepEnum.FLOP
      }
      if (action === GameActionEnum.BET) {
        playerAction.amount = 10
      }
      croupierLoadingService.setPlayerAction(
          playerAction,
          croupierLoadingService.getSessionId()
      ).then();
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
