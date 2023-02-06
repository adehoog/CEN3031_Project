import { Card } from './card.model';

export class Pile {
    cards: Card[] = [];
    location: string;
  
    constructor(location: string) {
      this.location = location;
    }
  
    addCard(card: Card): void {
      this.cards.push(card);
    }
  
    public removeCard(): Card | undefined {
        if (this.cards.length === 0) {
          return undefined;
        }
        return this.cards.pop();
      }
      
  }
  