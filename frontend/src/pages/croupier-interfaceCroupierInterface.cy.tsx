import React from 'react'
import CroupierInterface from './croupier-interface'

describe('<CroupierInterface />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CroupierInterface />)
  })
})