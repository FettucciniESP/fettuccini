import {StartGameResponseModel} from "@/app/models/StartGameResponse.model";
import croupierLoadingService from "@/app/services/croupier-loading.service";
import {levelsService} from "@/app/services/levels.service";
import {playersService} from "@/app/services/players.service";
import {roundService} from "@/app/services/roundService";

class CroupierService {

    public getGameInformations(startGameResponse: StartGameResponseModel): void {
        croupierLoadingService.setSessionId(startGameResponse.playerActionResponse.sessionId);
        //gameService.setStartTime(startGameResponse.playerActionResponse.);
        levelsService.setCurrentLevel(startGameResponse.levelsStructure[0])
        levelsService.setNextLevel(startGameResponse.levelsStructure[1])
        levelsService.setLevelsStructure(startGameResponse.levelsStructure)
        playersService.setCurrentPlayerInfos(startGameResponse.playerActionResponse.currentPlayingUser)
        playersService.setPlayersHandInfos(startGameResponse.playerActionResponse.playersLastActions)
        roundService.setRoundPlayersActionsHistory(startGameResponse.playerActionResponse.roundPlayersActionsHistory)
        roundService.setRoundInfos(startGameResponse.playerActionResponse)
    }
}

export const croupierService = new CroupierService();