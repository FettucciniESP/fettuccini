import {BehaviorSubject} from "rxjs";
import {LevelInfosModel} from "@/app/models/LevelInfos.model";

class LevelsService {
    private currentLevel = new BehaviorSubject<LevelInfosModel|undefined>(undefined);
    private nextLevel = new BehaviorSubject<LevelInfosModel|undefined>(undefined);

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