import { TestBed } from '@angular/core/testing';

import { ConnectFourService } from './connect-four.service';


describe('ConnectFourService', () => {
  let service: ConnectFourService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectFourService],
    });
    service = TestBed.inject(ConnectFourService);
    service.board = [    ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ];
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial board with empty slots', () => {
    const board = service.board;
    expect(board.length).toEqual(6);
    expect(board[0].length).toEqual(7);
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        expect(board[i][j]).toEqual('');
      }
    }
  });

  it('should switch players after each move', () => {
    service.currentPlayer = 'r';
    service.makeMove(0, 0);
    expect(service.currentPlayer).toEqual('y');
    service.makeMove(0, 1);
    expect(service.currentPlayer).toEqual('r');
  });

  it('should change the color after each move', () => {
    service.currentColor = 'white';
    service.makeMove(0, 0);
    expect(service.currentColor).toEqual('red');
    service.makeMove(0, 1);
    expect(service.currentColor).toEqual('yellow');
  });

  it('should detect horizontal win', () => {
    service.board = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ];
    service.currentPlayer = 'r';
    service.makeMove(0, 0);
    expect(service.hasWon).toEqual(false);
    service.makeMove(0, 1);
    expect(service.hasWon).toEqual(false);
    service.makeMove(0, 2);
    expect(service.hasWon).toEqual(false);
    service.makeMove(0, 3);
    expect(service.hasWon).toEqual(false);
    expect(service.gameState).toEqual('IN PROGRESS');
    expect(service.winner).toEqual('');
  });

  it('should detect vertical win', () => {
    service.board = [
      ['y', '', '', '', '', '', ''],
      ['y', '', '', '', '', '', ''],
      ['y', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ];
    service.currentPlayer = 'y';
    service.makeMove(3, 0);
    expect(service.hasWon).toEqual(true);
    expect(service.gameState).toEqual('WIN');
    expect(service.winner).toEqual('y');
  });

  it('should detect diagonal win from top-left to bottom-right', () => {
    service.board = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', 'y', '', '', '', ''],
      ['', '', '', 'y', '', '', ''],
      ['', '', '', '', 'y', '', ''],
      ['', '', '', '', '', '', '']
    ];
    service.currentPlayer = 'y';
    service.makeMove(2, 2);
    expect(service.hasWon).toEqual(false);
    expect(service.gameState).toEqual('IN PROGRESS');
    expect(service.winner).toEqual('');
  });

  it('should detect diagonal win from bottom-left to top-right', () => {
    service.board = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', 'r', '', '', '', ''],
    ['', '', '', 'r', '', '', ''],
    ['', '', '', '', 'r', '', ''],
    ['', '', '', '', '', '', '']
    ];
    service.currentPlayer = 'r';
    service.makeMove(3, 0);
    expect(service.hasWon).toEqual(false);
    expect(service.gameState).toEqual('IN PROGRESS');
    expect(service.winner).toEqual('');
    });
    
    it('should detect a tie', () => {
    service.board = [
    ['r', 'y', 'r', 'y', 'r', 'y', 'r'],
    ['r', 'y', 'r', 'y', 'r', 'y', 'r'],
    ['y', 'r', 'y', 'r', 'y', 'r', 'y'],
    ['y', 'r', 'y', 'r', 'y', 'r', 'y'],
    ['r', 'y', 'r', 'y', 'r', 'y', 'r'],
    ['r', 'y', 'r', 'y', 'r', 'y', 'r']
    ];
    service.checkWin();
    expect(service.isTied).toEqual(true);
    expect(service.gameState).toEqual('TIE');
    });
    
    it('should reset game state', () => {
    service.currentPlayer = 'y';
    service.currentColor = 'red';
    service.hasWon = true;
    service.hasLost = true;
    service.isTied = true;
    service.winner = 'r';
    service.gameState = 'WIN';
    service.board[0][0] = 'r';
    service.reset();
    expect(service.currentPlayer).toEqual('r');
    expect(service.currentColor).toEqual('white');
    expect(service.hasWon).toEqual(false);
    expect(service.hasLost).toEqual(false);
    expect(service.isTied).toEqual(false);
    expect(service.winner).toEqual('');
    expect(service.gameState).toEqual('IN PROGRESS');
    expect(service.board[0][0]).toEqual('');
    });

    describe('makeMove', () => {
        it('should update board with player marker and switch player on valid move', () => {
          // Make a valid move
          service.makeMove(0, 0);
    
          // Check that board has been updated with player marker
          expect(service.board[0][0]).toEqual(service.currentPlayer);
    
          // Check that player has been switched
          expect(service.currentPlayer).not.toEqual('r');
    
          // Check that current color has been switched
          expect(service.currentColor).not.toEqual('white');
        });
    
        it('should not update board on invalid move and not switch player', () => {
          // Make a valid move
          service.makeMove(0, 0);
    
          // Attempt to make another move on the same spot
          service.makeMove(0, 0);
    
          // Check that board has not been updated with player marker
          expect(service.board[0][0]).toEqual(service.currentPlayer === 'r' ? 'y' : 'r');
    
          // Check that player has not been switched
          expect(service.currentPlayer).toEqual(service.currentPlayer === 'y' ? 'y' : 'r');
    
          // Check that current color has not been switched
          expect(service.currentColor).toEqual(service.currentColor === 'yellow' ? 'yellow' : 'red');
        });
    
        it('should not update board on out of bounds move and not switch player', () => {
          // Make an out of bounds move
          service.makeMove(-1, 0);
    
          // Check that board has not been updated with player marker
          expect(service.board[0][0]).toEqual('');
    
          // Check that player has not been switched
          expect(service.currentPlayer).toEqual('r');
    
          // Check that current color has not been switched
          expect(service.currentColor).toEqual('white');
        });
      });

      describe('checkWin', () => {
        let service: ConnectFourService;
      
        it('should detect a horizontal win', () => {
          service.board = [      ['r', 'r', 'r', 'r', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '']
          ];
          service.currentPlayer = 'r';
          service.checkWin();
          expect(service.hasWon).toEqual(true);
          expect(service.gameState).toEqual('WIN');
          expect(service.winner).toEqual('r');
        });
      
        it('should detect a vertical win', () => {
          service.board = [      ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', 'y', 'y', 'y', 'y', '', '']
          ];
          service.currentPlayer = 'y';
          service.checkWin();
          expect(service.hasWon).toEqual(true);
          expect(service.gameState).toEqual('WIN');
          expect(service.winner).toEqual('y');
        });
      
        it('should detect a diagonal win from top-left to bottom-right', () => {
          service.board = [      ['y', '', '', '', '', '', ''],
            ['', 'y', '', '', '', '', ''],
            ['', '', 'y', '', '', '', ''],
            ['', '', '', 'y', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '']
          ];
          service.currentPlayer = 'y';
          service.checkWin();
          expect(service.hasWon).toEqual(true);
          expect(service.gameState).toEqual('WIN');
          expect(service.winner).toEqual('y');
        });
      
        it('should detect a diagonal win from bottom-left to top-right', () => {
          service.board = [      ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['y', '', '', '', '', '', ''],
            ['', 'y', '', '', '', '', ''],
            ['', '', 'y', '', '', '', ''],
            ['', '', '', '', '', '', '']
          ];
          service.currentPlayer = 'y';
          service.checkWin();
          expect(service.hasWon).toEqual(true);
          expect(service.gameState).toEqual('WIN');
          expect(service.winner).toEqual('y');
        });
      
        it('should detect a tie', () => {
          service.board = [      ['r', 'y', 'r', 'y', 'r', 'y', 'r'],
            ['r', 'y', 'r', 'y', 'r', 'y', 'r'],
            ['y', 'r', 'y', 'r', 'y', 'r', 'y'],
            ['y', 'r', 'y', 'r', 'y', 'r', 'y'],
            ['r', 'y', 'r', 'y', 'r', 'y', 'r'],
            ['r', 'y', 'r', 'y', 'r', 'y', 'r']
          ];
          service.currentPlayer = 'r';
          service.checkWin();
          expect(service.isTied).toEqual(true);
          expect(service.gameState).toEqual('TIE');
        });
      });
      
      describe('reset()', () => {
        let service: ConnectFourService;
      
        it('should reset the board to an empty state', () => {
          // Make some moves on the board
          service.makeMove(0, 0);
          service.makeMove(0, 1);
          service.makeMove(1, 0);
          service.makeMove(1, 1);
      
          // Reset the game state
          service.reset();
      
          // Verify that the board is now empty
          const board = service.board;
          expect(board.length).toEqual(6);
          expect(board[0].length).toEqual(7);
          for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
              expect(board[i][j]).toEqual('');
            }
          }
        });
      
        it('should reset the player and color to the initial state', () => {
          // Make some moves and changes to the player/color
          service.currentPlayer = 'y';
          service.currentColor = 'red';
          service.makeMove(0, 0);
          service.makeMove(0, 1);
          service.currentPlayer = 'y';
          service.currentColor = 'yellow';
          service.makeMove(1, 0);
          service.makeMove(1, 1);
      
          // Reset the game state
          service.reset();
      
          // Verify that the player and color are now reset to the initial state
          expect(service.currentPlayer).toEqual('r');
          expect(service.currentColor).toEqual('white');
        });
      
        it('should reset the game state to IN PROGRESS', () => {
          // Make some moves and change the game state
          service.makeMove(0, 0);
          service.hasWon = true;
          service.gameState = 'WIN';
      
          // Reset the game state
          service.reset();
      
          // Verify that the game state is now reset to IN PROGRESS
          expect(service.hasWon).toEqual(false);
          expect(service.gameState).toEqual('IN PROGRESS');
          expect(service.winner).toEqual('');
        });
      });
      

    });

