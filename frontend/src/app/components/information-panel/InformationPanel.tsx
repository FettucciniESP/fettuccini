import {Box} from '@chakra-ui/react'
import styles from './InformationPanel.module.scss'
import NextLevelInfos from './next-level-infos/NextLevelInfos'
import PlayersStatus from './players-status/PlayersStatus'
import {LevelInfosModel} from '@/app/models/LevelInfos.model'
import {PlayerHandInfosModel} from '@/app/models/PlayerHandInfos.model'
import HandHistory from '@/app/components/information-panel/hand-history/HandHistory'
import {RoundPlayersActionsHistoryModel} from '@/app/models/RoundPlayersActionsHistoryModel'
import LevelIndex from './level-index/LevelIndex'
import TimeRemaining from './time-remaining/TimeRemaining'
import {RoundInfosModel} from '@/app/models/RoundInfos.model'
import {levelsService} from "@/app/services/levels.service";
import {playersService} from "@/app/services/players.service";
import {roundService} from "@/app/services/roundService";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";

export default function InformationPanel() {
    let [currentLevelInfos, setCurrentLevelInfos] = useState<LevelInfosModel | undefined>(undefined);
    let [nextLevelInfos, setNextLevelInfos] = useState<LevelInfosModel | undefined>(undefined);
    let [handPlayersActionsHistory, setHandPlayersActionsHistory] = useState<RoundPlayersActionsHistoryModel>();
    let [playersHandInfos, setPlayersHandInfos] = useState<PlayerHandInfosModel[]>([]);
    let [roundInfos, setRoundInfos] = useState<RoundInfosModel>();

    useEffect(() => {
        const currentLevel_subscribe: Subscription = levelsService.currentLevel$.subscribe((currentLevel: LevelInfosModel) => {
            setCurrentLevelInfos(currentLevel);
        });
        const nextLevel_subscribe: Subscription = levelsService.nextLevel$.subscribe((nextLevelInfos: LevelInfosModel) => {
            setNextLevelInfos(nextLevelInfos);
        });
        const handPlayersActionsHistory_subscribe: Subscription = roundService.roundPlayersActionsHistory$.subscribe((handPlayersActionsHistory: RoundPlayersActionsHistoryModel) => {
            setHandPlayersActionsHistory(handPlayersActionsHistory);
        });
        const playersHandInfos_subscribe: Subscription = playersService.playersHandInfos$.subscribe((playersHand: PlayerHandInfosModel[]) => {
            setPlayersHandInfos(playersHand);
        });
        const roundInfos_subscribe: Subscription = roundService.roundInfos$.subscribe((roundInfos: RoundInfosModel | undefined) => {
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

    return (
        <Box className={styles.informationPanel}>
            <Box className={styles.leftInformationPanel}>
                {currentLevelInfos && <LevelIndex levelInfos={currentLevelInfos}/>}
                {handPlayersActionsHistory && <HandHistory handHistoryInfos={handPlayersActionsHistory}/>}
            </Box>
            <Box className={styles.middleInformationPanel}>
                {currentLevelInfos && roundInfos &&
                    <TimeRemaining
                        currentLevelInfos={currentLevelInfos}
                        roundInfos={roundInfos}
                    />}
                {nextLevelInfos && <NextLevelInfos levelInfos={nextLevelInfos}/>}
            </Box>
            <Box className={styles.rightInformationPanel}>
                {playersHandInfos && <PlayersStatus playersHandInfos={playersHandInfos}/>}
            </Box>
        </Box>
    )
}
