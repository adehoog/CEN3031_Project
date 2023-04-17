import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CheckersService {
    board: any[][] = [];

  selectedPiece: { row: number, col: number } | null = null;

  currentPlayer: 'red' | 'black' = 'red';

  constructor() {
    for (let i = 0; i < 8; i++) {
      this.board[i] = [];
      for (let j = 0; j < 8; j++) {
        this.board[i][j] = { piece: null };
      }
    }
  }
  

  initGame(): void {
    for (let row = 0; row < 8; row++) {
      const currentRow: any[] = [];
      for (let col = 0; col < 8; col++) {
        currentRow.push({
          row,
          col,
          isDark: row % 2 === col % 2,
          piece: this.getPieceColor(row, col) ? { color: this.getPieceColor(row, col) } : null
        });
      }
      this.board.push(currentRow);
    }
  }

  // Returns the color of the piece at the given row and column, or null if there is no piece there
  getPieceColor(row: number, col: number): string | null {
    if (row < 3 && (row + col) % 2 === 1) {
      return 'black';
    }
    if (row > 4 && (row + col) % 2 === 1) {
      return 'red';
    }
    return null;
  }

  // Handles a click on a square on the board
  onSquareClick(row: number, col: number): void {
    const { selectedPiece, currentPlayer } = this;
    //const pieceColor = selectedPiece ? selectedPiece.color : null;

    // If no piece is currently selected, check if the clicked square has a piece of the current player's color
    if (!selectedPiece) {
      const piece = this.board[row][col].piece;
      if (piece && piece.color === currentPlayer) {
        this.selectedPiece = { row, col };
      }
    }
    // If a piece is currently selected, move it to the clicked square if it's a valid move target
    else {
      const { row: sourceRow, col: sourceCol } = selectedPiece;
      this.movePiece(sourceRow, sourceCol, row, col);
    }
  }

  // Move the piece at the source square to the target square
  movePiece(sourceRow: number, sourceCol: number, targetRow: number, targetCol: number): void {
    const selectedPiece = this.board[sourceRow][sourceCol].piece;

    // Make sure the clicked square is a valid square on the board
    if (targetRow < 0 || targetRow > 7 || targetCol < 0 || targetCol > 7) {
      return;
    }

    // Make sure the move is valid
    if (!this.isValidMove(selectedPiece, sourceRow, sourceCol, targetRow, targetCol)) {
      return;
    }

    // Update the board with the new piece positions
    this.board[targetRow][targetCol].piece = selectedPiece;
    this.board[sourceRow][sourceCol].piece = null;

    // Check for a capture move
    if (Math.abs(targetRow - sourceRow) === 2 && Math.abs(targetCol - sourceCol) === 2) {
      const capturedPieceRow = (targetRow + sourceRow) / 2;
      const capturedPieceCol = (targetCol + sourceCol) / 2;
      this.board[capturedPieceRow][capturedPieceCol].piece = null;
    }

    // Deselect the piece and switch to the other player's turn
    this.selectedPiece = null;
    this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
  }

  // Returns true if the given move is valid, false otherwise
  isValidMove(selectedPiece: any, sourceRow: number, sourceCol: number, targetRow: number, targetCol: number): boolean {
    if (!selectedPiece) {
      return false;
    }

    // Make sure the target square is a valid square on the board
    if (targetRow < 0 || targetRow > 7 || targetCol < 0 || targetCol > 7) {
      return false;
    }

    // Check if the target square is already occupied by another piece
    if (this.board[targetRow][targetCol].piece) {
      return false;
    }

    // Make sure the piece is moving forward if it's not a king
    const pieceColor = selectedPiece.color;
    if (pieceColor === 'red' && targetRow >= sourceRow) {
      return false;
    }
    if (pieceColor === 'black' && targetRow <= sourceRow) {
      return false;
    }

    // Check if the move is a capture move
    if (Math.abs(targetRow - sourceRow) === 2 && Math.abs(targetCol - sourceCol) === 2) {
      const capturedPieceRow = (targetRow + sourceRow) / 2;
      const capturedPieceCol = (targetCol + sourceCol) / 2;
      const capturedPieceColor = this.getPieceColor(capturedPieceRow, capturedPieceCol);
      if (capturedPieceColor !== this.currentPlayer) {
        return false;
      }
      return true;
    }

    // Check if the move is a valid non-capture move
    if (Math.abs(targetRow - sourceRow) === 1 && Math.abs(targetCol - sourceCol) === 1) {
      return true;
    }

    // If none of the above conditions are met, the move is invalid
    return false;
  }


    // Returns true if the game is over, false otherwise
    isGameOver(): boolean {
        // Game is over if one player has no pieces left
        const redPieces = this.countPieces('red');
        const blackPieces = this.countPieces('black');
        return redPieces === 0 || blackPieces === 0;
      }
    
      // Returns the number of pieces of the given color currently on the board
      countPieces(color: string): number {
        let count = 0;
        for (let row = 0; row < 8; row++) {
          for (let col = 0; col < 8; col++) {
            const piece = this.board[row][col].piece;
            if (piece && piece.color === color) {
              count++;
            }
          }
        }
        return count;
      }
    
      // Returns the color of the current player
      getCurrentPlayerColor(): string {
        return this.currentPlayer;
      }
    
      // Resets the game to its initial state
      resetGame(): void {
        this.board = [];
        this.selectedPiece = null;
        this.currentPlayer = 'red';
        this.initGame();
      }
    }