import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-connect-four',
  templateUrl: './connect-four.component.html',
  styleUrls: ['./connect-four.component.scss']
})
export class ConnectFourComponent {
  //6 rows, 7 cols
board: string[][] = [
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '']
];
hasWon: boolean = false;
hasLost: boolean = false;
isTied: boolean = false;
gameState: String = 'IN PROGRESS';
winner: string = '';
currentPlayer: string = 'r';
currentColor: string = 'white';
diagCount: number = 0;

makeMove(x: number, y: number, cell: string) {
  //console.log("cell clicked");
  if (!cell && (x===5 || this.board[x+1][y] != '')) {
    cell = this.currentPlayer;
      this.board[x][y] = cell;
      //this.checkWin();
      this.currentPlayer = this.currentPlayer === 'r' ? 'y' : 'r';
      if(this.currentColor === 'white'){
        this.currentColor = 'red';
      }
      else{
        this.currentColor = this.currentColor === 'red' ? 'yellow' : 'red';
      }
      this.checkResult();
      //console.log(x + ", " + y);
  }
}

updateBoard(row: number, col: number) {
  // Ensure the spot selected matches a spot on the board
  if (row > 6 || row < 0 || col > 7 || col < 0) {
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
  // Horizontal
  for (let i = 0; i < 6; i++) {
    var rowMatch = this.board[i].join('').match(/r{4}|y{4}/);
    if (rowMatch) {
      rowMatch[0].indexOf("r") > -1 ? this.winner = "red" : this.winner = "yellow";
    }
  }

  // Vertical
  var columns = this.board[0].map((_, colIndex) => this.board.map(row => row[colIndex]));
  for (let i = 0; i < columns.length; i++) {
    var colMatch = columns[i].join('').match(/r{4}|y{4}/);
    if (colMatch) {
      colMatch[0].indexOf("r") > -1 ? this.winner = "red" : this.winner = "yellow";
    }
  }

  // Diagonal
  var diagonals = this.getDiags();
  for (let i = 0; i < diagonals.length; i++) {
    let diagMatch = diagonals[i].join('').match(/r{4}|y{4}/);
    if (diagMatch) {
      diagMatch[0].indexOf("r") > -1 ? this.winner = "red" : this.winner = "yellow";
    }
  }

  if (this.winner != ''){
    this.gameState = 'WON';
  }

  // Check for draw
  let draw = true;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
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

getDiags(){
  var diags = [];
  for (let i = -5; i < 7; i++) {
    var group = [];
    for (let j = 0; j < 6; j++) {
      if ((i+j) >=0 && (i+j) < 7) {
        group.push(this.board[j][i+j]);
      }
    }
    diags.push(group);
  }
  for (let i = 0; i < 12; i++) {
    var group = [];
    for (let j = 5; j >= 0; j--) {
      if ((i-j) >= 0 && (i-j) < 7) {
        group.push(this.board[j][i-j]);
      }
    }
    diags.push(group);
  }
  return diags.filter(function(a) {
    return a.length > 3;
  });
}

getDiagsOld(row: number, col: number, color: string){
  var diags = new Set();
  if (this.board[row-1][col-1] == color) {
    diags.add([row-1, col-1]);
  }
  if (this.board[row+1][col-1] == color) {
    diags.add([row+1, col-1]);
  }
  if (this.board[row+1][col+1] == color) {
    diags.add([row+1, col+1]);
  }
  if (this.board[row-1][col+1] == color) {
    diags.add([row-1, col+1]);
  }

  return diags;
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
  this.hasWon = false;
  this.hasLost = false;
  this.isTied = false;
  this.gameState = 'IN PROGRESS';
  this.winner = '';
  this.currentPlayer = 'r';
  this.currentColor = 'white';
}
}

