import { GameAction } from '../Enums/GameAction'

export class PlayerHandInfos {
  lastAction: GameAction
  siege: number
  betValue: number
  betIsValid: boolean
}

export class PlayersHandInfos {
  playersHandInfos: PlayerHandInfos[]
}
