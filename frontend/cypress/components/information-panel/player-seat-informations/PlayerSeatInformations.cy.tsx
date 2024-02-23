import React from 'react'
import PlayerSeatInformations from "@/app/components/information-panel/player-seat-informations/PlayerSeatInformations";
import {GameActionEnum} from "@/app/enums/GameAction.enum";
import {RoundStepEnum} from "@/app/enums/RoundStep.enum";

describe('Player Seat informations', () => {
    it('Renders correctly', () => {
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
        cy.mount(<PlayerSeatInformations seatIndex={1} playerHandInfos={playerHandInfos} buttonSeatIndex={1} currentPlayerSeatIndex={3}/>);
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="header_value"]').should('be.visible');
        cy.get('[id="player_info"]').should('be.visible');
        cy.get('[id="white_token"]').should('be.visible');
        cy.get('[id="balance_container"]').should('be.visible');
        cy.get('[id="balance_value"]').should('be.visible');
        cy.get('[id="blue_token"]').should('be.visible');
    })

    describe('Header', () => {
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
        it('Header correct value', () => {
            cy.mount(<PlayerSeatInformations seatIndex={1} playerHandInfos={playerHandInfos} buttonSeatIndex={1} currentPlayerSeatIndex={3}/>);
            cy.get('[id="header_value"]').should('have.text', "Siège 1");
        })
    })


    describe('Player info', () => {
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
        it('playerInfo correct value, seatIndex == buttonSeatIndex', () => {
            cy.mount(<PlayerSeatInformations seatIndex={1} playerHandInfos={playerHandInfos} buttonSeatIndex={1} currentPlayerSeatIndex={3}/>);
            cy.get('[id="balance_value"]').should('have.text', playerHandInfos.player.balance);
            cy.get('[id="blue_token"]').should('be.visible');
        })

        it('playerInfo correct value, seatIndex != buttonSeatIndex', () => {
            cy.mount(<PlayerSeatInformations seatIndex={1} playerHandInfos={playerHandInfos} buttonSeatIndex={2} currentPlayerSeatIndex={3}/>);
            cy.get('[id="balance_value"]').should('have.text', playerHandInfos.player.balance);
        })
    })
})
