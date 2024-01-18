import React, {useEffect, useState} from 'react';
import Countdown, {zeroPad} from 'react-countdown';
import styles from '../TimeRemaining.module.scss';
import {LevelInfosModel} from "@/app/models/LevelInfos.model";
import {levelsService} from "@/app/services/levels.service";
import {gameService} from "@/app/services/game.service";
import {Subscription} from "rxjs";

export const TimerCountDown = () => {
    const [levelsStructure, setLevelsStructure] = useState<LevelInfosModel[]>();
    const [startTime, setStartTime] = useState<Date>();
    const [timeRemaining, setTimeRemaining] = useState<number>();

    function calculateTimeRemaining(): number {
        if (!startTime || !levelsStructure) {
            return 0;
        }

        const now: number = new Date().getTime();
        const startTimeMillis: number = new Date(startTime).getTime();
        let elapsedTime: number = (now - startTimeMillis) / 1000 / 60;

        let totalTime: number = 0;
        for (let level of levelsStructure) {
            totalTime += level.duration;
            if (elapsedTime < totalTime) {
                return (totalTime - elapsedTime) * 60 * 1000;
            }
        }
        return 0;
    }

    useEffect(() => {
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

        return () => {
            clearInterval(interval);
            startGameTime_subscribe.unsubscribe();
            levelsStructure_subscribe.unsubscribe();
        }
    }, [levelsStructure, startTime]);

    const renderer = ({hours, minutes, seconds}) => {
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
