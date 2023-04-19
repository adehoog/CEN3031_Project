import { Component, ViewChild } from '@angular/core';
import { PlayingCardsComponent } from '../playing-cards/playing-cards.component';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss']
})
export class BlackjackComponent {
  @ViewChild(PlayingCardsComponent)
  child: PlayingCardsComponent = new PlayingCardsComponent;

  //player vars
  totalMoney: number = 10;
  currentBet: number = 1;
  roundTotal: number = 0;
  playerStands: boolean = false;

  //dealer vars
  dealerRoundTotal: number = 0;
  dealerBet: number = 1;
  dealerStands: boolean = false;

  //game vars
  bettingPool: number = 1;
  deck = [{}];
  winner: string = '';

  ngOnInit() {
    console.log("init");
    this.initDeck();
  }

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

  initDeck() {
    let tempSuit = '';
    var newCard = [];
    let count = 0;

    for (let i = 0; i < 52; i++) {
      newCard.length = 0;
      switch ( i % 4 ){
        case 0:
          tempSuit = "Hearts";
          break;
        case 1:
          tempSuit = "Diamonds";
          break;
        case 2:
          tempSuit = "Clubs";
          break;
        case 3:
          tempSuit = "Spades";
          break;
        default:
          break;
      }
      let val = i % 13;
      switch (i % 13) {
        case 1:
          this.deck.push([tempSuit, "Ace", 1]);
          break;
        case 2:
          this.deck.push([tempSuit, "Two", val]);
          break;
        case 3:
          this.deck.push([tempSuit, "Three", val]);
          break;
        case 4:
          this.deck.push([tempSuit, "Four", val]);
          break;
        case 5:
          this.deck.push([tempSuit, "Five", val]);
          break;
        case 6:
          this.deck.push([tempSuit, "Six", val]);
          break;
        case 7:
          this.deck.push([tempSuit, "Seven", val]);
          break;
        case 8:
          this.deck.push([tempSuit, "Eight", val]);
          break;
        case 9:
          this.deck.push([tempSuit, "Nine", val]);
          break;
        case 10:
          this.deck.push([tempSuit, "Ten", val]);
          break;
        case 11:
          this.deck.push([tempSuit, "Jack", 10]);
          break;
        case 12:
          this.deck.push([tempSuit, "Queen", 10]);
          break;
        case 0:
          this.deck.push([tempSuit, "King", 10]);
          break;
        }
    }
    this.deck.splice(0, 1);
    console.log("Deck size: " + this.deck.length);
  }

  drawCard(){
    // pull cards from deck
    let r = 0;
    r = Math.floor(Math.floor(Math.random() * 52));
    let playerCard = this.deck[r];
    let playerCardVal = 0;
    r = Math.floor(Math.floor(Math.random() * 52));
    let dealerCard = this.deck[r];
    let dealerCardVal = 0;

    console.log(dealerCard);
    
    // display cards
    if (playerCard) {
      let suit = Object.values(playerCard)[0] as string;
      let name = Object.values(playerCard)[1] as string;
      playerCardVal = Object.values(playerCard)[2] as number;
      this.child.makeCard(name, suit);
    }

    if (dealerCard) {
      dealerCardVal = Object.values(dealerCard)[2] as number;
    }

    // add card vals to totals
    if (!this.playerStands) {
      // if player wants more cards
      console.log("adding playing card");
      this.roundTotal = this.roundTotal + playerCardVal;
    }
    if (!this.dealerStands) {
      // if dealer wants more cards
      console.log("adding dealer card");
      this.dealerRoundTotal = this.dealerRoundTotal + dealerCardVal;
    }

    this.checkWin();
  }

  checkWin(){
    console.log("Player's round total: " + this.roundTotal);
    if (this.dealerRoundTotal == 21 || this.roundTotal > 21){
      console.log("Dealer won");
      // dealer gets 21 or player breaks 21
      this.winner = 'Dealer';
      this.totalMoney = this.totalMoney - this.currentBet;
      if (this.totalMoney == 0){
        // player out of money
        this.showPlayAgain();
      }
      else {
        this.roundReset();
      }
    }
    else if (this.roundTotal == 21 || this.dealerRoundTotal > 21){
      console.log("Player won");
      // player gets 21 or dealer breaks 21
      this.winner = 'Player';
      this.totalMoney = this.totalMoney + this.bettingPool;
      this.roundReset();
    }
    else if (this.playerStands && this.dealerStands) {
      if (this.roundTotal > this.dealerRoundTotal) {
        console.log("Player won");
        // player has more than dealer
        this.winner = 'Player';
        this.totalMoney = this.totalMoney + this.bettingPool;
        this.roundReset();
      }
      else {
        console.log("Dealer won");
        // dealer has more than player
        this.winner = 'Dealer';
        this.totalMoney = this.totalMoney - this.currentBet;
        if (this.totalMoney != 0){
          // player out of money
          this.roundReset();
        }
      }
    }
    else{
      // continue game
      this.makeDealerBet();
    }
  }

  makeDealerBet() {
    let r = 0;
    r = Math.floor(Math.floor(Math.random() * 10));

    if ((this.dealerRoundTotal + r) > 21) {
      // if random number + round total would break 21, dealer will stand
      this.dealerStands = true;
    }
    else{
      // if not, dealer increases bet by 21
      this.dealerBet++;
    }
  }

  stand() {
    this.playerStands = true;
    while(!this.dealerStands){
      let r = Math.floor(Math.floor(Math.random() * 10));
      this.dealerRoundTotal = this.dealerRoundTotal + r;
      console.log("Checking win...")
      this.checkWin();
    }
    this.checkWin();
  }

  allowBetting() {
    return this.playerStands;
  }

  roundReset() {
    this.bettingPool = 1;
    this.currentBet = 1;
    this.dealerBet = 1;
    this.roundTotal = 0;
    this.dealerRoundTotal = 0;
    this.playerStands = false;
    this.dealerStands = false;
    //this.winner = '';
  }

  showPlayAgain() {
    if (this.totalMoney == 0){
      this.playerStands = true;
      return false;
    }
    else{
      return true;
    }
  }

  gameReset() {
    this.roundReset();
    this.totalMoney = 10;
    this.child.makeCard('', '');
  }
}
