import React from 'react'
import GameInformations from "@/app/components/information-panel/game-informations/GameInformations";
import { GameActionEnum } from '@/app/enums/GameAction.enum';
import { RoundStepEnum } from '@/app/enums/RoundStep.enum';
import { RoundInfosModel } from '@/app/models/RoundInfos.model';
import { LevelInfosModel } from '@/app/models/LevelInfos.model';
import { PlayerHandInfosModel } from "@/app/models/PlayerHandInfos.model";
import { RoundPlayersActionsHistoryModel } from '@/app/models/RoundPlayersActionsHistory.model';
import { PlayerActionModel } from '@/app/models/PlayerAction.model';
import { PlayerInfosModel } from '@/app/models/PlayerInfos.model';
import {ActionNeededInfosModel} from "@/app/models/ActionNeededInfos.model";

describe('Game Informations', () => {
    
    const playerInfos : PlayerInfosModel = {
        name: 'Bobby',
        seatIndex: 3,
        balance: 1000
    };

    const gameAction = GameActionEnum.BET
    const roundStep = RoundStepEnum.FLOP

    const playerAction : PlayerActionModel = {
        actionType: gameAction,
        amount: 30,
        seatIndex: 2,
        roundStep: roundStep
    };

    const roundPlayersActionsHistory : RoundPlayersActionsHistoryModel = {
        preflop: [playerAction],
        flop:  [playerAction],
        turn:  [playerAction],
        river:  [playerAction]
    };

    const playerHandInfos : PlayerHandInfosModel = {
        lastAction: playerAction,
        player: playerInfos
    };

    const actionsNeeded : ActionNeededInfosModel = {
        cardMisreads: [],
        impossibleCards: [],
    }

    const roundInfos: RoundInfosModel = {
        currentPlayingUser: playerInfos,
        currentPotAmount: 30,
        roundId: '3',
        roundPlayersActionsHistory: roundPlayersActionsHistory,
        roundStep: roundStep,
        sessionId: '5',
        currentButtonUser: playerInfos,
        playersLastActions: [playerHandInfos], // []
        gameStartedDatetime: new Date(),
        breakTime: false,
        actionNeededInfos: actionsNeeded,
        winners: []
    };

    const currentLevelInfo : LevelInfosModel = {
        smallBlind: 10,
        bigBlind: 20,
        ante: 3,
        duration: 10,
        levelIndex: 1,
        label: ""
    };

    const nextLevelInfos : LevelInfosModel = {
        smallBlind: 15,
        bigBlind: 30,
        ante: 4,
        duration: 10,
        levelIndex: 2,
        label: ""
    };

    beforeEach(() =>{
        cy.mount(<GameInformations roundInfos={roundInfos} currentLevelInfos={currentLevelInfo} nextLevelInfos={nextLevelInfos}/>)
    });

    it('renders correctly', () => {
        cy.get('[id="timer"]').should('be.visible');
        cy.get('[id="totalTime"]').should('be.visible');
        cy.get('[id="pot"]').should('be.visible');
        cy.get('[id="currentLevel"]').should('be.visible');
        cy.get('[id="nextLevel"]').should('be.visible');
        cy.get('[id="levelTime"]').should('be.visible');
        cy.get('[id="actionButtons"]').should('be.visible');
      })

      it('Pot, good value', () => {
        cy.get('[id="pot2"]').should('have.text', 'Pot :')
        cy.get('[id="pot_value"]').should('have.text', '30')
      })

      it('Current Level, good value', () => {
        cy.get('[id="currentLevel2"]').should('have.text', 'Niveau en cours :')
        cy.get('[id="currentLevel_value"]').should('have.text', '1')
      })

      it('Next Level, good value', () => {
        cy.get('[id="nextLevel2"]').should('have.text', 'Niveau suivant :')
        cy.get('[id="nextLevel_value"]').should('have.text', '2')
      })

      it('Level Time, good value', () => {
        cy.get('[id="levelTime2"]').should('have.text', 'Temps du niveau :')
        cy.get('[id="levelTime_value"]').should('have.text', '10 minutes')
      })
})