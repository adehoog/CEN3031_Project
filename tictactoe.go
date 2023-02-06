package main

import "fmt"

type board struct {
	board [3][3]string
}

type player struct {
	name   string
	marker string
}

type game struct {
	b board
	p player
}

func (g game) updateBoard() game {

	// Get input on which spot user selected
	// TODO: Get input from mouse
	var row int
	var col int
	fmt.Scanln(&row, &col)

	// Ensure the spot on the screen selected matches a spot on the board
	if row > 3 || row < 0 || col > 3 || col < 0 {
		fmt.Println("Error: Out of bounds")
		return g
	}
	// Now update board with respective marker as long as that spot is not taken
	if g.b.board[row][col] == "" {
		g.b.board[row][col] = g.p.marker
	} else {
		fmt.Println("Spot already taken. Please choose another spot.")
		g.updateBoard()
	}
	fmt.Println()
	return g
}

func (g game) displayBoard() {

	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if g.b.board[i][j] == "" {
				g.b.board[i][j] = "-"
			}
			fmt.Print(g.b.board[i][j])
		}
		fmt.Println()
	}
}

func (g game) checkIfWon() bool {

	/* There are only 8 possible winning combinations of tic tac toe:
	   3 consecutive horizontal, vertical, or diagonal.
	   Check if any of these are present for the current player.
	*/

	playerWon := false
	row := 0
	count := 0

	// Checking all rows for winning combinations
	for row < 3 && playerWon == false {
		currentRow := g.b.board[row]

		for i := range currentRow {
			if currentRow[i] != g.p.marker {
				break
			} else {
				count++
				if count == 3 {
					playerWon = true
					return playerWon
				}
			}
		}
		row++
		count = 0
	}

	col := 0
	count = 0
	var currentCol = [3]string{}

	// Checking all columns for winning combinations
	for col < 3 && playerWon == false {

		currentCol = [3]string{g.b.board[0][col], g.b.board[1][col], g.b.board[2][col]}

		for i := range currentCol {
			if currentCol[i] != g.p.marker {
				playerWon = false
				break
			} else {
				count++
				if count == 3 {
					playerWon = true
					return playerWon
				}
			}
		}
		col++
		count = 0
	}

	// Checking diagonals for winning combinations
	diagonalOne := [3]string{g.b.board[0][0], g.b.board[1][1], g.b.board[2][2]}
	diagonalTwo := [3]string{g.b.board[0][2], g.b.board[1][1], g.b.board[2][0]}
	count = 0

	for i := range diagonalOne {
		if diagonalOne[i] != g.p.marker {
			playerWon = false
			break
		} else {
			count++
			if count == 3 {
				playerWon = true
				return playerWon
			}
		}
	}

	count = 0
	for i := range diagonalTwo {
		if diagonalTwo[i] != g.p.marker {
			playerWon = false
			break
		} else {
			count++
			if count == 3 {
				playerWon = true
				break
			}
		}
	}
	return playerWon
}

func (g game) isDraw() bool {

	gameIsDraw := true

	// Check over entire board to see if it is full
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if g.b.board[i][j] == "" {
				gameIsDraw = false
			}
		}
	}
	return gameIsDraw
}

func tictactoe() {

	// Get input to decide Player 1 and Player 2 markers (X or O)
	var player1Input string
	fmt.Println("Player 1 - Choose your marker (Type X or O):")
	fmt.Scanln(&player1Input)
	p1 := player{name: "Player 1", marker: player1Input}
	p2 := player{name: "Player 2"}
	if p1.marker == "X" {
		p2.marker = "O"
	} else {
		p2.marker = "X"
	}

	// Player 1 will go first
	currentPlayer := player{}
	currentPlayer.name = p1.name
	currentPlayer.marker = p1.marker
	var gameOver = false

	// Initialize game with 3x3 board and the current player playing
	game := game{p: currentPlayer, b: board{board: [3][3]string{}}}
	game.displayBoard()

	for gameOver != true {

		// Ask current player to select a spot on the board
		fmt.Print(game.p.name, ": Please select a spot on the board")
		fmt.Println()

		// Get input from mouse on which spot they selected and update board with respective marker
		game = game.updateBoard()

		// Check if current player won the game
		currentPlayerWon := game.checkIfWon()
		if currentPlayerWon {

			// Display winning message and terminate game
			fmt.Println(game.p.name, "wins!")
			game.displayBoard()
			gameOver = true

		} else {

			// Check if board is full (i.e. game is a draw)
			gameIsDraw := game.isDraw()
			if gameIsDraw {

				// If so display "Game is a draw" message, display updated board, and terminate the game
				fmt.Println("Game is a draw.")
				game.displayBoard()
				gameOver = true

			} else {

				// If not, simply display updated board and switch players
				game.displayBoard()
				if game.p.name == p1.name {
					game.p.name = p2.name
					game.p.marker = p2.marker
				} else {
					game.p.name = p1.name
					game.p.marker = p1.marker
				}
			}
		}
	}
}
