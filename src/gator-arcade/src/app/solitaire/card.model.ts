export class Card {
  private suit: string;
  private value: string;
  private faceUp: boolean;

  constructor(suit: string, value: string) {
    this.suit = suit;
    this.value = value;
    this.faceUp = false;
  }

  getSuit() {
    return this.suit;
  }

  getValue() {
    return this.value;
  }

  flipCard() {
    this.faceUp = !this.faceUp;
  }
}
