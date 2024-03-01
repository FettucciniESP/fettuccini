import React from 'react'
import TimeRemaining from "@/app/components/information-panel/time-remaining/TimeRemaining";

describe('TiImeRemaining', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TimeRemaining />);
    cy.get("[id='timer']").should('be.visible');
  })
})