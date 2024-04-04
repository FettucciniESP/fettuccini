import React, { useEffect, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import styles from '../TimeRemaining.module.scss';
import { LevelInfosModel } from "@/app/models/LevelInfos.model";
import { levelsService } from "@/app/services/levels.service";
import { gameService } from "@/app/services/game.service";
import { Subscription } from "rxjs";
import { roundService } from '@/app/services/round.service';
import { RoundInfosModel } from '@/app/models/RoundInfos.model';
import { croupierLoadingService } from '@/app/services/croupier-loading.service';
import { playersService } from '@/app/services/players.service';

export const TimerCountDown = () => {
    const [levelsStructure, setLevelsStructure] = useState<LevelInfosModel[]>();
    const [startTime, setStartTime] = useState<Date>();
    const [timeRemaining, setTimeRemaining] = useState<number>();
    const [roundInfo, setRoundInfo] = useState<RoundInfosModel>();

    useEffect(() => {
        function calculateTimeRemaining(): number {
            if (!startTime || !levelsStructure) {
                return 0;
            }

            const now: number = new Date().getTime();
            const startTimeMillis: number = new Date(startTime).getTime();
            let elapsedTime: number = (now - startTimeMillis) / 1000 / 60;
            let totalTime: number = 0;
            let lastLevelIndex: number = -1;

            for (let level of levelsStructure) {
                totalTime += level.duration;
                if (elapsedTime < totalTime) {
                    if (lastLevelIndex !== level.levelIndex) {
                        if (lastLevelIndex === 0 && !roundInfo?.roundId) {
                            croupierLoadingService.startNewRound().then((newRoundInfo) => {
                                roundService.setRoundInfos(newRoundInfo);
                                playersService.setPlayersHandInfos(newRoundInfo.playersLastActions);
                            });
                        }
                        lastLevelIndex = level.levelIndex;
                        levelsService.setCurrentLevel(level);
                    }
                    return (totalTime - elapsedTime) * 60 * 1000;
                }
                lastLevelIndex = level.levelIndex;
            }
            return 0;
        }

        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        const startGameTime_subscribe: Subscription = gameService.startTime$.subscribe((startTime: Date) => {
            setStartTime(startTime);
            setTimeRemaining(calculateTimeRemaining());
        });

        const levelsStructure_subscribe: Subscription = levelsService.levelsStructure$.subscribe((levelsStructure: LevelInfosModel[]) => {
            setLevelsStructure(levelsStructure);
            setTimeRemaining(calculateTimeRemaining());
        });

        const roundInfo_subscribe: Subscription = roundService.roundInfos$.subscribe((roundInfo: RoundInfosModel | undefined ) => {
            setRoundInfo(roundInfo);
        });

        return () => {
            clearInterval(interval);
            startGameTime_subscribe.unsubscribe();
            levelsStructure_subscribe.unsubscribe();
        }
    }, [levelsStructure, startTime]);

    const renderer = ({ hours, minutes, seconds }: { hours: number, minutes: number, seconds: number }) => {
        return (
            <span className={styles.timer}>
                {hours === 0 ? null : zeroPad(hours) + ':'}
                {zeroPad(minutes)}:{zeroPad(seconds)}
            </span>
        );
    };

    return (
        <div>
            {timeRemaining !== undefined &&
                <Countdown
                    key={timeRemaining}
                    date={Date.now() + timeRemaining}
                    renderer={renderer}
                />
            }
        </div>
    );
};
