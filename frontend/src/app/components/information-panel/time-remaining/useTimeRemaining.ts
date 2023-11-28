import {useEffect, useState} from 'react';
import {LevelInfosModel} from "@/app/models/LevelInfos.model";

const useTimeRemaining = (currentLevel: LevelInfosModel) => {
  const [time, setTime] = useState<number>(currentLevel.duration*60);

  const handleTimeUp = (): void => {
    setTime(currentLevel.duration*60);
  };

  return { time, handleTimeUp };
};

export default useTimeRemaining;
