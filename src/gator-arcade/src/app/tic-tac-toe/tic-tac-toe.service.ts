import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface Board {
  board: string[][];
}

interface Player {
  name: string;
  marker: string;
}

interface Game {
  b: Board;
  p: Player;
}

interface Move {
  row: number;
  col: number;
}

interface NewGame {
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

  private apiUrl = 'http://localhost:3000/games';

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

  //Sends an HTTP DELETE request to delete a game from the server.
  public deleteGame(id: string): Observable<Game> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Game>(url, httpOptions).pipe(
      catchError(this.handleError<Game>('deleteGame'))
    );
  }

  //Sends an HTTP PUT request to update a player on the server and to update the game with the new board.
  public makeMove(id: string, move: Move): Observable<Game> {
    const url = `${this.apiUrl}/${id}/play-move`;
    const player = id === '1' ? 'player1' : 'player2';
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
        marker: player === 'player1' ? 'X' : 'O'
      }
    };
    return this.getGame(id).pipe(
      map((games: Game[] | Game) => Array.isArray(games) ? games[0] : games),
      catchError(this.handleError<Game>('makeMove'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
