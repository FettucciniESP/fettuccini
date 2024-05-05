import {GameActionEnum} from "@/app/enums/GameAction.enum";
import {RoundStepEnum} from "@/app/enums/RoundStep.enum";
import {PlayerActionModel} from "@/app/models/PlayerAction.model";
import {croupierLoadingService} from "@/app/services/croupier-loading.service";
import {roundService} from "@/app/services/round.service";
import {RoundInfosModel} from "@/app/models/RoundInfos.model";
import {playersService} from "@/app/services/players.service";
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {RoundPlayersActionsHistoryModel} from "@/app/models/RoundPlayersActionsHistory.model";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {toastService} from "@/app/services/toast.service";
import {CardMisreadModel} from "@/app/models/CardMisread.model";
import {ActionNeededInfosModel} from "@/app/models/ActionNeededInfos.model";
import {Simulate} from "react-dom/test-utils";
import waiting = Simulate.waiting;
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";

export default function useActionButtons() {
    let [roundInfos, setRoundInfos] = useState<RoundInfosModel>();
    const [cardsMisreadModal, setCardsMisreadModal] = useState(false);
    const [actionNeededInfos, setActionNeededInfos] = useState<ActionNeededInfosModel|null>();
    const [endGameModal, setEndGameModal] = useState(false);
    const [winner, setWinner] = useState<PlayerInfosModel | null>(null);

    const closeCardsMisreadModal = () => {
        setCardsMisreadModal(false);
    }

    useEffect(() => {
        const roundInfos_subscribe: Subscription =
            roundService.roundInfos$.subscribe(
                (roundInfos: RoundInfosModel | undefined) => {
                    setRoundInfos(roundInfos);
                }
            );

        return () => {
            roundInfos_subscribe.unsubscribe();
        };
    }, []);

    async function handleActionButtonClick(
        player: PlayerInfosModel,
        action: GameActionEnum,
        amount?: number,
    ): Promise<void> {
        try {
            if (!roundInfos) {
                throw toastService.pushError("Round informations is undefined");
            }
            let playerAction: PlayerActionModel = {
                actionType: action,
                amount: 0,
                seatIndex: player.seatIndex,
                roundStep: roundInfos.roundStep,
            };
            switch (action) {
                case GameActionEnum.CHECK:
                    playerAction = isCheckOrCall(player, roundInfos);
                    break;
                case GameActionEnum.BET: {
                    if (amount !== undefined && amount !== null && !Number.isNaN(amount)) {
                        playerAction.amount = amount;
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
            croupierLoadingService
                .setPlayerAction(playerAction, roundInfos.roundId)
                .then((roundInfos: RoundInfosModel) => {
                    switch (roundInfos.roundStep) {
                        case RoundStepEnum.FINISHED:
                            finishRound(roundInfos);
                            break;
                        case RoundStepEnum.ACTION_NEEDED:
                            setActionNeededInfos(roundInfos.actionNeededInfos);
                            setCardsMisreadModal(true);
                        default:
                            updateInformations(roundInfos);
                    }
                })
                .catch((error) => {
                    toastService.pushError(error?.response?.data);
                });
        } catch (error: any) {
            toastService.pushError(error?.response?.data);
        }
    }

    function updateInformations(roundInfos: RoundInfosModel): void {
        playersService.setCurrentPlayerInfos(roundInfos.currentPlayingUser);
        playersService.setPlayersHandInfos(roundInfos.playersLastActions);
        playersService.setWinnersInformations([]);
        roundService.setRoundPlayersActionsHistory(
            roundInfos.roundPlayersActionsHistory
        );
        roundService.setRoundInfos(roundInfos);
    }

    function finishRound(roundInfos: RoundInfosModel): void {
        if (roundInfos.winners) {
            playersService.setWinnersInformations(roundInfos.winners);
            setTimeout(() => {
                startNewRound();
            }, 10000);

        } else {
            startNewRound();
        }
    }

    function startNewRound(): void {
        const playersWithChips: PlayerHandInfosModel[] = getPlayersWithChips();
        if (playersWithChips.length === 1) {
            setWinner(playersWithChips[0].player)
            setEndGameModal(true);
            return;
        }
        croupierLoadingService
            .startNewRound()
            .then((newRoundInfos: RoundInfosModel) => updateInformations(newRoundInfos));
    }

    function getPlayersWithChips(): PlayerHandInfosModel[] {
        if (!roundInfos || !roundInfos.playersLastActions) {
            return [];
        }

        return roundInfos.playersLastActions.filter((playerHandInfo: PlayerHandInfosModel) => {
            return playerHandInfo.player && playerHandInfo.player.balance > 0;
        });
    }

    function closeEndGameModal() {
        setEndGameModal(false);
    }

    function isCheckOrCall(
        player: PlayerInfosModel,
        roundInfos: RoundInfosModel
    ): PlayerActionModel {
        const amountToCall: number = calculateHighestBet(roundInfos);
        const highestBetForPlayer: number = calculateHighestBetForPlayer(
            roundInfos,
            player.seatIndex
        );

        if (amountToCall > 0 && highestBetForPlayer < amountToCall) {
            return createCallAction(player, amountToCall, roundInfos.roundStep);
        } else {
            return createCheckAction(player, roundInfos.roundStep);
        }
    }

    function calculateHighestBet(roundInfos: RoundInfosModel): number {
        const actions: PlayerActionModel[] =
            roundInfos.roundPlayersActionsHistory[
                roundInfos.roundStep.toLowerCase() as keyof RoundPlayersActionsHistoryModel
                ];
        return actions ? actions.reduce((max, action) => Math.max(max, action.amount), 0) : 0;
    }

    function calculateHighestBetForPlayer(
        roundInfos: RoundInfosModel,
        seatIndex: number
    ): number {
        const actions: PlayerActionModel[] =
            roundInfos.roundPlayersActionsHistory[
                roundInfos.roundStep.toLowerCase() as keyof RoundPlayersActionsHistoryModel
                ];
        return actions ? actions
            .filter((action) => action.seatIndex === seatIndex)
            .reduce((max, action) => Math.max(max, action.amount), 0) : 0;
    }

    function createCallAction(
        player: PlayerInfosModel,
        amountToCall: number,
        roundStep: RoundStepEnum
    ): PlayerActionModel {
        return {
            actionType: GameActionEnum.CALL,
            amount: Math.min(amountToCall, player.balance),
            seatIndex: player.seatIndex,
            roundStep: roundStep,
        };
    }

    function createCheckAction(
        player: PlayerInfosModel,
        roundStep: RoundStepEnum
    ): PlayerActionModel {
        return {
            actionType: GameActionEnum.CHECK,
            amount: 0,
            seatIndex: player.seatIndex,
            roundStep: roundStep,
        };
    }

    function buttonIsDisabled(
        player: PlayerInfosModel,
        button: GameActionEnum
    ): boolean {
        if (roundInfos) {
            switch (button) {
                case GameActionEnum.CHECK:
                case GameActionEnum.BET: {
                    const highestBet: number = calculateHighestBet(roundInfos);
                    return player.balance <= highestBet;
                }
                case GameActionEnum.FOLD: {
                    const highestBet: number = calculateHighestBet(roundInfos);
                    const highestBetForPlayer: number = calculateHighestBetForPlayer(
                        roundInfos,
                        player.seatIndex
                    );
                    return highestBet === 0 || highestBetForPlayer === highestBet;
                }
            }
        }
        return false;
    }

    return {
        handleActionButtonClick,
        buttonIsDisabled,
        cardsMisreadModal,
        closeCardsMisreadModal,
        actionNeededInfos,
        roundInfos,
        finishRound,
        endGameModal,
        closeEndGameModal,
        winner,
    };
}
