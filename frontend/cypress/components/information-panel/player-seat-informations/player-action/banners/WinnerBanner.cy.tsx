import React from 'react'
import WinnerBanner from "@/app/components/information-panel/player-seat-informations/player-action/banners/WinnerBanner";

describe('Blind informations', () => {
    const ammountValue = 1250;
    it('WinnerBanners renders correctly', () => {
        cy.mount(<WinnerBanner ammountWin={ammountValue}/>);
        cy.get('[id="winner_box"]').should('be.visible');
        cy.get('[id="winner_token1"]').should('be.visible');
        cy.get('[id="winner_text"]').should('have.text', '1250');
        cy.get('[id="crown"]').should('be.visible');
        cy.get('[id="winner_token2"]').should('be.visible');
    });
})