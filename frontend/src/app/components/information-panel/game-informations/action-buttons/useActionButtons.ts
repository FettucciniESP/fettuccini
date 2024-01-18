import {GameActionEnum} from '@/app/enums/GameAction.enum'
import {RoundStepEnum} from '@/app/enums/RoundStep.enum'
import {PlayerActionModel} from '@/app/models/PlayerAction.model'
import {croupierLoadingService} from '@/app/services/croupier-loading.service'
import {roundService} from "@/app/services/round.service";
import {RoundInfosModel} from "@/app/models/RoundInfos.model";
import {playersService} from "@/app/services/players.service";
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {RoundPlayersActionsHistoryModel} from "@/app/models/RoundPlayersActionsHistory.model";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";

export default function useActionButtons() {
    let [roundInfos, setRoundInfos] = useState<RoundInfosModel>();

    useEffect(() => {
        const roundInfos_subscribe: Subscription = roundService.roundInfos$.subscribe((roundInfos: RoundInfosModel | undefined) => {
            setRoundInfos(roundInfos);
        })

        return () => {
            roundInfos_subscribe.unsubscribe();
        }
    }, []);

    async function handleActionButtonClick(
        player: PlayerInfosModel,
        action: GameActionEnum
    ): Promise<void> {
        try {
            if (!roundInfos) {
                console.error("Erreur : round informations is undefined");
                throw alert("round informations is undefined");
            }
            let playerAction: PlayerActionModel = {
                actionType: action,
                amount: 0,
                seatIndex: player.seatIndex,
                roundStep: roundInfos.roundStep
            }
            switch (action) {
                case GameActionEnum.CHECK:
                    playerAction = isCheckOrCall(player, roundInfos);
                    break;
                case GameActionEnum.BET: {
                    const betAmount = prompt("Entrez le montant du pari :", "10");
                    if (betAmount !== null) {
                        playerAction.amount = parseInt(betAmount);
                    } else {
                        return;
                    }
                    break;
                }
                case GameActionEnum.ALL_IN:
                    playerAction.actionType = GameActionEnum.BET;
                    playerAction.amount = player.balance;
                    break;
            }
            croupierLoadingService.setPlayerAction(
                playerAction,
                roundInfos.roundId
            ).then((roundInfos: RoundInfosModel) => {
                if (roundInfos.roundStep === RoundStepEnum.FINISHED) {
                    croupierLoadingService.startNewRound().then((newRoundInfos: RoundInfosModel) => updateInformations(newRoundInfos));
                } else {
                    updateInformations(roundInfos);
                }
            });
        } catch (error) {
            console.error(
                "Une erreur est survenue lors de l'envoi de l'action : ",
                error
            )
        }
    }

    function updateInformations(roundInfos: RoundInfosModel): void {
        playersService.setCurrentPlayerInfos(roundInfos.currentPlayingUser);
        playersService.setPlayersHandInfos(roundInfos.playersLastActions);
        roundService.setRoundPlayersActionsHistory(roundInfos.roundPlayersActionsHistory);
        roundService.setRoundInfos(roundInfos);
    }

    function isCheckOrCall(player: PlayerInfosModel, roundInfos: RoundInfosModel): PlayerActionModel {
        const amountToCall: number = calculateHighestBet(roundInfos);
        const highestBetForPlayer: number = calculateHighestBetForPlayer(roundInfos, player.seatIndex);

        if (amountToCall > 0 && highestBetForPlayer < amountToCall) {
            return createCallAction(player, amountToCall, roundInfos.roundStep);
        } else {
            return createCheckAction(player, roundInfos.roundStep);
        }
    }

    function calculateHighestBet(roundInfos: RoundInfosModel): number {
        const actions: PlayerActionModel[] = roundInfos.roundPlayersActionsHistory[roundInfos.roundStep.toLowerCase() as keyof RoundPlayersActionsHistoryModel];
        return actions.reduce((max, action) => Math.max(max, action.amount), 0);
    }

    function calculateHighestBetForPlayer(roundInfos: RoundInfosModel, seatIndex: number): number {
        const actions: PlayerActionModel[] = roundInfos.roundPlayersActionsHistory[roundInfos.roundStep.toLowerCase() as keyof RoundPlayersActionsHistoryModel];
        return actions
            .filter(action => action.seatIndex === seatIndex)
            .reduce((max, action) => Math.max(max, action.amount), 0);
    }

    function createCallAction(player: PlayerInfosModel, amountToCall: number, roundStep: RoundStepEnum): PlayerActionModel {
        return {
            actionType: GameActionEnum.CALL,
            amount: Math.min(amountToCall, player.balance),
            seatIndex: player.seatIndex,
            roundStep: roundStep
        };
    }

    function createCheckAction(player: PlayerInfosModel, roundStep: RoundStepEnum): PlayerActionModel {
        return {
            actionType: GameActionEnum.CHECK,
            amount: 0,
            seatIndex: player.seatIndex,
            roundStep: roundStep
        };
    }

    function buttonIsDisabled(player: PlayerInfosModel, button: GameActionEnum): boolean {
        if (roundInfos) {
            switch (button) {
                case GameActionEnum.CHECK:
                case GameActionEnum.BET: {
                    const highestBet: number = calculateHighestBet(roundInfos);
                    return player.balance <= highestBet;
                }
                case GameActionEnum.FOLD: {
                    const highestBet: number = calculateHighestBet(roundInfos);
                    const highestBetForPlayer: number = calculateHighestBetForPlayer(roundInfos, player.seatIndex);
                    return highestBet === 0 || highestBetForPlayer === highestBet;
                }
            }
        }
        return false;
    }

    return {
        handleActionButtonClick,
        buttonIsDisabled,
    }
}
