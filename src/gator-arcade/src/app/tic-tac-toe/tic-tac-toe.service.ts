import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface Board {
  board: string[][];
}

interface Player {
  name: string;
  marker: string;
}

export interface Game {
  b: Board;
  p: Player;
}

export interface Move {
  row: number;
  col: number;
}

export interface NewGame {
  player1: string;
  player2: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {

  private game: Game = { b: { board: [['', '', ''], ['', '', ''], ['', '', '']] }, p: { name: '', marker: '' } };


  public apiUrl = 'http://localhost:4200/api';

  constructor(private http: HttpClient) { }

  //Sends an HTTP POST request to create a new game on the server.
  public createGame(game: NewGame): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game, httpOptions).pipe(
      catchError(this.handleError<Game>('createGame'))
    );
  }

  //Sends an HTTP GET request to retrieve a game from the server.
  public getGame(id?: string): Observable<Game[] | Game> {
    const url = id ? `${this.apiUrl}/${id}` : this.apiUrl;
    return this.http.get<Game[] | Game>(url).pipe(
      catchError(this.handleError<Game[] | Game>('getGame'))
    );
  }

  //Sends an HTTP PUT request to update a game on the server.
  public updateGame(game: Game): Observable<Game> {
    const url = `${this.apiUrl}/${game.b.board[0][0]}`;
    return this.http.put<Game>(url, game, httpOptions).pipe(
      catchError(this.handleError<Game>('updateGame'))
    );
  }

  //Updates the game board with a valid move and returns the updated game, or returns the original game if the move is invalid.
  public updateBoard(game: Game, move: Move): Game {
    const { row, col } = move;
    if (row > 2 || row < 0 || col > 2 || col < 0) {
      console.log("Error: Out of bounds");
      return game;
    } else if (game.b.board[row][col] !== "") {
      console.log("Spot already taken. Please choose another spot.");
      return game;
    } else {
      game.b.board[row][col] = game.p.marker;
      return game;
    }
  }

  //Logs the current state of the game board, replacing any empty spots with dashes.
  public displayBoard(): void {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.game.b.board[i][j] == "") {
          this.game.b.board[i][j] = "-";
        }
        console.log(this.game.b.board[i][j]);
      }
      console.log();
    }
  }

  //Checks whether the current player has won the game by checking all possible winning combinations in the game board.
  public checkIfWon(): boolean {
    /* There are only 8 possible winning combinations of tic tac toe:
       3 consecutive horizontal, vertical, or diagonal.
       Check if any of these are present for the current player.
    */
    let playerWon = false;
    let row = 0;
    let count = 0;
  
    // Checking all rows for winning combinations
    while (row < 3 && !playerWon) {
      let currentRow = this.game.b.board[row];
  
      for (let i = 0; i < currentRow.length; i++) {
        if (currentRow[i] !== this.game.p.marker) {
          break;
        } else {
          count++;
          if (count === 3) {
            playerWon = true;
            return playerWon;
          }
        }
      }
      row++;
      count = 0;
    }
  
    let col = 0;
    count = 0;
    let currentCol: string[] = [];
  
    // Checking all columns for winning combinations
    while (col < 3 && !playerWon) {
      currentCol = [this.game.b.board[0][col], this.game.b.board[1][col], this.game.b.board[2][col]];
  
      for (let i = 0; i < currentCol.length; i++) {
        if (currentCol[i] !== this.game.p.marker) {
          playerWon = false;
          break;
        } else {
          count++;
          if (count === 3) {
            playerWon = true;
            return playerWon;
          }
        }
      }
      col++;
      count = 0;
    }
  
    // Checking diagonals for winning combinations
    let diagonalOne = [this.game.b.board[0][0], this.game.b.board[1][1], this.game.b.board[2][2]];
    let diagonalTwo = [this.game.b.board[0][2], this.game.b.board[1][1], this.game.b.board[2][0]];
    count = 0;
  
    for (let i = 0; i < diagonalOne.length; i++) {
      if (diagonalOne[i] !== this.game.p.marker) {
        playerWon = false;
        break;
      } else {
        count++;
        if (count === 3) {
          playerWon = true;
          return playerWon;
        }
      }
    }
  
    count = 0;
    for (let i = 0; i < diagonalTwo.length; i++) {
      if (diagonalTwo[i] !== this.game.p.marker) {
        playerWon = false;
        break;
      } else {
        count++;
        if (count === 3) {
          playerWon = true;
          break;
        }
      }
    }
    return playerWon;
  }

  //Checks if a game has ended in a draw by iterating over its entire board and returning true if all positions are occupied.
  public isDraw(game: Game): boolean {
    let gameIsDraw = true;
  
    // Check over entire board to see if it is full
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (game.b.board[i][j] == "") {
          gameIsDraw = false;
        }
      }
    }
  
    return gameIsDraw;
  }

  //Sends an HTTP PUT request to update a player on the server and to update the game with the new board.
  public makeMove(id: string, move: Move): Observable<Game> {
    const url = `${this.apiUrl}/${id}/play-move`;
    const player = id === '123' ? 'player1' : 'player2';
    const marker = player === 'player1' ? 'X' : 'O';
    const game = {
      b: {
        board: [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ]
      },
      p: {
        name: player,
        marker
      }
    };
    const body = {
      row: move.row,
      col: move.col,
      player,
      marker
    };
    return this.http.put<Game>(url, body).pipe(
      tap((game: Game) => this.updateBoard(game, move)),
      catchError(this.handleError<Game>('makeMove'))
    );
  }

  //Handles errors from HTTP requests and returns an Observable with a default result.
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
