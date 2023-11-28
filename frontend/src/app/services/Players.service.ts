import { BehaviorSubject } from 'rxjs';
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";

class PlayersService {
    private playersList = new BehaviorSubject<Array<PlayerInfosModel>>([]);

    playersList$ = this.playersList.asObservable();

    setPlayersList(playersList: Array<PlayerInfosModel>) {
        this.playersList.next(playersList);
    }
}

export const playersService = new PlayersService();