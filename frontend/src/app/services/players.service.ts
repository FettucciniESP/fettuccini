import { BehaviorSubject } from 'rxjs';
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";

class PlayersService {
    private playersHandInfos = new BehaviorSubject<Array<PlayerHandInfosModel>>([]);

    playersHandInfos$ = this.playersHandInfos.asObservable();

    setPlayersHandInfos(playersHandInfos: Array<PlayerHandInfosModel>) {
        this.playersHandInfos.next(playersHandInfos);
    }
}

export const playersService = new PlayersService();