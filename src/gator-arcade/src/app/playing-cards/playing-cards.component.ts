import { Component } from '@angular/core';

@Component({
  selector: 'app-playing-cards',
  templateUrl: './playing-cards.component.html',
  styleUrls: ['./playing-cards.component.scss']
})
export class PlayingCardsComponent {
  /*
  ranks: {} = [
    [ 'A', 1 ],
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
    { label: 'J', value: 11 },
    { label: 'Q', value: 12 },
    { label: 'K', value: 13 },
  ];
  suits: {} = [
    { name: 'hearts', symbol: '\u2665' },
    { name: 'clubs', symbol: '\u2663' },
    { name: 'diamonds', symbol: '\u2666' },
    { name: 'spades', symbol: '\u2660' }
  ];
  */

  rank: string = '';
  value: number = 0;
  suit: string = '';
  symbol: string = '';


  makeCard(cardRank: string, cardSuit: string) {
    this.rank = cardRank;
    //sets card value
    if(this.rank == 'A'){
      this.value = 1;
    }
    else if (this.rank == 'J'){
      this.value = 11;
    }
    else if (this.rank == 'Q'){
      this.value = 12;
    }
    else if (this.rank == 'K'){
      this.value = 13;
    }
    else{
      this.value = Number(this.rank);
    }

    //sets suit symbol
    this.suit = cardSuit;
    if(this.suit == "Hearts"){
      this.symbol = '\u2665';
    }
    else if(this.suit == "Clubs"){
      this.symbol = '\u2663';
    }
    else if(this.suit == "Diamonds"){
      this.symbol = '\u2666';
    }
    else if(this.suit == "Spades"){
      this.symbol = '\u2660';
    }
  }
}
