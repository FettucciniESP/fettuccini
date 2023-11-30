import axios from 'axios'
import { PlayerActionModel } from '../models/PlayerAction.model'
import { RoundStepEnum } from '../enums/RoundStep.enum'

export default function CroupierLoadingService() {
  async function setPlayerAction(
    idSeat: number,
    action: PlayerActionModel,
    sessionId: number,
    roundStep: RoundStepEnum
  ) {
    try {
      const response = await axios({
        method: 'post',
        url:
          process.env.NEXT_PUBLIC_BASE_API_URL + `/poker/action/${sessionId}`,
        data: {
          roundId: sessionId,
          seatIndex: idSeat,
          action: action,
          roundStep: roundStep,
        },
      })
      return response.data
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de l'envoi de l'action : ",
        error
      )
      throw error
    }
  }

  return {
    setPlayerAction,
  }
}
