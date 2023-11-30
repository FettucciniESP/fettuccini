import {BehaviorSubject} from "rxjs";

class GameService {
    private startTime = new BehaviorSubject<Date>(new Date());

    startTime$ = this.startTime.asObservable();

    setStartTime(startTime: Date): void {
        this.startTime.next(startTime);
    }

}

export const gameService = new GameService();