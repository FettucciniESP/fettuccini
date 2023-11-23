import { Box, Text } from '@chakra-ui/react'
import styles from './InformationPanel.module.scss'
import NextLevelInfos from '../next-level-infos/NextLevelInfos'
import PlayersStatus from '../players-status/PlayersStatus'
import { LevelInfosModel } from '@/app/models/LevelInfos.model'
import { PlayerHandInfosModel } from '@/app/models/PlayerHandInfos.model'
import { GameActionEnum } from '@/app/enums/GameAction.enum'
import LevelIndex from '../level-index/LevelIndex'
import TimeRemaining from '../time-remaining/TimeRemaining'
import {RoundInfosModel} from "@/app/models/RoundInfos.model";
import {BoardInfosModel} from "@/app/models/BoardInfos.model";

export default function InformationPanel() {
  const mockCurrentLevelInfos: LevelInfosModel = {
    index: 1,
    smallBlindValue: 5,
    bingBlindValue: 10,
    anteValue: 0,
    time: 10,
  }
  const mockNextLevelInfos: LevelInfosModel = {
    index: 2,
    smallBlindValue: 10,
    bingBlindValue: 20,
    anteValue: 0,
    time: 10,
  }
  const mockPlayersHandInfos: PlayerHandInfosModel[] = [
    {
      seat: 1,
      lastAction: GameActionEnum.BET,
      betValue: 100,
      betIsValid: true,
    },
    {
      seat: 2,
      lastAction: GameActionEnum.CHECK,
      betValue: 0,
      betIsValid: true,
    },
    {
      seat: 3,
      lastAction: GameActionEnum.FOLD,
      betValue: 0,
      betIsValid: true,
    },
  ]
  const mockRoundLInfos: RoundInfosModel = {
    id: 1,
    gameId: "string",
    roundIndex: 1,
    actions: [],
    board: [],
    buttonSeatIndex: 1,
    potAmount: 10000,
  }
  return (
    <Box className={styles.informationPanel}>
      <Box className={styles.leftInformationPanel}>
        <LevelIndex levelInfos={mockCurrentLevelInfos} />
      </Box>
      <Box className={styles.middleInformationPanel}>
        <TimeRemaining
          currentLevelInfos={mockCurrentLevelInfos}
          roundInfos={mockRoundLInfos}
        />
        <NextLevelInfos levelInfos={mockNextLevelInfos} />
      </Box>
      <Box className={styles.rightInformationPanel}>
        <PlayersStatus playersHandInfos={mockPlayersHandInfos} />
      </Box>
    </Box>
  )
}
