import React from 'react'
import BlindsInformations from "@/app/components/information-panel/blinds-informations/BlindsInformations";

describe('Blind informations', () => {
  const currentLevelInfo = {
    smallBlind: 10,
    bigBlind: 20,
    ante: 3,
    duration: 10,
    levelIndex: 1
  }

  beforeEach(() => {
    cy.mount(<BlindsInformations currentLevelInfos={currentLevelInfo}/>)
  });

  it('renders correctly', () => {
    cy.get('[id="blindsInformations"]').should('be.visible');
    cy.get('[id="ante_img"]').should('be.visible');
    cy.get('[id="ante"]').should('be.visible');
    cy.get('[id="ante_value"]').should('be.visible');
    cy.get('[id="big_blind_img"]').should('be.visible');
    cy.get('[id="big_blind"]').should('be.visible');
    cy.get('[id="big_blind_value"]').should('be.visible');
    cy.get('[id="small_blind_img"]').should('be.visible');
    cy.get('[id="small_blind"]').should('be.visible');
    cy.get('[id="small_blind_value"]').should('be.visible');
  })

  it('Ante, good value', () => {
    cy.get('[id="ante"]').should('have.text', 'Ante :')
    cy.get('[id="ante_value"]').should('have.text', '3')
  })

  it('Big Blind, good value', () => {
    cy.get('[id="big_blind"]').should('have.text', 'Big Blind :');
    cy.get('[id="big_blind_value"]').should('have.text', '20');
  });

  it('Small Blind, good value', () => {
    cy.get('[id="small_blind"]').should('have.text', 'Small Blind :');
    cy.get('[id="small_blind_value"]').should('have.text', '10');
  });
})