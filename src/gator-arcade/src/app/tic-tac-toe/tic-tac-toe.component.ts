import { Component, EventEmitter, Input, Output } from '@angular/core';
import { event } from 'cypress/types/jquery';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss'],
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
currentPlayer: string = 'X';

@Input() cellClicked = false;
@Output() change = new EventEmitter();

makeMove(x: number, y: number, cell: string) {
  //console.log("cell clicked");
  if (!cell) {
    cell = this.currentPlayer;
    this.board[x][y] = cell;
    //this.checkWin();
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.cellClicked = true;
    this.change.emit(this.cellClicked);
  }
}

/*
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
*/

reset() {
  this.board = [      
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  this.currentPlayer = 'X';
}
}
