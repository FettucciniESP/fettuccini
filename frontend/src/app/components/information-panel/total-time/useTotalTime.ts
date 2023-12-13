import {useState} from 'react';
import {LevelInfosModel} from "@/app/models/LevelInfos.model";

const useTotalTime = (currentLevel: LevelInfosModel) => {
    const [time, setTime] = useState<number>(currentLevel.duration * 60);

    const handleTimeUp = (): void => {
        setTime(currentLevel.duration * 60);
    };

    return {time, handleTimeUp};
};

export default useTotalTime;
