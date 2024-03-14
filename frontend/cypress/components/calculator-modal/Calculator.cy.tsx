import React from 'react'
import Calculator from '@/app/components/calculator-modal/Calculator';

describe('Calculator', () => {
  const playerInfos = {
    name: "string",
    seatIndex: 1,
    balance: 1000
  }

  
  beforeEach(() => {
    const handleNumberStub = cy.stub().as('handleNumberStub');
    const closeCalculatorStub = cy.stub().as('closeCalculatorStub');
    cy.mount(<Calculator openCalculator={true} closeCalculator={closeCalculatorStub} handleNumber={handleNumberStub} />)
  });


  it('renders correctly', () => {
    // Check if the calculator is visible
    for (let i = 0; i <= 9; i += 1) {
      cy.get('[id="idButtonNumber'+i+'"]').should('be.visible');
    }
    cy.get('[id="idButtonDelete"]').should('be.visible');
  });


  it('Text is modified after button click', () => {
    // Check if the text is empty
    cy.get('[id="idResult"]').should('have.value', '');

    // Click on all buttons
    for (let i = 0; i <= 9; i += 1) {
      cy.get('[id="idButtonNumber'+i+'"]').click();
    }

    // Check if the text is modified
    cy.get('[id="idResult"]').should('have.value', '0123456789');

    // Delete the last number
    cy.get('[id="idButtonDelete"]').click();

    // Check if the text is modified
    cy.get('[id="idResult"]').should('have.value', '012345678');
  });


  it('Submit the value', () => {
    // Check if the text is empty
    cy.get('[id="idResult"]').should('have.value', '');

    // Click on all buttons
    for (let i = 0; i <= 9; i += 1) {
      cy.get('[id="idButtonNumber'+i+'"]').click();
    }

    // Submit the value
    cy.get('[id="idButtonSubmit"]').click();

    // Check if the value is submitted
    cy.get('@handleNumberStub').should('be.calledWith', parseInt('0123456789'));

    // Close the calculator
    cy.get('@closeCalculatorStub').should('be.called');
  });
})
