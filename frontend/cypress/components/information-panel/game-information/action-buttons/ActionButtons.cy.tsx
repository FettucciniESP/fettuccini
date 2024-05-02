import React from 'react'
import ActionButtons from "@/app/components/information-panel/game-informations/action-buttons/ActionButtons";
import useActionButtons from '@/app/components/information-panel/game-informations/action-buttons/useActionButtons';
import { PlayerHandInfosModel } from "@/app/models/PlayerHandInfos.model";
import { GameActionEnum } from '@/app/enums/GameAction.enum';
import { RoundStepEnum } from '@/app/enums/RoundStep.enum';
import { RoundInfosModel } from '@/app/models/RoundInfos.model';
import { LevelInfosModel } from '@/app/models/LevelInfos.model';
import { RoundPlayersActionsHistoryModel } from '@/app/models/RoundPlayersActionsHistory.model';
import { PlayerActionModel } from '@/app/models/PlayerAction.model';
import { PlayerInfosModel } from '@/app/models/PlayerInfos.model';

describe('Action Buttons', () => {
    
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
        breakTime: false
    };

    beforeEach(() =>{
        cy.mount(<ActionButtons playerInfos={roundInfos.currentPlayingUser}/>)
    });

    it('renders correctly', () => {
        cy.get('[id="box"]').should('be.visible');
        cy.get('[id="line1"]').should('be.visible');
        cy.get('[id="line2"]').should('be.visible');
        cy.get('[id="CHECK"]').should('be.visible');
        cy.get('[id="CHECK"]').should('have.text', 'CHECK / CALL');
        cy.get('[id="FOLD"]').should('be.visible');
        cy.get('[id="FOLD"]').should('have.text', 'FOLD');
        cy.get('[id="BET"]').should('be.visible');
        cy.get('[id="BET"]').should('have.text', 'BET');
        cy.get('[id="ALL_IN"]').should('be.visible');
        cy.get('[id="ALL_IN"]').should('have.text', 'ALL-IN');
      })
    
    it('click on check', ()=>{
        cy.get('[id="CHECK"]').click();
    })

    it('click on FOLD', ()=>{
        cy.get('[id="FOLD"]').click();
    })

    it('click on BET', ()=>{
        cy.get('[id="BET"]').click();
        cy.get('[id="idButtonNumber5"]').should('be.visible');
        cy.get('[id="idButtonNumber5"]').click();
        cy.get('[id="idButtonNumber0"]').should('be.visible');
        cy.get('[id="idButtonNumber0"]').click();
        cy.get('[id="idButtonNumber0"]').should('be.visible');
        cy.get('[id="idButtonNumber0"]').click();
    })

    it('click on ALL-IN', ()=>{
        cy.get('[id="ALL_IN"]').click();
    })
})