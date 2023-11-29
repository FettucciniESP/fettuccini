import React, { useEffect, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import styles from '../TimeRemaining.module.scss';
import { LevelInfosModel } from "@/app/models/LevelInfos.model";
import { levelsService } from "@/app/services/levels.service";
import { gameService } from "@/app/services/game.service";

export const Timer = () => {
  const [levelsStructure, setLevelsStructure] = useState<LevelInfosModel[]>();
  const [startTime, setStartTime] = useState<Date>();
  const [timeRemaining, setTimeRemaining] = useState<number>();

  function calculateTimeRemaining(): number {
    if (!startTime || !levelsStructure) {
      return 0;
    }

    const now = new Date().getTime();
    const startTimeMillis = new Date(startTime).getTime();
    let elapsedTime = (now - startTimeMillis) / 1000 / 60;

    let totalTime = 0;
    for (let level of levelsStructure) {
      totalTime += level.duration;
      if (elapsedTime < totalTime) {
        return (totalTime - elapsedTime) * 60 * 1000;
      }
    }
    return 0;
  }

  useEffect(() => {
    if (levelsStructure && startTime) {
      const interval = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [levelsStructure, startTime]);

  const renderer = ({ hours, minutes, seconds }) => {
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
