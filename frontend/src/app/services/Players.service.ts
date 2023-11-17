import { BehaviorSubject } from 'rxjs';
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";

class PlayersService {
    private playersList = new BehaviorSubject<Array<PlayerInfosModel>>([]);
    private playersListInHand = new BehaviorSubject<Array<PlayerInfosModel>>([]);

    playersList$ = this.playersList.asObservable();
    playersListInHand$ = this.playersListInHand.asObservable();

    setPlayersList(playersList: Array<PlayerInfosModel>) {
        this.playersList.next(playersList);
    }

    setPlayersListInHand(playersListInHand: Array<PlayerInfosModel>) {
        this.playersListInHand.next(playersListInHand);
    }
}

export const playersService = new PlayersService();