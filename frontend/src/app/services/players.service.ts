import {BehaviorSubject} from 'rxjs';
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";
import {WinnerInfosModel} from "@/app/models/WinnerInfos.model";

class PlayersService {
    private currentPlayerInfos = new BehaviorSubject<PlayerInfosModel>({
        balance: 0,
        name: "Siège ",
        seatIndex: 0
    });
    private playersHandInfos = new BehaviorSubject<Array<PlayerHandInfosModel>>([]);
    private winnersInformations = new BehaviorSubject<Array<WinnerInfosModel>>([]);

    currentPlayerInfos$ = this.currentPlayerInfos.asObservable();
    playersHandInfos$ = this.playersHandInfos.asObservable();
    winnersInformations$ = this.winnersInformations.asObservable();

    setCurrentPlayerInfos(currentPlayerInfos: PlayerInfosModel): void {
        this.currentPlayerInfos.next(currentPlayerInfos);
    }

    setPlayersHandInfos(playersHandInfos: Array<PlayerHandInfosModel>): void {
        this.playersHandInfos.next(playersHandInfos);
    }

    setWinnersInformations(winnersInformations: Array<WinnerInfosModel>): void {
        this.winnersInformations.next(winnersInformations);
    }
}

export const playersService = new PlayersService();