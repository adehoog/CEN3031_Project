import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss'],
  template: `
  <div class="board">
    <div *ngFor="let row of board" class="row">
      <div *ngFor="let cell of row" class="cell" (click)="makeMove(cell)">
        {{ cell }}
      </div>
    </div>
  </div>
  <button (click)="reset()">Reset</button>
`,
styles: [`
  .board {
    display: flex;
    flex-wrap: wrap;
  }
  .row {
    display: flex;
  }
  .cell {
    width: 33.33%;
    height: 33.33%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: bold;
  }
`]
})
export class TicTacToeComponent {
board: string[][] = [    
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
hasWon: boolean = false;
hasLost: boolean = false;
isTied: boolean = false;
gameState: String = 'IN PROGRESS';
winner: string = '';

currentPlayer = 'X';

makeMove(cell: string) {
  if (!cell) {
    cell = this.currentPlayer;
    this.checkWin();
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }
}

checkWin() {
  // ...
  if (this.hasWon) {
    this.gameState = 'WON';
  } else if (this.isTied) {
    this.gameState = 'TIED';
  }
}

checkLoss() {
  // ...
  if (this.hasLost) {
    this.gameState = 'LOST';
  }
}

reset() {
  this.board = [      ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  this.currentPlayer = 'X';
}
}
