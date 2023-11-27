import { BehaviorSubject } from 'rxjs';
import {PlayerInfosModel} from "@/app/models/PlayerInfos.model";
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";
import {StartGameResponseModel} from "@/app/models/StartGameResponse.model";
import croupierLoadingService from "@/app/services/croupier-loading.service";
import {levelsService} from "@/app/services/levels.service";
import {playersService} from "@/app/services/players.service";
import {roundService} from "@/app/services/roundService";

class CroupierService {

    public getGameInformations(startGameResponse: StartGameResponseModel): void {
        croupierLoadingService.setSessionId(startGameResponse.playerActionResponse.sessionId);
        levelsService.setCurrentLevel(startGameResponse.levelsStructure[0])
        levelsService.setNextLevel(startGameResponse.levelsStructure[1])
        playersService.setCurrentPlayerInfos(startGameResponse.playerActionResponse.currentPlayingUser)
        playersService.setPlayersHandInfos(startGameResponse.players)
        roundService.setRoundPlayersActionsHistory(startGameResponse.playerActionResponse.roundPlayersActionsHistory)
        roundService.setRoundInfos(startGameResponse.playerActionResponse)
        console.log(startGameResponse.playerActionResponse)
    }
}

export const croupierService = new CroupierService();