import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WarService } from './war.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { expect } from 'jasmine-core';


describe('WarService', () => {
  let service: WarService;
  let httpMock: HttpTestingController;
  let fetchSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WarService]
    });

    service = TestBed.inject(WarService);
    httpMock = TestBed.inject(HttpTestingController);
    fetchSpy = spyOn(window, 'fetch');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Should be initilizing the deck and calling the initHands method to initialize the two players hands.
  //Should create a mock deck object and hand object
  describe('initDeck', () => {
    it('should initialize the deck and call initHands', () => {
      const deck = {
        d_: [
          { suit: 'hearts', val: 2, name: '2 of hearts' },
          { suit: 'hearts', val: 3, name: '3 of hearts' },
          // ...
        ]
      };

      const hands = {
        p1: [
          { suit: 'hearts', val: 2, name: '2 of hearts' },
          { suit: 'hearts', val: 4, name: '4 of hearts' },
          // ...
        ],
        p2: [
          { suit: 'diamonds', val: 3, name: '3 of diamonds' },
          { suit: 'diamonds', val: 5, name: '5 of diamonds' },
          // ...
        ]
      };

      service.initDeck();

      const deckRequest = httpMock.expectOne('backend-api/deck');
      expect(deckRequest.request.method).toEqual('GET');
      deckRequest.flush(deck);

      const handsRequest = httpMock.expectOne('backend-api/hands');
      expect(handsRequest.request.method).toEqual('GET');
      handsRequest.flush(hands);

      expect(service.game.d).toEqual(deck);
      expect(service.game.p1.hand).toEqual(hands.p1);
      expect(service.game.p2.hand).toEqual(hands.p2);
    });
  });

  //Should be used to set the hand property of p1 and p2 in the game object of the service
  describe('initHands', () => {
    it('should initialize the hands of the two players', () => {
      const hands = {
        p1: [
          { suit: 'hearts', val: 2, name: '2 of hearts' },
          { suit: 'hearts', val: 4, name: '4 of hearts' },
          // ...
        ],
        p2: [
          { suit: 'diamonds', val: 3, name: '3 of diamonds' },
          { suit: 'diamonds', val: 5, name: '5 of diamonds' },
          // ...
        ]
      };

      service.initHands();

      const request = httpMock.expectOne('backend-api/hands');
      expect(request.request.method).toEqual('GET');
      request.flush(hands);

      expect(service.game.p1.hand).toEqual(hands.p1);
      expect(service.game.p2.hand).toEqual(hands.p2);
      expect(service.game.p1.numCards).toEqual(26);
      expect(service.game.p2.numCards).toEqual(26);
    });
  });

  //Used to test drawing cards, comparing values, and updating the game state
  describe('draw', () => {
    it('should correctly handle drawing and compare the values of cards', () => {
      const httpSpy = spyOn(TestBed.inject(HttpClient), 'get').and.callFake(() => {
        // simulate successful response from backend-api/draw
        return of({ p1: { suit: 'Hearts', val: 5, name: '5' }, p2: { suit: 'Spades', val: 10, name: '10' } });
      });
    
      const p1NewHand = [{ suit: 'Hearts', val: 5, name: '5' }];
      const p2NewHand = [{ suit: 'Spades', val: 10, name: '10' }];
      const p1HandBefore = [{ suit: 'Diamonds', val: 3, name: '3' }, { suit: 'Hearts', val: 9, name: '9' }];
      const p2HandBefore = [{ suit: 'Clubs', val: 7, name: '7' }, { suit: 'Spades', val: 4, name: '4' }];
      const gameBefore = {
        d: { d_: [] },
        p1: { hand: p1HandBefore, numCards: 2, newHand: [] },
        p2: { hand: p2HandBefore, numCards: 2, newHand: [] },
      };
      const expectedGameAfter = {
        d: { d_: [] },
        p1: { hand: [...p1HandBefore, ...p1NewHand, ...p2NewHand], numCards: 4, newHand: [] },
        p2: { hand: p2HandBefore, numCards: 0, newHand: [] },
      };
    
      const warService = TestBed.inject(WarService);
    
      warService.draw();
    
      expect(httpSpy).toHaveBeenCalledWith('backend-api/draw');
      expect(warService.game.p1.newHand).toEqual(p1NewHand);
      expect(warService.game.p2.newHand).toEqual(p2NewHand);
    
      // simulate successful response from backend-api/p1-wins
      httpSpy.and.callFake(() => of(null));
      p1HandBefore.push(...p1NewHand, ...p2NewHand);
      expectedGameAfter.p1 = {
        hand: p1HandBefore,
        numCards: 4,
        newHand: [],
      };
      expectedGameAfter.p2.numCards = 0;
      warService.draw();
    
      expect(httpSpy).toHaveBeenCalledWith('backend-api/p1-wins', {
        p1Hand: p1NewHand,
        p2Hand: p2NewHand,
        p1NumCards: 4,
        p2NumCards: 0,
      });
      expect(warService.game).toEqual(expectedGameAfter);
    });
  });

  //Tests whether the method adds three cards from each player to a new hand
      describe('handleTie', () => {
        const card1 = { suit: 'hearts', val: 2, name: '2 of hearts' };
        const card2 = { suit: 'hearts', val: 4, name: '4 of hearts' };
        const card3 = { suit: 'hearts', val: 6, name: '6 of hearts' };
        const card4 = { suit: 'diamonds', val: 3, name: '3 of diamonds' };
        const card5 = { suit: 'diamonds', val: 5, name: '5 of diamonds' };
        const card6 = { suit: 'diamonds', val: 7, name: '7 of diamonds' };
        const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        it('should add three cards from each player to a new hand and call draw()', () => {
          const tieCards = { p1: [card1, card2, card3], p2: [card4, card5, card6] };
          spyOn(service, 'draw');
    
          service['handleTie']();
          expect(httpClientSpy.get.calls.count()).toBe(1);
          expect(httpClientSpy.get.calls.first().args[0]).toBe('backend-api/tie');
          httpClientSpy.get.calls.first().returnValue.subscribe((cb: any) => {
            cb(tieCards);
          });
    
          expect(service.game.p1.newHand.length).toBe(3);
          expect(service.game.p2.newHand.length).toBe(3);
          expect(service.game.p1.newHand).toEqual([card1, card2, card3]);
          expect(service.game.p2.newHand).toEqual([card4, card5, card6]);
          expect(service['draw']).toHaveBeenCalled();
        });
      });
    
      //Should repeatedly call draw() until one player has no cards left
      describe('playGame', () => {
        it('should repeatedly call draw() until one player has no cards left', () => {
          spyOn(service, 'draw');
    
          service['playGame']();
          expect(fetchSpy).toHaveBeenCalled();
          expect(service['draw']).toHaveBeenCalled();
          expect(service.game.p1.numCards).not.toBe(0);
          expect(service.game.p2.numCards).not.toBe(0);
        });
      });
    
      //Should use spyOn() to check that initDeck() and playGame() services are initialized
      describe('startGame', () => {
        it('should initialize the deck and call playGame()', () => {
          spyOn(service, 'initDeck');
          spyOn(service, 'playGame');
    
          service.startGame();
          expect(fetchSpy).toHaveBeenCalled();
          expect(service['initDeck']).toHaveBeenCalled();
          expect(service['playGame']).toHaveBeenCalled();
        });
      });
    
      //Should check reset game state by checking startGame service
      describe('playAgain', () => {
        const card1 = { suit: 'hearts', val: 2, name: '2 of hearts' };
        const card2 = { suit: 'hearts', val: 4, name: '4 of hearts' };
        const card3 = { suit: 'hearts', val: 6, name: '6 of hearts' };
        const card4 = { suit: 'diamonds', val: 3, name: '3 of diamonds' };
        const card5 = { suit: 'diamonds', val: 5, name: '5 of diamonds' };
        const card6 = { suit: 'diamonds', val: 7, name: '7 of diamonds' };
        it('should reset the game state and call startGame()', () => {
          spyOn(service, 'startGame');
          service.game = {
            d: { d_: [card1, card2, card3] },
            p1: { hand: [card1, card2, card3], numCards: 3, newHand: [] },
            p2: { hand: [card4, card5, card6], numCards: 3, newHand: [] }
          };
    
          service.playAgain();
          expect(fetchSpy).toHaveBeenCalled();
          expect(service.game).toEqual({
            d: { d_: [] },
            p1: { hand: [], numCards: 0, newHand: [] },
            p2: { hand: [], numCards: 0, newHand: [] }
          });
          expect(service['startGame']).toHaveBeenCalled();
        });
      });
    });