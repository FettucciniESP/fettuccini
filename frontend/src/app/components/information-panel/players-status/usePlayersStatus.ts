import { GameActionEnum } from '@/app/enums/GameAction.enum';
import {PlayerHandInfosModel} from "@/app/models/PlayerHandInfos.model";
import { useEffect } from 'react';
import { playersService } from '@/app/services/Players.service';

export default function usePlayersStatus(playersHandInfos: PlayerHandInfosModel[]) {
    useEffect(() => {
        const playersListSubscription = playersService.playersList$.subscribe(playersList => {

        });
        const playersListInHandSubscription = playersService.playersListInHand$.subscribe(playersListInHand => {

        });

        return () => {
            playersListSubscription.unsubscribe();
            playersListInHandSubscription.unsubscribe();
        }
    }, []);

  return {
    getActionIcon: (action) => {
      switch (action) {
        case GameActionEnum.BET:
          return require('../../../assets/images/jeton_poker_v3_Blanc.png')
        case GameActionEnum.CHECK:
          return require('../../../assets/images/check.png')
        case GameActionEnum.FOLD:
          return require('../../../assets/images/fold.png')
        default:
          return ' '
      }
    },
  }
}
