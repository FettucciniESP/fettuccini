import {BehaviorSubject} from 'rxjs';
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";

class PlayersService {
    private currentPlayerInfos = new BehaviorSubject<PlayerInfosModel>({
        balance: 0,
        name: "Siège ",
        seatIndex: 0
    });
    private playersHandInfos = new BehaviorSubject<Array<PlayerHandInfosModel>>([]);

    currentPlayerInfos$ = this.currentPlayerInfos.asObservable();
    playersHandInfos$ = this.playersHandInfos.asObservable();

    setCurrentPlayerInfos(currentPlayerInfos: PlayerInfosModel): void {
        this.currentPlayerInfos.next(currentPlayerInfos);
    }

    setPlayersHandInfos(playersHandInfos: Array<PlayerHandInfosModel>): void {
        this.playersHandInfos.next(playersHandInfos);
    }
}

export const playersService = new PlayersService();