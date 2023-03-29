import { Component } from '@angular/core';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss']
})
export class BlackjackComponent {
  //player vars
  totalMoney: number = 10;
  currentBet: number = 1;
  roundTotal: number = 0;
  hasWon: boolean = false;
  //[cardRank, cardSuit]
  cards: string[][] = [[]];

  //dealer vars
  dealerRoundTotal: number = 0;
  dealerBet: number = 1;

  //game vars
  bettingPool: number = 1;

  increaseBet() {
    if(this.currentBet < this.totalMoney){
      this.currentBet++;
      this.updatePool();
      //console.log(this.currentBet);
    }
  }

  decreaseBet() {
    if(this.currentBet > 1){
      this.currentBet--;
      //console.log(this.currentBet);
    }
    this.updatePool();
  }

  updatePool() {
    this.bettingPool = this.dealerBet + this.currentBet;
  }

  addCardVal(cardVal: number){
    this.roundTotal += cardVal;
  }

  addCard(cardRank: string, cardSuit: string){
    const newCard = [cardRank, cardSuit];
    this.cards.push(newCard);
  }

  checkWin(){
    if(this.hasWon){
      this.totalMoney += (this.bettingPool - this.currentBet);
    }
    else{
      this.totalMoney -= this.currentBet;
    }
  }

}
