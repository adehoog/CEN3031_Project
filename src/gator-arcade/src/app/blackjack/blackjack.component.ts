import { Component } from '@angular/core';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss']
})
export class BlackjackComponent {
  totalMoney: number = 0;
  currentBet: number = 0;
  hasWon: boolean = false;

  increaseBet() {
    if(this.currentBet < this.totalMoney){
      this.currentBet++;
    }
  }

  decreaseBet() {
    if(this.currentBet > 0){
      this.currentBet--;
    }
  }

  checkWin() {
    if(this.hasWon){
      
    }
  }

}
