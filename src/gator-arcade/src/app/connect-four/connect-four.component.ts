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

getColor() {
  return {
    backgroundColor: this.currentColor
  }
}

}

