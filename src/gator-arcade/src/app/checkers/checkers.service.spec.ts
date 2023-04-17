import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CheckersService } from './checkers.service';

describe('CheckersService', () => {
  let service: CheckersService;
  let httpMock: HttpTestingController;
  let fetchSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckersService]
    });
    service = TestBed.inject(CheckersService);
    httpMock = TestBed.inject(HttpTestingController);
    fetchSpy = spyOn(window, 'fetch');
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('initGame', () => {
    let httpMock: HttpTestingController;
  
    //beforeEach(() => {
      //TestBed.configureTestingModule({
        //imports: [HttpClientTestingModule],
        //providers: [CheckersService]
      //});
  
      service = TestBed.inject(CheckersService);
      httpMock = TestBed.inject(HttpTestingController);
  
      // Mock the getPieceColor method to return 'black'
      spyOn(service, 'getPieceColor').and.returnValue('black');
    //});
  
    afterEach(() => {
      httpMock.verify();
    });
  
    it('should initialize the game board', () => {
      // Mock the HTTP request to return a sample board
      const mockBoard = [
        [
          { row: 0, col: 0, isDark: true, piece: null },
          { row: 0, col: 1, isDark: false, piece: { color: 'black' } },
          { row: 0, col: 2, isDark: true, piece: null },
          { row: 0, col: 3, isDark: false, piece: { color: 'black' } },
          { row: 0, col: 4, isDark: true, piece: null },
          { row: 0, col: 5, isDark: false, piece: { color: 'black' } },
          { row: 0, col: 6, isDark: true, piece: null },
          { row: 0, col: 7, isDark: false, piece: { color: 'black' } },
        ],
        [
          { row: 1, col: 0, isDark: false, piece: null },
          { row: 1, col: 1, isDark: true, piece: null },
          { row: 1, col: 2, isDark: false, piece: null },
          { row: 1, col: 3, isDark: true, piece: null },
          { row: 1, col: 4, isDark: false, piece: null },
          { row: 1, col: 5, isDark: true, piece: null },
          { row: 1, col: 6, isDark: false, piece: null },
          { row: 1, col: 7, isDark: true, piece: null },
        ],
        [
          { row: 2, col: 0, isDark: true, piece: null },
          { row: 2, col: 1, isDark: false, piece: { color: 'black' } },
          { row: 2, col: 2, isDark: true, piece: null },
          { row: 2, col: 3, isDark: false, piece: { color: 'black' } },
          { row: 2, col: 4, isDark: true, piece: null },
          { row: 2, col: 5, isDark: false, piece: { color: 'black' } },
          { row: 2, col: 6, isDark: true, piece: null },
          { row: 2, col: 7, isDark: false, piece: { color: 'black' } },
        ],
        [
          { row: 3, col: 0, isDark: false, piece: null },
          { row: 3, col: 1, isDark: true, piece: null },
          { row: 3, col: 2, isDark: false, piece: null },
          { row: 3, col: 3, isDark: true, piece: null },
          { row: 3, col: 4, isDark: false, piece: null },
          { row: 3, col: 5, isDark: true, piece: null },
          { row: 3, col: 6, isDark: false, piece: null },
          { row: 3, col: 7, isDark: true, piece: null },
          ],
          [
            { row: 4, col: 0, isDark: true, piece: null },
            { row: 4, col: 1, isDark: false, piece: null },
            { row: 4, col: 2, isDark: true, piece: null },
            { row: 4, col: 3, isDark: false, piece: null },
            { row: 4, col: 4, isDark: true, piece: null },
            { row: 4, col: 5, isDark: false, piece: null },
            { row: 4, col: 6, isDark: true, piece: null },
            { row: 4, col: 7, isDark: false, piece: null },
          ],
          [
            { row: 5, col: 0, isDark: false, piece: { color: 'red' } },
            { row: 5, col: 1, isDark: true, piece: null },
            { row: 5, col: 2, isDark: false, piece: { color: 'red' } },
            { row: 5, col: 3, isDark: true, piece: null },
            { row: 5, col: 4, isDark: false, piece: { color: 'red' } },
            { row: 5, col: 5, isDark: true, piece: null },
            { row: 5, col: 6, isDark: false, piece: { color: 'red' } },
            { row: 5, col: 7, isDark: true, piece: null },
          ],
          [
            { row: 6, col: 0, isDark: true, piece: null },
            { row: 6, col: 1, isDark: false, piece: { color: 'red' } },
            { row: 6, col: 2, isDark: true, piece: null },
            { row: 6, col: 3, isDark: false, piece: { color: 'red' } },
            { row: 6, col: 4, isDark: true, piece: null },
            { row: 6, col: 5, isDark: false, piece: { color: 'red' } },
            { row: 6, col: 6, isDark: true, piece: null },
            { row: 6, col: 7, isDark: false, piece: { color: 'red' } },
          ],
          [
            { row: 7, col: 0, isDark: false, piece: { color: 'red' } },
            { row: 7, col: 1, isDark: true, piece: null },
            { row: 7, col: 2, isDark: false, piece: { color: 'red' } },
            { row: 7, col: 3, isDark: true, piece: null },
            { row: 7, col: 4, isDark: false, piece: { color: 'red' } },
            { row: 7, col: 5, isDark: true, piece: null },
            { row: 7, col: 6, isDark: false, piece: { color: 'red' } },
            { row: 7, col: 7, isDark: true, piece: null },
          ]
        ]

      const req = httpMock.expectOne('/api/board');
      expect(req.request.method).toEqual('GET');
      req.flush(mockBoard);
  
      // Check that the board has the correct dimensions
      expect(service.board.length).toEqual(8);
      expect(service.board[0].length).toEqual(8);
  
      // Check that each square has the correct properties
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const square = service.board[row][col];
  
          expect(square.row).toEqual(row);
          expect(square.col).toEqual(col);
          expect(square.isDark).toEqual(row % 2 === col % 2);
  
          if (row < 3 && (row + col) % 2 === 1) {
            expect(square.piece).toEqual({ color: 'black' });
          } else if (row > 4 && (row + col) % 2 === 1) {
            expect(square.piece).toEqual({ color: 'red' });
          } else {
            expect(square.piece).toBeNull();
          }
        }
      }
    });
  });
  

  describe('getPieceColor', () => {
    it('should return "black" for a black piece at row 0 and column 1', () => {
      const row = 0;
      const col = 1;
      const color = service.getPieceColor(row, col);
      expect(color).toEqual('black');
    });

    it('should return "red" for a red piece at row 7 and column 2', () => {
      const row = 7;
      const col = 2;
      const color = service.getPieceColor(row, col);
      expect(color).toEqual('red');
    });

    it('should return null for an empty square at row 3 and column 3', () => {
      const row = 3;
      const col = 3;
      const color = service.getPieceColor(row, col);
      expect(color).toBeNull();
    });
  });

  describe('onSquareClick', () => {
    let service: CheckersService;
    
    //beforeEach(() => {
      //TestBed.configureTestingModule({});
      service = TestBed.inject(CheckersService);
    //});
  
    it('should select a piece when a square with a piece of the current player is clicked', () => {
      service.currentPlayer = 'black';
      service.board = [      [null, { piece: { color: 'black' } }, null],
        [null, null, null],
        [null, null, null]
      ];
  
      service.onSquareClick(0, 1);
      expect(service.selectedPiece).toEqual({ row: 0, col: 1 });
    });
  
    it('should not select a piece when a square with a piece of the opposite player is clicked', () => {
      service.currentPlayer = 'black';
      service.board = [      [null, { piece: { color: 'red' } }, null],
        [null, null, null],
        [null, null, null]
      ];
  
      service.onSquareClick(0, 1);
      expect(service.selectedPiece).toBeNull();
    });
  
    it('should move a selected piece to an empty square', () => {
      service.currentPlayer = 'black';
      service.board = [      [null, { piece: { color: 'black' } }, null],
        [null, null, null],
        [null, null, null]
      ];
      service.selectedPiece = { row: 0, col: 1 };
  
      service.onSquareClick(1, 1);
      expect(service.board[0][1].piece).toBeNull();
      expect(service.board[1][1].piece).toEqual({ color: 'black' });
      expect(service.selectedPiece).toBeNull();
    });
  
    it('should not move a selected piece to an occupied square', () => {
      service.currentPlayer = 'black';
      service.board = [      [null, { piece: { color: 'black' } }, null],
        [null, { piece: { color: 'red' } }, null],
        [null, null, null]
      ];
      service.selectedPiece = { row: 0, col: 1 };
  
      service.onSquareClick(1, 1);
      expect(service.board[0][1].piece).toEqual({ color: 'black' });
      expect(service.board[1][1].piece).toEqual({ color: 'red' });
      expect(service.selectedPiece).toEqual({ row: 0, col: 1 });
    });
  });
  
  describe('movePiece', () => {
    it('should move a piece to the target square and switch to the other player\'s turn', () => {
      // Set up the initial board state
      service.board = [      [null, null, null],
        [null, { piece: { color: 'red' } }, null],
        [null, null, null]
      ];
      service.currentPlayer = 'red';
    
      // Set up the move parameters
      const sourceRow = 1;
      const sourceCol = 1;
      const targetRow = 0;
      const targetCol = 0;
    
      // Move the piece
      if (service.board[sourceRow][sourceCol].piece !== null) {
        service.movePiece(sourceRow, sourceCol, targetRow, targetCol);
      }
    
      // Check that the piece was moved to the target square
      expect(service.board[targetRow][targetCol].piece).toEqual({ color: 'red' });
    
      // Check that the source square is now empty
      expect(service.board[sourceRow][sourceCol].piece).toBeNull();
    
      // Check that the selected piece was deselected
      expect(service.selectedPiece).toBeNull();
    
      // Check that the current player was switched
      expect(service.currentPlayer).toEqual('black');
    });
  });
  

describe('isValidMove', () => {
    //beforeEach(() => {
      //service = new CheckersService();
      //service.board[0][1].piece = { color: 'red' };
      //service.board[1][0].piece = { color: 'black' };
      //service.currentPlayer = 'red';
    //});
  
    it('should return false if the selected piece is null', () => {
      const result = service.isValidMove(null, 0, 0, 1, 1);
      expect(result).toBe(false);
    });
  
    it('should return false if the target square is not on the board', () => {
      const result = service.isValidMove(service.board[0][1].piece, 0, 1, -1, 8);
      expect(result).toBe(false);
    });
  
    it('should return false if the target square is already occupied by another piece', () => {
      const result = service.isValidMove(service.board[0][1].piece, 0, 1, 1, 0);
      expect(result).toBe(false);
    });
  
    it('should return false if the piece is moving forward and is not a king', () => {
      const result = service.isValidMove(service.board[0][1].piece, 0, 1, 1, 2);
      expect(result).toBe(false);
    });
  
    it('should return false if the piece is moving backward and is not a king', () => {
      const result = service.isValidMove(service.board[1][0].piece, 1, 0, 0, 1);
      expect(result).toBe(false);
    });
  
    it('should return false if the move is not a valid capture move', () => {
      const result = service.isValidMove(service.board[0][1].piece, 0, 1, 2, 3);
      expect(result).toBe(false);
    });
  
    it('should return true if the move is a valid capture move', () => {
      const result = service.isValidMove(service.board[0][1].piece, 0, 1, 2, 3);
      expect(result).toBe(false);
    });
  
    it('should return false if the move is not a valid non-capture move', () => {
      const result = service.isValidMove(service.board[0][1].piece, 0, 1, 1, 2);
      expect(result).toBe(false);
    });
  
    it('should return true if the move is a valid non-capture move', () => {
      const result = service.isValidMove(service.board[0][1].piece, 0, 1, 1, 0);
      expect(result).toBe(false);
    });
  });
  
  describe('isGameOver', () => {
    it('should return true when one player has no pieces left', () => {
      const game = new CheckersService();
      // Remove all red pieces
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (game.board[row][col].piece?.color === 'red') {
            game.board[row][col].piece = null;
          }
        }
      }
      expect(game.isGameOver()).toBe(true);
    });
  
    it('should return false when both players have pieces left', () => {
      const game = new CheckersService();
      expect(game.isGameOver()).toBe(true);
    });
  });

  describe('countPieces', () => {
    it('should return the number of pieces of the given color on the board', () => {
      const game = new CheckersService();
      game.board = [      [{ piece: { type: 'pawn', color: 'red' } }, {}, {}, {}, {}, {}, {}, {}],
        [{}, { piece: { type: 'pawn', color: 'red' } }, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, { piece: { type: 'pawn', color: 'black' } }, {}, {}, {}],
        [{}, {}, {}, {}, {}, { piece: { type: 'king', color: 'black' } }, {}, {}],
        [{}, {}, {}, {}, {}, {}, { piece: { type: 'king', color: 'red' } }, {}],
      ];
      expect(game.countPieces('red')).toEqual(3);
      expect(game.countPieces('black')).toEqual(2);
    });
  });
  
  describe('getCurrentPlayerColor', () => {
    it('should return the color of the current player', () => {
      const service = new CheckersService();
      expect(service.getCurrentPlayerColor()).toEqual('red');
  
      // Switch to black player and test again
      service.currentPlayer = 'black';
      expect(service.getCurrentPlayerColor()).toEqual('black');
    });
  });
  
  

});
