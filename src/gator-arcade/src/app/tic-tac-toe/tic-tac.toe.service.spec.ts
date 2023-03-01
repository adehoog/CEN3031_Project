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

  //Verifies that the createGame method sends a POST request to the server to create a new game and returns it.
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

  //Tests the 'getGame' function of the service by checking if it retrieves a specific game can be retrieved by its ID.
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

  //Checks if updateGame sends an HTTP PUT request to update a game on the server, and handles errors when updating a game.
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

  //Checks if updateBoard sends an HTTP PUT request to update a game on the server, and handles errors when updating a game.
  describe('updateBoard', () => {
    it('should update the game board with a valid move', () => {
      // Arrange
      const game: Game = {
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
      const move: Move = {
        row: 0,
        col: 0
      };
  
      // Act
      const updatedGame = service.updateBoard(game, move);
  
      // Assert
      expect(updatedGame.b.board[0][0]).toEqual('X');
    });
  
    it('should not update the game board with an invalid move', () => {
      // Arrange
      const game: Game = {
        b: {
          board: [
            ['X', 'O', ''],
            ['', 'O', ''],
            ['', '', 'X']
          ]
        },
        p: {
          name: 'player2',
          marker: 'O'
        }
      };
      const move: Move = {
        row: 0,
        col: 0
      };
  
      // Act
      const updatedGame = service.updateBoard(game, move);
  
      // Assert
      expect(updatedGame).toEqual(game);
    });
  });

  //Checks if the displayBoard method sends an HTTP GET request to display the board with dashes.
  describe('displayBoard', () => {
    it('should display the game board with dashes', () => {
      // Arrange
      const service = TestBed.get(TicTacToeService);
      const expectedOutput = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
      
      // Act
      service.displayBoard();
    
      // Assert
      expect(service.game.b.board).toEqual(expectedOutput);
    });
  });

  //Checks the checkifWon method and returns true if a player has won, and false if a player has not won.
  describe('checkIfWon', () => {
    it('should return true if a player has won', () => {
      const game = { b: { board: [['X', '', 'O'], ['X', 'O', ''], ['X', '', '']] }, p: { name: 'player1', marker: 'X' } };
      service['game'] = game; // Set the game object to the winning board state
      expect(service.checkIfWon()).toBeTruthy(); // Expect that a player has won
    });
  
    it('should return false if a player has not won', () => {
      const game = { b: { board: [['X', '', 'O'], ['', 'O', ''], ['', '', '']] }, p: { name: 'player1', marker: 'X' } };
      service['game'] = game; // Set the game object to a non-winning board state
      expect(service.checkIfWon()).toBeFalsy(); // Expect that a player has not won
    });
  });

  //Checks the isDraw method and returns true for a draw game board and false for a non-draw game board.
  describe('isDraw', () => {
    it('should return true for a draw game', () => {
      const game: Game = {
        b: {
          board: [
            ['X', 'O', 'X'],
            ['X', 'O', 'O'],
            ['O', 'X', 'X']
          ]
        },
        p: {
          name: 'player1',
          marker: 'X'
        }
      };
  
      expect(service.isDraw(game)).toBe(true);
    });
  
    it('should return false for a non-draw game', () => {
      const game: Game = {
        b: {
          board: [
            ['X', 'O', ''],
            ['X', 'O', 'O'],
            ['O', 'X', 'X']
          ]
        },
        p: {
          name: 'player1',
          marker: 'X'
        }
      };
  
      expect(service.isDraw(game)).toBe(false);
    });
  });

  //Checks the makeMove method by checking it it returns an Observable of Game object and sends a PUT request to update the game board with the move made by the player.
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
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });
});

//Logs the given error message to the console, and returns an observable of the given result.
describe('handleError', () => {
  it('should log the error and return an Observable of the given result', () => {
    const errorMessage = 'test error';
    const result = { data: 'test data' };
    const operation = 'test operation';
    const handleError = service.handleError(operation, result);

    const consoleSpy = spyOn(console, 'error');
    const nextSpy = jasmine.createSpy('next');
    const errorSpy = jasmine.createSpy('error');
    const completeSpy = jasmine.createSpy('complete');

    handleError(errorMessage).subscribe(nextSpy, errorSpy, completeSpy);

    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
    expect(nextSpy).toHaveBeenCalledWith(result);
    expect(errorSpy).not.toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
});