import {Box} from '@chakra-ui/react'
import styles from './InformationPanel.module.scss'
import NextLevelInfos from './next-level-infos/NextLevelInfos'
import PlayersStatus from './players-status/PlayersStatus'
import {LevelInfosModel} from '@/app/models/LevelInfos.model'
import {PlayerHandInfosModel} from '@/app/models/PlayerHandInfos.model'
import HandHistory from '@/app/components/information-panel/hand-history/HandHistory'
import {RoundPlayersActionsHistoryModel} from '@/app/models/RoundPlayersActionsHistoryModel'
import {GameActionEnum} from '@/app/enums/GameAction.enum'
import LevelIndex from './level-index/LevelIndex'
import TimeRemaining from './time-remaining/TimeRemaining'
import {RoundInfosModel} from '@/app/models/RoundInfos.model'
import {RoundStepEnum} from "@/app/enums/RoundStep.enum";
import {levelsService} from "@/app/services/levels.service";
import {playersService} from "@/app/services/players.service";
import {roundService} from "@/app/services/roundService";
import {useEffect, useState} from "react";

export default function InformationPanel() {
    let currentLevelInfos!: LevelInfosModel;
    let [nextLevelInfos, setNextLevelInfos] = useState<LevelInfosModel>({
        smallBlindValue: 0,
        bingBlindValue: 0,
        anteValue: 0,
        duration: 0,
        index: 0
    });
    let [handPlayersActionsHistory, setHandPlayersActionsHistory] = useState<RoundPlayersActionsHistoryModel>();
    let [playersHandInfos, setPlayersHandInfos] = useState<PlayerHandInfosModel[]>([]);
    let [roundInfos, setRoundInfos] = useState<RoundInfosModel>();

    useEffect(() => {
        const currentLevel_subscribe = levelsService.currentLevel$.subscribe((currentLevel: LevelInfosModel) => {
            currentLevelInfos = currentLevel;
            console.log(currentLevel)
        });
        const nextLevel_subscribe = levelsService.nextLevel$.subscribe((nextLevelInfos: LevelInfosModel) => {
            setNextLevelInfos(nextLevelInfos);
        });
        const handPlayersActionsHistory_subscribe = roundService.roundPlayersActionsHistory$.subscribe((handPlayersActionsHistory:RoundPlayersActionsHistoryModel) => {
            setHandPlayersActionsHistory(handPlayersActionsHistory);
        });
        const playersHandInfos_subscribe = playersService.playersHandInfos$.subscribe((playersHand: PlayerHandInfosModel[]) => {
            setPlayersHandInfos(playersHand);
        });
        const roundInfos_subscribe = roundService.roundInfos$.subscribe((roundInfos: RoundInfosModel) => {
            setRoundInfos(roundInfos);
        });

        return () => {
            currentLevel_subscribe.unsubscribe();
            nextLevel_subscribe.unsubscribe();
            handPlayersActionsHistory_subscribe.unsubscribe();
            playersHandInfos_subscribe.unsubscribe();
            roundInfos_subscribe.unsubscribe();
        }
    }, []);

    const mockHandHistory: RoundPlayersActionsHistoryModel = {
        preflop: [
            {
                seatIndex: 1,
                actionType: GameActionEnum.BET,
                amount: 100,
                roundStep: RoundStepEnum.PREFLOP,
            },
            {
                seatIndex: 2,
                actionType: GameActionEnum.CHECK,
                amount: 0,
                roundStep: RoundStepEnum.PREFLOP,
            },
            {
                seatIndex: 3,
                actionType: GameActionEnum.FOLD,
                amount: 0,
                roundStep: RoundStepEnum.PREFLOP,
            },
        ],
        flop: [
            {
                seatIndex: 1,
                actionType: GameActionEnum.BET,
                amount: 100,
                roundStep: RoundStepEnum.FLOP,
            },
            {
                seatIndex: 2,
                actionType: GameActionEnum.CALL,
                amount: 100,
                roundStep: RoundStepEnum.FLOP,
            },
        ],
        turn: [
            {
                seatIndex: 1,
                actionType: GameActionEnum.BET,
                amount: 100,
                roundStep: RoundStepEnum.TURN,
            },
            {
                seatIndex: 2,
                actionType: GameActionEnum.FOLD,
                amount: 0,
                roundStep: RoundStepEnum.TURN,
            }
        ],
        river: null,
    }

    const mockRoundLInfos: RoundInfosModel = {
        id: 1,
        gameId: 'string',
        roundIndex: 1,
        actions: [],
        board: [],
        buttonSeatIndex: 1,
        potAmount: 10000,
    }
    return (
        <Box className={styles.informationPanel}>
            <Box className={styles.leftInformationPanel}>
                {currentLevelInfos && <LevelIndex levelInfos={currentLevelInfos}/>}
                {mockHandHistory && <HandHistory handHistoryInfos={mockHandHistory}/>}
            </Box>
            <Box className={styles.middleInformationPanel}>
                {currentLevelInfos && mockRoundLInfos &&
                    <TimeRemaining
                    currentLevelInfos={currentLevelInfos}
                    roundInfos={mockRoundLInfos}
                />}
                {nextLevelInfos && <NextLevelInfos levelInfos={nextLevelInfos}/>}
            </Box>
            <Box className={styles.rightInformationPanel}>
                {playersHandInfos && <PlayersStatus playersHandInfos={playersHandInfos}/>}
            </Box>
        </Box>
    )
}
