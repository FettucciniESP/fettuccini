import {BehaviorSubject} from "rxjs";
import {LevelInfosModel} from "@/app/models/LevelInfos.model";

class LevelsService {
    private currentLevel = new BehaviorSubject<LevelInfosModel>({
        smallBlindValue: 0,
        bingBlindValue: 0,
        anteValue: 0,
        duration: 0,
        index: 0
    });
    private nextLevel = new BehaviorSubject<LevelInfosModel>({
        smallBlindValue: 0,
        bingBlindValue: 0,
        anteValue: 0,
        duration: 0,
        index: 0
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