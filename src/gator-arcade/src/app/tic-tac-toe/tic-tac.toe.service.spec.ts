import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicTacToeService, Game, NewGame, Move } from './tic-tac-toe.service';


describe('TicTacToeService', () => {
  let service: TicTacToeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicTacToeService]
    });

    service = TestBed.inject(TicTacToeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('createGame', () => {
    it('should create a new game and return it', () => {
      const newGame: NewGame = { player1: 'player1', player2: 'player2' };
      const dummyGame: Game = {
        b: {
          board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
          ]
        },
        p: {
          name: 'player1',
          marker: 'X'
        }
      };

      service.createGame(newGame).subscribe(game => {
        expect(game).toEqual(dummyGame);
      });

      const req = httpMock.expectOne('http://localhost:3000/games');
      expect(req.request.method).toBe('POST');
      req.flush(dummyGame);
    });
  });

  describe('getGame', () => {
    it('should retrieve a specific game', () => {
      const id = '12345';
      const dummyGame: Game = {
        b: {
          board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
          ]
        },
        p: {
          name: 'player1',
          marker: 'X'
        }
      };

      service.getGame(id).subscribe(game => {
        expect(game).toEqual(dummyGame);
      });

      const req = httpMock.expectOne(`http://localhost:3000/games/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyGame);
    });

    it('should retrieve all games', () => {
      const dummyGames: Game[] = [
        {
          b: {
            board: [
              ['', '', ''],
              ['', '', ''],
              ['', '', '']
            ]
          },
          p: {
            name: 'player1',
            marker: 'X'
          }
        },
        {
          b: {
            board: [
              ['', '', ''],
              ['', '', ''],
              ['', '', '']
            ]
          },
          p: {
            name: 'player2',
            marker: 'O'
          }
        }
      ];

      service.getGame().subscribe(games => {
        expect(games).toEqual(dummyGames);
      });

      const req = httpMock.expectOne('http://localhost:3000/games');
      expect(req.request.method).toBe('GET');
      req.flush(dummyGames);
    });
  });

  describe('updateGame', () => {
    it('should send an HTTP PUT request to update a game on the server', () => {
      const game = {
        b: {
          board: [
            ['X', '', ''],
            ['', 'O', ''],
            ['', '', '']
          ]
        },
        p: {
          name: 'player1',
          marker: 'X'
        }
      };
      const updatedGame = {
        b: {
          board: [
            ['X', '', ''],
            ['', 'O', ''],
            ['', 'X', '']
          ]
        },
        p: {
          name: 'player2',
          marker: 'O'
        }
      };

      service.updateGame(game).subscribe(result => {
        expect(result).toEqual(updatedGame);
      });

      const req = httpMock.expectOne(`${service.apiUrl}/X`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(game);
      req.flush(updatedGame);
    });

    it('should handle errors when updating a game', () => {
      const game = {
        b: {
          board: [
            ['X', '', ''],
            ['', 'O', ''],
            ['', '', '']
          ]
        },
        p: {
          name: 'player1',
          marker: 'X'
        }
      };
      const errorMessage = 'Error updating game';
      const error = new ErrorEvent('error', {
        error: new Error(errorMessage),
      });

      service.updateGame(game).subscribe(result => {
        expect(result).toBeUndefined();
      }, err => {
        expect(err.message).toBe(errorMessage);
      });

      const req = httpMock.expectOne(`${service.apiUrl}/X`);
      expect(req.request.method).toBe('PUT');
      req.error(error);
    });
  });

describe('makeMove', () => {
  it('should return an Observable<Game>', () => {
    const mockId = '123';
    const mockMove = {row: 0, col: 0};
    const mockGame = {
      b: {
        board: [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ]
      },
      p: {
        name: 'player1',
        marker: 'X'
      }
    };
    const url = `${service.apiUrl}/${mockId}/play-move`;
    const player = mockId === '123' ? 'player1' : 'player2';
    const mockResponse = {b: {board: [['X', '', ''], ['', '', ''], ['', '', '']]}, p: {name: 'player1', marker: 'X'}};

    service.makeMove(mockId, mockMove).subscribe((game: Game) => {
      expect(game).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
});