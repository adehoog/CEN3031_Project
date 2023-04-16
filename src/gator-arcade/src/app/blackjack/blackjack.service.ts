import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

type Card = {
  suit: string;
  val: number;
  name: string;
};

type Deck = {
  d_: Card[];
};

@Injectable({
  providedIn: 'root'
})
export class BlackjackService {
  public deck: Card[] = [];
  public playerHand: Card[] = [];
  public dealerHand: Card[] = [];
  public currentPlayer: string;
  public totalMoney: number = 10;
  public currentBet: number = 1;
  public roundTotal: number = 0;
  public dealerRoundTotal: number = 0;
  public hasWon: boolean = false;

  public backendUrl = 'backend-api';

  constructor(public http: HttpClient) {
    this.currentPlayer = '';
  }

  // Initializes all cards in the deck and shuffles it before returning
  public initializeDeck(): Observable<Deck> {
    return this.http.get<Deck>(`/deck`).pipe(
      tap((deck: Deck) => {
        this.deck = deck.d_;
        this.shuffleDeck();
      }),
      catchError(this.handleError<Deck>('initializeDeck'))
    );
  }

  // Shuffles the deck using the Fisher–Yates shuffle algorithm
  public shuffleDeck(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  // Deals player a card from the top of the deck
  public deal(): Card {
    const card = this.deck.pop();
    if (card) {
      return card;
    } else {
      // Handle the case when the deck is empty
      throw new Error("Deck is empty");
    }
  }
  

  // Initializes the hands of the player and dealer
  public initHands(): Observable<{ playerHand: Card[], dealerHand: Card[] }> {
    return this.http.get<{ playerHand: Card[], dealerHand: Card[] }>(`${this.backendUrl}/hands`).pipe(
      tap((hands: { playerHand: Card[], dealerHand: Card[] }) => {
        this.playerHand = hands.playerHand;
        this.dealerHand = hands.dealerHand;
      }),
      catchError((error: any) => {
        console.error('Error initializing hands', error);
        return throwError(error);
      })
    );
  }
  
  public calculateHand(): void {
    let playerHand = 0;
    let dealerHand = 0;

    for (const card of this.playerHand) {
      playerHand += card.val;
    }

    for (const card of this.dealerHand) {
      dealerHand += card.val;
    }

    if (playerHand > 21) {
        console.log(`Game over, dealer wins!`);
        this.totalMoney -= this.currentBet;
        this.hasWon = false;
      } else if (dealerHand > 21) {
        console.log(`Game over, player wins!`);
        this.totalMoney += this.currentBet;
        this.hasWon = true;
      } else if (playerHand == 21 && dealerHand == 21) {
        console.log(`It's a tie!`);
        this.hasWon = false;
      } else if (playerHand == 21) {
        console.log(`Blackjack!`);
        this.totalMoney += this.currentBet * 1.5;
        this.hasWon = true;
      } else if (dealerHand == 21) {
        console.log(`Game over, dealer wins!`);
        this.totalMoney -= this.currentBet;
        this.hasWon = false;
      } else {
        // Neither player has gone bust or reached 21 yet
        if (this.currentPlayer === 'Player') {
          console.log(`Your current hand is valued at: ${playerHand}`);
          console.log(`Would you like to draw another card? Y/N`);
          // Here you would need to capture the player's input, and then add another card to their hand or end their turn accordingly
        } else {
          // It's the dealer's turn
          if (playerHand <= 16) {
            const newCard = this.deal();
            console.log(`Dealer draws ${newCard.val} of ${newCard.suit}`);
            this.dealerHand.push(newCard);
            this.calculateHand();
          } else {
            this.compareHands(playerHand, dealerHand);
          }
        }
      }
    }
  
    // Compares player's and dealer's hands if they are both < 21
    public compareHands(playerHand: number, dealerHand: number): void {
      console.log(`Player's hand: ${playerHand}`);
      console.log(`Dealer's hand: ${dealerHand}`);
      if (dealerHand > playerHand) {
        console.log(`Dealer wins!`);
        this.hasWon = false;
      } else if (playerHand > dealerHand) {
        console.log(`Player wins!`);
        this.hasWon = true;
      } else {
        console.log(`It's a tie!`);
        this.hasWon = false;
      }
    }

    public handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
      
  }
  