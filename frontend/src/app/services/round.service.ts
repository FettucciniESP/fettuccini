import {BehaviorSubject} from 'rxjs';
import {RoundPlayersActionsHistoryModel} from "@/app/models/RoundPlayersActionsHistory.model";
import {RoundInfosModel} from "@/app/models/RoundInfos.model";

class RoundService {
    private roundPlayersActionsHistory = new BehaviorSubject<RoundPlayersActionsHistoryModel>({
        preflop: [],
        flop: [],
        turn: [],
        river: [],
    });
    private roundInfos = new BehaviorSubject<RoundInfosModel | undefined>(undefined);

    roundPlayersActionsHistory$ = this.roundPlayersActionsHistory.asObservable();
    roundInfos$ = this.roundInfos.asObservable();

    setRoundPlayersActionsHistory(roundPlayersActionsHistory: RoundPlayersActionsHistoryModel): void {
        this.roundPlayersActionsHistory.next(roundPlayersActionsHistory);
    }

    setRoundInfos(roundInfos: RoundInfosModel): void {
        this.roundInfos.next(roundInfos);
    }
}

export const roundService = new RoundService();