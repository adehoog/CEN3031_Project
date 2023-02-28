import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';




  interface NewGame {
    player1: string;
    player2: string;
  }

  export interface Game {
    id: string;
    player1: string;
    player2: string;
    currentPlayer: string;
    winner: string;
    b:  {
      board: string[][];
    }
  }

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  const DEFAULT_PLAYER = 'X';

  @Injectable({
    providedIn: 'root'
  })

  export class TicTacToeService {
    private apiUrl = 'http://localhost:8080/api';  // URL to web api
  

    constructor(private http: HttpClient) { }

     // Creates a new game by sending a POST request to the API with the specified game object.
    public createGame(game: NewGame): Observable<Game> {
      return this.http.post<Game>(this.apiUrl, game, httpOptions).pipe(
        catchError(this.handleError<Game>('createGame'))
      );
    }
  
      // Retrieves a game from the API by sending a GET request to the specified URL. If an ID is provided, only that game is retrieved.
    public getGame(id?: string): Observable<Game[] | Game> {
      const url = id ? `${this.apiUrl}/${id}` : this.apiUrl;
      return this.http.get<Game[] | Game>(url).pipe(
        catchError(this.handleError<Game[] | Game>('getGame'))
      );
    }
  
      // Updates a game by sending a PUT request to the API with the specified game object and ID.
    public updateGame(game: Game): Observable<Game> {
      const url = `${this.apiUrl}/${game.id}`;
      return this.http.put<Game>(url, game, httpOptions).pipe(
        catchError(this.handleError<Game>('updateGame'))
      );
    }
  
      // Deletes a game from the API by sending a DELETE request to the specified URL.
    public deleteGame(id: string): Observable<Game> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<Game>(url, httpOptions).pipe(
        catchError(this.handleError<Game>('deleteGame'))
      );
    }

    // Makes a move in the specified game by sending a POST request to the API with the specified move object and game ID.
    public makeMove(id: string, move: { row: number, col: number }): Observable<Game> {
      const url = `${this.apiUrl}/${id}/play-move`;
      return this.http.post<Game>(url, move);
    }
    
    // Handles any errors that occur during API requests by logging the error and returning a default value.
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        return of(result as T);
      };
    }
  }