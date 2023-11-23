import axios from 'axios'
import { GameActionEnum } from '../enums/GameAction.enum'

export default function CroupierLoadingService() {
  async function setPlayerAction(
    idSeat: number,
    action: GameActionEnum,
    sessionId: number
  ) {
    try {
      const response = await axios({
        method: 'post',
        url:
          process.env.NEXT_PUBLIC_BASE_API_URL + `/poker/action/${sessionId}`,
        data: {
          id: idSeat,
          playerAction: action,
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
