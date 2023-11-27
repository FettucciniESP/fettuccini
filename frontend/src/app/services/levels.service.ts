import {BehaviorSubject} from "rxjs";
import {LevelInfosModel} from "@/app/models/LevelInfos.model";

class LevelsService {
    private currentLevel = new BehaviorSubject<LevelInfosModel>({
        smallBlind: 0,
        bigBlind: 0,
        ante: 0,
        duration: 0,
        levelIndex: 0
    });
    private nextLevel = new BehaviorSubject<LevelInfosModel>({
        smallBlind: 0,
        bigBlind: 0,
        ante: 0,
        duration: 0,
        levelIndex: 0
    });

    currentLevel$ = this.currentLevel.asObservable();
    nextLevel$ = this.nextLevel.asObservable();

    setCurrentLevel(currentLevel: LevelInfosModel) {
        this.currentLevel.next(currentLevel);
    }

    setNextLevel(nextLevel: LevelInfosModel) {
        this.nextLevel.next(nextLevel);
    }

}

export const levelsService = new LevelsService();