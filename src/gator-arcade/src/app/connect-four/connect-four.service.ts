import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectFourService {
  board: string[][] = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
  ];
  currentPlayer: string = 'r';
  currentColor: string = 'white';
  hasWon: boolean = false;
  hasLost: boolean = false;
  isTied: boolean = false;
  winner: string = '';
  gameState: string = 'IN PROGRESS';

  makeMove(row: number, col: number) {
    // Ensure the spot selected matches a spot on the board
    if (row > 5 || row < 0 || col > 6 || col < 0) {
      console.log('Error: Out of bounds');
      return;
    }

    // Now update board with respective marker as long as that spot is not taken
    if (this.board[row][col] === '') {
      this.board[row][col] = this.currentPlayer;
      this.checkWin();
      this.currentPlayer = this.currentPlayer === 'r' ? 'y' : 'r';
      if (this.currentColor === 'white') {
        this.currentColor = 'red';
      } else {
        this.currentColor = this.currentColor === 'red' ? 'yellow' : 'red';
      }
    } else {
      console.log('Spot already taken. Please choose another spot.');
    }
  }

  checkWin() {
    // Check for horizontal win
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          this.board[i][j] === this.currentPlayer &&
          this.board[i][j + 1] === this.currentPlayer &&
          this.board[i][j + 2] === this.currentPlayer &&
          this.board[i][j + 3] === this.currentPlayer
        ) {
          this.hasWon = true;
          this.gameState = 'WIN';
          this.winner = this.currentPlayer;
        }
      }
    }

    // Check for vertical win
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 7; j++) {
        if (
          this.board[i][j] === this.currentPlayer &&
          this.board[i + 1][j] === this.currentPlayer &&
          this.board[i + 2][j] === this.currentPlayer &&
          this.board[i + 3][j] === this.currentPlayer
        ) {
          this.hasWon = true;
          this.gameState = 'WIN';
          this.winner = this.currentPlayer;
        }
      }
    }

    // Check for diagonal win (top-left to bottom-right)
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          this.board[i][j] === this.currentPlayer &&
          this.board[i + 1][j + 1] === this.currentPlayer &&
          this.board[i + 2][j + 2] === this.currentPlayer &&
          this.board[i + 3][j + 3] === this.currentPlayer
        ) {
          this.hasWon =           true;
          this.gameState = 'WIN';
          this.winner = this.currentPlayer;
        }
      }
    }

    // Check for diagonal win (bottom-left to top-right)
    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          this.board[i][j] === this.currentPlayer &&
          this.board[i - 1][j + 1] === this.currentPlayer &&
          this.board[i - 2][j + 2] === this.currentPlayer &&
          this.board[i - 3][j + 3] === this.currentPlayer
        ) {
          this.hasWon = true;
          this.gameState = 'WIN';
          this.winner = this.currentPlayer;
        }
      }
    }

    // Check for tie
    let tie = true;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.board[i][j] === '') {
          tie = false;
          break;
        }
      }
    }
    if (tie) {
      this.isTied = true;
      this.gameState = 'TIE';
    }
  }

  reset() {
    this.board = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ];
    this.currentPlayer = 'r';
    this.currentColor = 'white';
    this.hasWon = false;
    this.hasLost = false;
    this.isTied = false;
    this.winner = '';
    this.gameState = 'IN PROGRESS';
  }
}

