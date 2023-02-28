import { TicTacToeComponent } from './tic-tac-toe.component'

describe('TicTacToeComponent', () => {
    it('mounts', () => {
        cy.mount(TicTacToeComponent)
    })
})