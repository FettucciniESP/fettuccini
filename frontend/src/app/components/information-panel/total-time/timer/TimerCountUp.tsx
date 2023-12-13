import React, { useEffect, useState } from 'react';
import styles from '../TotalTime.module.scss';
import { zeroPad } from 'react-countdown';
import { gameService } from '@/app/services/game.service';
import { Subscription } from "rxjs";

export const TimerCountUp = () => {
    const [startTime, setStartTime] = useState<Date>();
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    useEffect(() => {
        let interval;

        if (startTime) {
            interval = setInterval(() => {
                const now = new Date().getTime();
                const startTimeMillis = new Date(startTime).getTime();
                const timeElapsed = now - startTimeMillis;

                setElapsedTime(timeElapsed);
            }, 1000);
        }

        const startGameTime_subscribe: Subscription = gameService.startTime$.subscribe((startTime: Date) => {
            setStartTime(startTime);
        });

        return () => {
            clearInterval(interval);
            startGameTime_subscribe.unsubscribe();
        }
    }, [startTime]);

    const hours = zeroPad(Math.floor((elapsedTime / (1000 * 60 * 60)) % 24));
    const minutes = zeroPad(Math.floor((elapsedTime / (1000 * 60)) % 60));
    const seconds = zeroPad(Math.floor((elapsedTime / 1000) % 60));

    return (
        <div>
            <span className={styles.timer}>
                {hours}:{minutes}:{seconds}
            </span>
        </div>
    );
};
