import React from 'react'
import FettucciniContainer from '@/app/components/design-system/fettuccini-container/FettucciniContainer';
import { VariantStyleEnum } from '@/app/enums/VariantStyle.enum';

describe('FettucciniContainer', () => {
const variantStyle = VariantStyleEnum.DEFAULT

  
  beforeEach(() => {
    cy.mount(<FettucciniContainer children variantStyle={variantStyle} />)
  });

  it('renders correctly', () => {
    // Check if the calculator is visible
    cy.get('[id="box"]').should('be.visible');
  });
})
