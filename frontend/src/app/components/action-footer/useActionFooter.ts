import {GameActionEnum} from '@/app/enums/GameAction.enum'
import {RoundStepEnum} from '@/app/enums/RoundStep.enum'
import {PlayerActionModel} from '@/app/models/PlayerAction.model'
import croupierLoadingService from '@/app/services/croupier-loading.service'
import {roundService} from "@/app/services/roundService";
import {take} from "rxjs";
import {RoundInfosModel} from "@/app/models/RoundInfos.model";
import {playersService} from "@/app/services/players.service";

export default function useActionFooter() {
  async function handleActionButtonClick(
    idPlayer: number,
    action: GameActionEnum
  ): Promise<void> {
    try {
      roundService.roundInfos$.pipe(take(1)).subscribe((roundInfos: RoundInfosModel| undefined) => {
        if (!roundInfos) {
          console.error("Erreur : round informations is undefined");
          throw alert("round informations is undefined");
        }
        let playerAction: PlayerActionModel = {
          actionType: action,
          amount: 0,
          seatIndex: idPlayer,
          roundStep: roundInfos.roundStep
        }
        if (action === GameActionEnum.BET) {
          const betAmount = prompt("Entrez le montant du pari :", "10");
          if (betAmount !== null) {
            playerAction.amount = parseInt(betAmount);
          } else {
            return;
          }
        }
        croupierLoadingService.setPlayerAction(
            playerAction,
            roundInfos.roundId
        ).then((roundInfos: RoundInfosModel) => {
          if (roundInfos.roundStep === RoundStepEnum.FINISHED) {
            croupierLoadingService.startNewRound().then((newRoundInfos: RoundInfosModel) => updateInformations(newRoundInfos));
          } else {
            updateInformations(roundInfos)
          }
        });
      })
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de l'envoi de l'action : ",
        error
      )
    }
  }

  function updateInformations(roundInfos: RoundInfosModel): void {
    playersService.setCurrentPlayerInfos(roundInfos.currentPlayingUser)
    playersService.setPlayersHandInfos(roundInfos.playersLastActions)
    roundService.setRoundPlayersActionsHistory(roundInfos.roundPlayersActionsHistory)
    roundService.setRoundInfos(roundInfos)
  }

  return {
    handleActionButtonClick,
  }
}
