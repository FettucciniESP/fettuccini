import {BehaviorSubject} from "rxjs";
import {LevelInfosModel} from "@/app/models/LevelInfos.model";

class LevelsService {
    private currentLevel = new BehaviorSubject<LevelInfosModel>({
        smallBlind: 0,
        bigBlind: 0,
        ante: 0,
        duration: 0,
        levelIndex: 0,
        label: ''
    });
    private nextLevel = new BehaviorSubject<LevelInfosModel>({
        smallBlind: 0,
        bigBlind: 0,
        ante: 0,
        duration: 0,
        levelIndex: 0,
        label: ''
    });
    private levelsStructure = new BehaviorSubject<LevelInfosModel[]>([]);

    currentLevel$ = this.currentLevel.asObservable();
    nextLevel$ = this.nextLevel.asObservable();
    levelsStructure$ = this.levelsStructure.asObservable();

    setCurrentLevel(currentLevel: LevelInfosModel): void {
        this.currentLevel.next(currentLevel);
    }

    setNextLevel(nextLevel: LevelInfosModel): void {
        this.nextLevel.next(nextLevel);
    }

    setLevelsStructure(levelsStructure: LevelInfosModel[]): void {
        this.levelsStructure.next(levelsStructure);
    }

}

export const levelsService = new LevelsService();