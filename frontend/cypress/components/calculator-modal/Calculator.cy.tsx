import React from 'react'
import Calculator from '@/app/components/calculator-modal/Calculator';
import useActionButtons from '@/app/components/information-panel/game-informations/action-buttons/useActionButtons';
import { GameActionEnum } from '@/app/enums/GameAction.enum';

describe('Blind informations', () => {
  const playerInfos = {
    name: "string",
    seatIndex: 1,
    balance: 1000
  }

  const {
    handleActionButtonClick,
    buttonIsDisabled,
} = useActionButtons()

  beforeEach(() => {
    cy.mount(<Calculator openCalculator={true} handleActionButtonClick={(amount: number) => handleActionButtonClick(playerInfos, GameActionEnum.BET, amount)} />)
  });

  it('renders correctly', () => {
    for (let i = 1; i <= 9; i += 3) {
      cy.get('[id="idButtonNumber'+i+'"]').should('be.visible');
      cy.get('[id="idButtonNumber'+(i+1)+'"]').should('be.visible');
      cy.get('[id="idButtonNumber'+(i+2)+'"]').should('be.visible');
    }
    cy.get('[id="idButtonNumber0"]').should('be.visible');
    cy.get('[id="idButtonDelete"]').should('be.visible');
  });
})