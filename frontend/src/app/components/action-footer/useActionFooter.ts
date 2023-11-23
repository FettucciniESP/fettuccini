import { GameActionEnum } from '@/app/enums/GameAction.enum'
import CroupierLoadingService from '@/app/services/croupier-loading.service'

export default function useActionFooter() {
  async function handleActionButtonClick(
    idPlayer: number,
    action: GameActionEnum
  ) {
    try {
      CroupierLoadingService().setPlayerAction(idPlayer, action, 1)
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
