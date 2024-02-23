import React from 'react'
import PlayerAction from "@/app/components/information-panel/player-seat-informations/player-action/PlayerAction";
import {GameActionEnum} from "@/app/enums/GameAction.enum";
import {RoundStepEnum} from "@/app/enums/RoundStep.enum";

describe('Blind informations', () => {
    it('Fold renders correctly', () => {
        const playerHandInfos= {
            lastAction: {
                actionType: GameActionEnum.FOLD,
                amount: 10,
                seatIndex: 2,
                roundStep: RoundStepEnum.FLOP
            },
            player: {
                name: "Mathis",
                seatIndex: 2,
                balance: 100000,
            }
        }
        cy.mount(<PlayerAction playerHandInfos={playerHandInfos}/>)
        cy.get('[id="action_content"]').should('be.visible');
        cy.get('[id="fold_action"]').should('be.visible');
        cy.get('[id="fold_text"]').should('have.text', 'FOLD');
    });

    it('All In with amount text', () => {
        const playerHandInfos= {
            lastAction: {
                actionType: GameActionEnum.ALL_IN,
                amount: 100,
                seatIndex: 2,
                roundStep: RoundStepEnum.FLOP
            },
            player: {
                name: "Mathis",
                seatIndex: 2,
                balance: 100000,
            }
        }
        cy.mount(<PlayerAction playerHandInfos={playerHandInfos}/>)
        cy.get('[id="action_content"]').should('be.visible');
        cy.get('[id="allIn_action"]').should('be.visible');
        cy.get('[id="allIn_text"]').should('have.text', '100');
    })


    it('Check renders correctly', () => {
        const playerHandInfos = {
            lastAction: {
                actionType: GameActionEnum.CHECK,
                amount: 0,
                seatIndex: 2,
                roundStep: RoundStepEnum.FLOP
            },
            player: {
                name: "Mathis",
                seatIndex: 2,
                balance: 100000,
            }
        }
        cy.mount(<PlayerAction playerHandInfos={playerHandInfos}/>)
        cy.get('[id="action_content"]').should('be.visible');
        cy.get('[id="check_action"]').should('be.visible');
    })

    it('Bet renders correctly', () => {
        const playerHandInfos = {
            lastAction: {
                actionType: GameActionEnum.BET,
                amount: 100,
                seatIndex: 2,
                roundStep: RoundStepEnum.FLOP
            },
            player: {
                name: "Mathis",
                seatIndex: 2,
                balance: 100000,
            }
        }
        cy.mount(<PlayerAction playerHandInfos={playerHandInfos}/>)
        cy.get('[id="action_content"]').should('be.visible');
        cy.get('[id="bet_action"]').should('be.visible');
        cy.get('[id="bet_text"]').should('have.text', '100');
    })

    it('Call renders correctly', () => {
        const playerHandInfos = {
            lastAction: {
                actionType: GameActionEnum.CALL,
                amount: 100,
                seatIndex: 2,
                roundStep: RoundStepEnum.FLOP
            },
            player: {
                name: "Mathis",
                seatIndex: 2,
                balance: 100000,
            }
        }
        cy.mount(<PlayerAction playerHandInfos={playerHandInfos}/>)
        cy.get('[id="action_content"]').should('be.visible');
        cy.get('[id="bet_action"]').should('be.visible');
        cy.get('[id="bet_text"]').should('have.text', '100');
    })
})