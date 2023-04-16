import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { BlackjackService } from "./blackjack.service";

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

describe("BlackjackService", () => {
  let service: BlackjackService;
  let httpMock: HttpTestingController;
  let fetchSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlackjackService]
    });

    service = TestBed.inject(BlackjackService);
    httpMock = TestBed.inject(HttpTestingController);
    fetchSpy = spyOn(window, 'fetch');
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('initializeDeck', () => {
    beforeEach(() => {
      const deck: Deck = { d_: [{ suit: 'spades', val: 10, name: '10 of spades' }, { suit: 'hearts', val: 4, name: '4 of hearts' }, { suit: 'spades', val: 1, name: 'Ace of spades' }] };
      httpMock.expectOne(`${service.backendUrl}/deck`).flush(deck);
    });
  
    afterEach(() => {
      httpMock.verify();
    });
  
    it('should initialize the deck and shuffle it', () => {
      const deck: Deck = { d_: [{ suit: 'spades', val: 10, name: '10 of spades' }, { suit: 'hearts', val: 4, name: '4 of hearts' }, { suit: 'spades', val: 1, name: 'Ace of spades' }] };
  
      service.initializeDeck().subscribe((result) => {
        expect(result).toEqual(deck);
        expect(service.deck.length).toBeGreaterThan(0);
        expect(service.deck).toEqual(deck.d_);
      });
    });
  
    it('should handle errors', () => {
      const errorMessage = 'An error occurred while initializing the deck';
      httpMock.expectOne(`${service.backendUrl}/deck`).error(new ErrorEvent('Network error'));
  
      service.initializeDeck().subscribe(
        () => {},
        (error) => {
          expect(error).toBeTruthy();
          expect(error.message).toEqual(errorMessage);
        }
      );
    });
  });
  
  
  

  describe('shuffleDeck', () => {
    beforeEach(() => {
      service.initializeDeck().subscribe();
    });

    it('should shuffle the deck', () => {
    const originalDeck = [
        { suit: 'hearts', val: 2, name: '2 of hearts' },
        { suit: 'hearts', val: 3, name: '3 of hearts' },
        { suit: 'hearts', val: 4, name: '4 of hearts' },
        { suit: 'hearts', val: 5, name: '5 of hearts' },
        { suit: 'hearts', val: 6, name: '6 of hearts' },
        { suit: 'hearts', val: 7, name: '7 of hearts' },
        { suit: 'hearts', val: 8, name: '8 of hearts' },
        { suit: 'hearts', val: 9, name: '9 of hearts' },
        { suit: 'hearts', val: 10, name: '10 of hearts' },
        { suit: 'hearts', val: 10, name: 'Jack of hearts' },
        { suit: 'hearts', val: 10, name: 'Queen of hearts' },
        { suit: 'hearts', val: 10, name: 'King of hearts' },
        { suit: 'hearts', val: 11, name: 'Ace of hearts' },
        { suit: 'diamonds', val: 2, name: '2 of diamonds' },
        { suit: 'diamonds', val: 3, name: '3 of diamonds' },
        { suit: 'diamonds', val: 4, name: '4 of diamonds' },
        { suit: 'diamonds', val: 5, name: '5 of diamonds' },
        { suit: 'diamonds', val: 6, name: '6 of diamonds' },
        { suit: 'diamonds', val: 7, name: '7 of diamonds' },
        { suit: 'diamonds', val: 8, name: '8 of diamonds' },
        { suit: 'diamonds', val: 9, name: '9 of diamonds' },
        { suit: 'diamonds', val: 10, name: '10 of diamonds' },
        { suit: 'diamonds', val: 10, name: 'Jack of diamonds' },
        { suit: 'diamonds', val: 10, name: 'Queen of diamonds' },
        { suit: 'diamonds', val: 10, name: 'King of diamonds' },
        { suit: 'diamonds', val: 11, name: 'Ace of diamonds' },
        { suit: 'spades', val: 2, name: '2 of spades' },
        { suit: 'spades', val: 3, name: '3 of spades' },
        { suit: 'spades', val: 4, name: '4 of spades' },
        { suit: 'spades', val: 5, name: '5 of spades' },
        { suit: 'spades', val: 6, name: '6 of spades' },
        { suit: 'spades', val: 7, name: '7 of spades' },
        { suit: 'spades', val: 8, name: '8 of spades' },
        { suit: 'spades', val: 9, name: '9 of spades' },
        { suit: 'spades', val: 10, name: '10 of spades' },
        { suit: 'spades', val: 10, name: 'Jack of spades' },
        { suit: 'spades', val: 10, name: 'Queen of spades' },
        { suit: 'spades', val: 10, name: 'King of spades' },
        { suit: 'spades', val: 11, name: 'Ace of spades' },
        { suit: 'clubs', val: 2, name: '2 of clubs' },
        { suit: 'clubs', val: 3, name: '3 of clubs' },
        { suit: 'clubs', val: 4, name: '4 of clubs' },
        { suit: 'clubs', val: 5, name: '5 of clubs' },
        { suit: 'clubs', val: 6, name: '6 of clubs' },
        { suit: 'clubs', val: 7, name: '7 of clubs' },
        { suit: 'clubs', val: 8, name: '8 of clubs' },
        { suit: 'clubs', val: 9, name: '9 of clubs' },
        { suit: 'clubs', val: 10, name: '10 of clubs' },
        { suit: 'clubs', val: 10, name: 'Jack of clubs' },
        { suit: 'clubs', val: 10, name: 'Queen of clubs' },
        { suit: 'clubs', val: 10, name: 'King of clubs' },
        { suit: 'clubs', val: 11, name: 'Ace of clubs' }
      ];

      service.shuffleDeck();

      expect(service.deck.some((card) => !originalDeck.includes(card))).toBe(false);
      expect(service.deck).not.toEqual(originalDeck);
      expect(service.deck.length).toBeLessThanOrEqual(originalDeck.length);
    
      let isShuffled = false;
      for (let i = 0; i < originalDeck.length; i++) {
        if (originalDeck[i] !== service.deck[i]) {
          isShuffled = true;
          break;
        }
      }
    
      expect(isShuffled).toBe(true);
    });
  });

  describe('deal', () => {
    beforeEach(() => {
      // Mock the HTTP response for the initializeDeck method
      //const mockDeck = { d_: [{ suit: 'spades', val: 10, name: '10 of spades' }, { suit: 'hearts', val: 4, name: '4 of hearts' }, { suit: 'spades', val: 1, name: 'Ace of spades' }] };
      //const req = httpMock.expectOne(`${service.backendUrl}/deck`);
      //expect(req.request.method).toEqual('GET');
      //req.flush(mockDeck);
      service.deck = [
        { suit: 'spades', val: 10, name: '10 of spades' },
        { suit: 'hearts', val: 4, name: '4 of hearts' },
        { suit: 'spades', val: 1, name: 'Ace of spades' },
      ];
    });
  
    it('should deal a card from the top of the deck', () => {
      const topCard = service.deck[service.deck.length - 1];
      const dealtCard = service.deal();
  
      expect(dealtCard).toEqual(topCard);
      expect(service.deck.length).toEqual(2);
    });
  
    it('should throw an error when the deck is empty', () => {
      // Empty the deck
      while (service.deck.length) {
        service.deck.pop();
      }
  
      //const req = httpMock.expectOne(`${service.backendUrl}/deck`);
      //expect(req.request.method).toEqual('GET');
      //req.flush({ d_: [] });
  
      expect(() => service.deal()).toThrow(new Error('Deck is empty'));
    });
  });
  
  

  describe('initHands', () => {
    it('should initialize player and dealer hands', () => {
      const mockHands = {
        playerHand: [{suit: 'hearts', val: 10, name: '10'}, {suit: 'diamonds', val: 4, name: '4'}],
        dealerHand: [{suit: 'clubs', val: 11, name: 'J'}, {suit: 'spades', val: 5, name: '5'}]
      };
  
      service.initHands().subscribe((hands: { playerHand: Card[], dealerHand: Card[] }) => {
        expect(hands).toEqual(mockHands);
        expect(service.playerHand).toEqual(mockHands.playerHand);
        expect(service.dealerHand).toEqual(mockHands.dealerHand);
      });
  
      const req = httpMock.expectOne(`${service.backendUrl}/hands`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockHands);
    });
  
    it('should handle errors', () => {
      const mockError = { status: 404, statusText: 'Not Found', message: 'An error occurred while initializing hands' };
  
      service.initHands().subscribe(
        () => {
          fail('should have failed with an error');
        },
        (error: any) => {
          expect(error.status).toEqual(404);
          expect(error.statusText).toEqual('Not Found');
        }
      );
  
      const req = httpMock.expectOne(`${service.backendUrl}/hands`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockError, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('calculateHand', () => {
    it('should update the player and dealer hands and total money', () => {
      service.playerHand = [{suit: 'hearts', val: 10, name: '10'}, {suit: 'diamonds', val: 4, name: '4'}];
      service.dealerHand = [{suit: 'clubs', val: 11, name: 'J'}, {suit: 'spades', val: 5, name: '5'}];
      service.currentPlayer = 'Player';
      service.currentBet = 10;
      service.totalMoney = 100;
  
      spyOn(window.console, 'log').and.stub();
  
      service.calculateHand();
  
      expect(window.console.log).toHaveBeenCalledWith('Your current hand is valued at: 14');
      expect(window.console.log).toHaveBeenCalledWith('Would you like to draw another card? Y/N');
    });
  });

  describe('compareHands', () => {
    it('should correctly determine the winner', () => {
      const playerHand = 18;
      const dealerHand = 20;
  
      service.compareHands(playerHand, dealerHand);
      expect(service.hasWon).toBe(false);
  
      service.compareHands(dealerHand, playerHand);
      expect(service.hasWon).toBe(true);
  
      service.compareHands(playerHand, playerHand);
      expect(service.hasWon).toBe(false);
    });
  });

  describe('handleError', () => {
    it('should return an Observable with a default value on error', () => {
      const error = { message: 'Error message' };
      const operation = 'Test operation';
      const result = { foo: 'bar' };
  
      const observable = service.handleError(operation, result)(error);
  
      observable.subscribe((value) => {
        expect(value).toEqual(result);
      });
    });
  });
  
  
});
