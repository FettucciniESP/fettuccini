import React from 'react'
import {TimerCountDown} from "@/app/components/information-panel/time-remaining/timer-count-down/TimerCountDown";

describe('Timer count down', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TimerCountDown />)
  })
})