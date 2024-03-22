import React from 'react'
import FettucciniContainer from '@/app/components/design-system/fettuccini-container/FettucciniContainer';
import { VariantStyleEnum } from '@/app/enums/VariantStyle.enum';

describe('FettucciniContainer', () => {
const variantStyleIsSelected = VariantStyleEnum.IS_SELECTED
const variantStyleIsBlur = VariantStyleEnum.BLUR
const variantStyleIsDefault = VariantStyleEnum.DEFAULT

  
  it('renders correctly', () => {
    cy.mount(<FettucciniContainer children variantStyle={variantStyleIsDefault} />)
    // Check if the container is visible
    cy.get('[id="box"]').should('be.visible');
  });

  it('renders correctly blur', () => {
    cy.mount(<FettucciniContainer children variantStyle={variantStyleIsBlur} />)
    // Check if the container is visible
    cy.get('[id="box"]').should('be.visible');
  });

  it('renders correctly isSelected', () => {
    cy.mount(<FettucciniContainer children variantStyle={variantStyleIsSelected} />)
    // Check if the container is visible
    cy.get('[id="box"]').should('be.visible');
  });
})
