import { Component, EventEmitter, Input, Output } from '@angular/core';
//import { event } from 'cypress/types/jquery';

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

updateBoard(row: number, col: number) {
  // Ensure the spot selected matches a spot on the board
  if (row > 2 || row < 0 || col > 2 || col < 0) {
    console.log('Error: Out of bounds');
    return;
  }

  // Now update board with respective marker as long as that spot is not taken
  if (this.board[row][col] === '') {
    this.board[row][col] = this.currentPlayer;
  } else {
    console.log('Spot already taken. Please choose another spot.');
    this.updateBoard(row, col);
  }
}


checkResult() {
  // Check rows for winner
  for (let i = 0; i < 3; i++) {
    if (this.board[i][0] === this.board[i][1] && this.board[i][0] === this.board[i][2] && this.board[i][0] !== '') {
      this.winner = this.board[i][0];
      this.gameState = 'WON';
      return;
    }
  }

  // Check columns for winner
  for (let i = 0; i < 3; i++) {
    if (this.board[0][i] === this.board[1][i] && this.board[0][i] === this.board[2][i] && this.board[0][i] !== '') {
      this.winner = this.board[0][i];
      this.gameState = 'WON';
      return;
    }
  }

  // Check diagonals for winner
  if (this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2] && this.board[0][0] !== '') {
    this.winner = this.board[0][0];
    this.gameState = 'WON';
    return;
  }

  if (this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0] && this.board[0][2] !== '') {
    this.winner = this.board[0][2];
    this.gameState = 'WON';
    return;
  }

  // Check for draw
  let draw = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (this.board[i][j] === '') {
        draw = false;
        break;
      }
    }
    if (!draw) {
      break;
    }
  }

  if (draw) {
    this.gameState = 'DRAW';
    return;
  }
}

reset() {
  this.board = [      
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  this.currentPlayer = 'X';
}
}
