import { BehaviorSubject } from 'rxjs';
import {RoundPlayersActionsHistoryModel} from "@/app/models/RoundPlayersActionsHistoryModel";
import {RoundInfosModel} from "@/app/models/RoundInfos.model";
import {GameActionEnum} from "@/app/enums/GameAction.enum";
import {BoardInfosModel} from "@/app/models/BoardInfos.model";

class RoundService {
    private roundPlayersActionsHistory = new BehaviorSubject<RoundPlayersActionsHistoryModel>({
        preflop: null,
        flop: null,
        turn: null,
        river: null,
    });
    private roundInfos = new BehaviorSubject<RoundInfosModel>({
        id: 0,
        gameId: "",
        roundIndex: 0,
        actions: [],
        board: [],
        buttonSeatIndex: 0,
        potAmount: 0
    });

    roundPlayersActionsHistory$ = this.roundPlayersActionsHistory.asObservable();
    roundInfos$ = this.roundInfos.asObservable();

    setRoundPlayersActionsHistory(roundPlayersActionsHistory: RoundPlayersActionsHistoryModel) {
        this.roundPlayersActionsHistory.next(roundPlayersActionsHistory);
    }

    setRoundInfos(roundInfos: RoundInfosModel) {
        this.roundInfos.next(roundInfos);
    }
}

export const roundService = new RoundService();