import { Component, ViewChild } from '@angular/core';
import { random } from 'cypress/types/lodash';
import { PlayingCardsComponent } from '../playing-cards/playing-cards.component';

@Component({
  selector: 'app-war',
  templateUrl: './war.component.html',
  styleUrls: ['./war.component.scss']
})
export class WarComponent {
  /*
  @ViewChild(PlayingCardsComponent)
  child: PlayingCardsComponent = new PlayingCardsComponent;
  */
  @ViewChild('pCard')
  childPlyr: PlayingCardsComponent = new PlayingCardsComponent;
  @ViewChild('npcCard')
  childNPC: PlayingCardsComponent = new PlayingCardsComponent;

  cardCount_p: number = 26;
  cardCount_npc: number = 26;

  roundwinner: string = '';
  gamewinner: string = '';

  deck = [{}];
  pDeck = [{}];
  npcDeck = [{}];
  // Card setup:
  // [Suit, Name, Val]

  ngOnInit() {
    console.log("init");
    this.initDeck();
    this.initHands();
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
          this.deck.push([tempSuit, "Ace", 14]);
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
          this.deck.push([tempSuit, "Jack", val]);
          break;
        case 12:
          this.deck.push([tempSuit, "Queen", val]);
          break;
        case 0:
          this.deck.push([tempSuit, "King", 13]);
          break;
        }
    }
    this.deck.splice(0, 1);
    console.log("Deck size: " + this.deck.length);
  }

  initHands() {
    let r = 0;
    for (let i = 51; i >= 0; i--) {
      r = Math.floor(Math.random() * (i+1));
      if (i%2 == 0) {
        this.pDeck.push(this.deck[r]);
        this.deck.splice(r, 1);
      }
      else {
        this.npcDeck.push(this.deck[r]);
        this.deck.splice(r, 1);
      }
    }
    this.pDeck.splice(0, 1);
    this.npcDeck.splice(0, 1);
    console.log("Player card count: " + this.pDeck.length);
    console.log("NPC card count: " + this.npcDeck.length);
  }

  drawCard(){
    let pCard = this.pDeck[0];
    this.pDeck.splice(0, 1);
    let npcCard = this.npcDeck[0];
    this.npcDeck.splice(0, 1);
    console.log(pCard);
    console.log(npcCard);

    let pCardVal = 0;
    let npcCardVal = 0;

    // display cards
    if (pCard) {
      let suit = Object.values(pCard)[0] as string;
      let name = Object.values(pCard)[1] as string;
      pCardVal = Object.values(pCard)[2] as number;
      console.log(name + " of " + suit);
      this.childPlyr.makeCard(name, suit);
    }
    if (npcCard) {
      let suit = Object.values(npcCard)[0] as string;
      let name = Object.values(npcCard)[1] as string;
      npcCardVal = Object.values(npcCard)[2] as number;
      console.log(name + " of " + suit);
      this.childNPC.makeCard(name, suit);
    }

    // handle win, lose, tie
    this.checkResults(pCardVal, npcCardVal);
    if (this.roundwinner == 'Player' && pCard && npcCard){
      this.pDeck.push(pCard);
      this.pDeck.push(npcCard);
    }
    if (this.roundwinner == 'Opponent' && pCard && npcCard){
      this.npcDeck.push(pCard);
      this.npcDeck.push(npcCard);
    }
    console.log("pDeck size: " + this.pDeck.length);
    console.log("npcDeck size: " + this.npcDeck.length);
    this.cardCount_p = this.pDeck.length;
    this.cardCount_npc = this.npcDeck.length;
  }

  checkResults(pVal: number, npcVal: number){
    console.log("Player deck size: " + this.pDeck.length);
    console.log("NPC deck size: " + this.pDeck.length);
    if (this.pDeck.length == 0){
      // player has no more cards
      this.gamewinner = 'You Lost!';
    }
    else if (this.npcDeck.length == 0){
      // oponent has no more cards
      this.gamewinner = 'You Won!';
    }
    else{
      if (pVal > npcVal){
        this.roundwinner = 'Player';
      }
      else if (pVal < npcVal){
        this.roundwinner = 'Opponent';
      }
      else{
        this.roundwinner = 'War';
      }
    }
  }

  goToWar() {
    if(this.roundwinner == 'War') {
      return false;
    }
    else {
      return true;
    }
  }

  ableDrawCard() {
    if(this.roundwinner == 'War') {
      return true;
    }
    else {
      return false;
    }
  }

  handleTie(){
    while(this.roundwinner == 'War'){
    let pPot = [];
    let npcPot = [];
    for (let i = 0; i < 2; i++){
      pPot[i] = this.pDeck[0];
      this.pDeck.splice(0, 1);
      npcPot[i] = this.npcDeck[0];
      this.npcDeck.splice(0, 1);

      if (this.npcDeck.length == 0){
        // if opponents deck is empty
        this.roundwinner = 'Player';
        break;
      }
      if (this.pDeck.length == 0){
        // if player deck is empty
        this.roundwinner = 'Opponent';
        break;
      }
    }

    // grab last card of pot
    let pCard = pPot[pPot.length-1];
    let npcCard = npcPot[npcPot.length-1];
    let pCardVal = 0;
    let npcCardVal = 0;
    if (pCard) {
      pCardVal = Object.values(pCard)[2] as number;
    }
    if (npcCard) {
      npcCardVal = Object.values(npcCard)[2] as number;
    }

    console.log("Player deck size start: " + this.pDeck.length);
    console.log("NPC deck size start: " + this.npcDeck.length);
    // give winner both pots
    if (pCardVal > npcCardVal) {
      this.roundwinner = 'Player';
      while(pPot.length != 0) {
        // add player pot cards
        let card = pPot.pop();
        if (card) {
          this.pDeck.push(card);
          console.log("Player new deck size: " + this.pDeck.length);
        }
      }
      while(npcPot.length != 0) {
        // add opponent pot cards
        let card = npcPot.pop();
        if (card) {
          this.pDeck.push(card);
          console.log("Player new deck size: " + this.pDeck.length);
        }
      }
    }
    if (pCardVal < npcCardVal) {
      this.roundwinner = 'Opponent';
      while(pPot.length != 0) {
        // add player pot cards
        let card = pPot.pop();
        if (card) {
          this.npcDeck.push(card);
          console.log("NPC new deck size: " + this.npcDeck.length);
        }
      }
      while(npcPot.length != 0) {
        // add opponent pot cards
        let card = npcPot.pop();
        if (card) {
          this.npcDeck.push(card);
          console.log("NPC new deck size: " + this.npcDeck.length);
        }
      }
    }
  }
  this.cardCount_p = this.pDeck.length;
  this.cardCount_npc = this.npcDeck.length;
  }

}
