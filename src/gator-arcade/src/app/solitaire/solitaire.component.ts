import { Component } from '@angular/core';
import { Pile } from './pile.model';
import { Card } from './card.model';

@Component({
  selector: 'app-solitaire',
  templateUrl: './solitaire.component.html',
  styleUrls: ['./solitaire.component.scss']
})

export class SolitaireComponent {
  cards: Card[][] = [[], [], [], []];
  gameState: 'WON' | 'LOST' | 'IN_PROGRESS' = 'IN_PROGRESS';
  stock: any[];
  tableaus: any[][];
  foundations: any[][];
  fromPile: any;
  toPile: any;
  piles: Pile[] = [];

  constructor() {
    // Initialize properties here
    this.stock = [];
    this.tableaus = [[], [], [], [], [], [], []];
    this.foundations = [[], [], [], []];
    this.fromPile = null;
    this.toPile = null;
  }

  moveCard(fromPile: number, toPile: number) {
    let card = this.piles[fromPile].removeCard();
    if (card) {
        this.piles[toPile].addCard(card);
    }
}

drawCard() {
  if (this.stock.length > 0) {
    let card = this.stock.pop();
    this.tableaus[0].push(card);
  }
}

restartGame() {
  this.stock = [];
  this.tableaus = [[], [], [], [], [], [], []];
  this.foundations = [[], [], [], []];
  this.fromPile = null;
  this.toPile = null;
}

  checkForWin() {
    let win = true;
    for (let foundation of this.foundations) {
      if (foundation.length !== 13) {
        win = false;
        break;
      }
    }
    if (win) {
      this.gameState = 'WON';
    }
    
  }

  reset(): void {
    this.stock = [];
    this.tableaus = [[], [], [], [], [], [], []];
    this.foundations = [[], [], [], []];
    this.fromPile = null;
    this.toPile = null;
    this.gameState = 'IN_PROGRESS';
  }
}
