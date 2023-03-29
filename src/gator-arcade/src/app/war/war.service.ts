import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

type Card = {
  suit: string;
  val: number;
  name: string;
};

type Deck = {
  d_: Card[];
};

type Player = {
  hand: Card[];
  numCards: number;
  newHand: Card[];
};

type Game = {
  d: Deck;
  p1: Player;
  p2: Player;
};

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root',
})
export class WarService {
  public game: Game;

  constructor(private http: HttpClient) {
    this.game = {
      d: { d_: [] },
      p1: { hand: [], numCards: 0, newHand: [] },
      p2: { hand: [], numCards: 0, newHand: [] },
    };
    this.initDeck();
  }

  // Initializes a deck of cards with suits, values, and names, then shuffles and deals them to the two players
  public initDeck(): void {
    this.http.get('backend-api/deck').subscribe((deck: any) => {
      this.game.d = deck;
      this.initHands();
    });
  }
  

  // Initializes the hands of the two players by randomly assigning cards from the deck
  public initHands(): void {
    this.http.get('backend-api/hands').subscribe((hands: any) => {
      this.game.p1.hand = hands.p1;
      this.game.p2.hand = hands.p2;
      this.game.p1.numCards = 26;
      this.game.p2.numCards = 26;
    });
  }
    
    // Draws a card from each player's hand, compares the values, and adds the cards to a new hand for the winning player
    public draw(): void {
        this.http.get('backend-api/draw').subscribe((cards: any) => {
            const p1Card = cards.p1;
            const p2Card = cards.p2;
      
            if (p1Card && p2Card) {
              this.game.p1.newHand.push(p1Card);
              this.game.p2.newHand.push(p2Card);
      
              if (p1Card.val > p2Card.val) {
                this.http.post('backend-api/p1-wins', {
                  p1Hand: this.game.p1.newHand,
                  p2Hand: this.game.p2.newHand,
                  p1NumCards: this.game.p1.numCards + this.game.p1.newHand.length + this.game.p2.newHand.length,
                  p2NumCards: this.game.p2.numCards - this.game.p2.newHand.length
                }).subscribe(() => {
                  this.game.p1.hand.push(...this.game.p1.newHand, ...this.game.p2.newHand);
                  this.game.p1.numCards += this.game.p1.newHand.length + this.game.p2.newHand.length;
                  this.game.p2.numCards -= this.game.p2.newHand.length;
                  this.game.p1.newHand = [];
                  this.game.p2.newHand = [];
                });
              } else if (p1Card.val < p2Card.val) {
                this.http.post('backend-api/p2-wins', {
                  p1Hand: this.game.p1.newHand,
                  p2Hand: this.game.p2.newHand,
                  p1NumCards: this.game.p1.numCards - this.game.p1.newHand.length,
                  p2NumCards: this.game.p2.numCards + this.game.p1.newHand.length + this.game.p2.newHand.length
                }).subscribe(() => {
                  this.game.p2.hand.push(...this.game.p1.newHand, ...this.game.p2.newHand);
                  this.game.p2.numCards += this.game.p1.newHand.length + this.game.p2.newHand.length;
                  this.game.p1.numCards -= this.game.p1.newHand.length;
                  this.game.p1.newHand = [];
                  this.game.p2.newHand = [];
                });
              } else {
                this.handleTie();
              }
            }
          });
        }
    
    // Handles a tie by drawing three cards from each player's hand and adding them to a new hand
    public handleTie(): void {
        this.http.get('backend-api/tie').subscribe((tieCards: any) => {
            const p1Cards = tieCards.p1;
            const p2Cards = tieCards.p2;
      
            if (p1Cards && p2Cards) {
              this.game.p1.newHand.push(...p1Cards);
              this.game.p2.newHand.push(...p2Cards);
              this.draw();
            }
          });
        }
    
    // Plays a game of War by repeatedly drawing cards until one player has no cards left
    public playGame(): void {
        const url = 'http://backend-api.com/war/game/play';
        while (this.game.p1.numCards > 0 && this.game.p2.numCards > 0) {
          fetch(url)
            .then(response => response.json())
            .then(data => {
              if (data.winner === 'p1') {
                this.game.p1.numCards += data.cards.length;
                this.game.p1.hand.push(...data.cards);
              } else if (data.winner === 'p2') {
                this.game.p2.numCards += data.cards.length;
                this.game.p2.hand.push(...data.cards);
              } else {
                // Tie case, handle it accordingly
              }
            });
        }
      }
    
    // Starts a game of War by initializing the deck and playing the game
    public startGame(): void {
        const url = 'http://backend-api.com/war/game/start';
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.game = data;
            this.playGame();
          });
      }
    
    // Allows the players to play again by resetting the game state and starting a new game
    public playAgain(): void {
        const url = 'http://backend-api.com/war/game/new';
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.game = data;
            this.startGame();
          });
      }
}
    