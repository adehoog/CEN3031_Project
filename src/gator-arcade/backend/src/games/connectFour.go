package main

import (
	"fmt"
	//"math/rand"
	"strconv"
)

type player struct {
	token string
	name  string
}

type game struct {
	board [6][7]string //6 rows, 7 columns
	p1    player
	p2    player
}

func (g game) PlaceTile(col int64, p player) (bool, game) {
	if col < 0 || col > 6 {
		return false, g
	}
	for i := 5; i >= 0; i-- {
		if g.board[i][col] == "" {
			g.board[i][col] = p.token
			return true, g
		}
	}
	return false, g
}

func (g game) displayBoard() {
	for i := 5; i >= 0; i-- {
		for j := 0; j < 7; j++ {
			if g.board[i][j] == "" {
				fmt.Print("-")
			} else {
				fmt.Print(g.board[j][i])
			}
			fmt.Print(" ")
		}
		fmt.Print("\n")
	}
}

func (g game) checkIfWon() int { //1 for Red winner, 2 for Yellow, -1 for none
	winner := -1
	yConnected := 0
	rConnected := 0
	//check verticals
	for i := 0; i < 7; i++ {
		for j := 5; j >= 0; j-- {
			if g.board[j][i] == "R" {
				rConnected++
				yConnected = 0
			} else if g.board[j][i] == "Y" {
				yConnected++
				rConnected = 0
			} else if g.board[j][i] == "" {
				rConnected = 0
				yConnected = 0
				j = -1
			}
			if rConnected == 4 {
				return 1
			} else if yConnected == 4 {
				return 2
			}
		}
	}
	rConnected = 0
	yConnected = 0
	//check horiz
	for i := 0; i < 6; i++ {
		for j := 0; j < 7; j++ {
			if g.board[i][j] == "R" {
				rConnected++
				yConnected = 0
			} else if g.board[i][j] == "Y" {
				yConnected++
				rConnected = 0
			} else if g.board[i][j] == "" {
				rConnected = 0
				yConnected = 0
			}
			if rConnected == 4 {
				return 1
			}
			if yConnected == 4 {
				return 2
			}
		}
	}
	//check diag
	for i := 3; i < 6; i++ {
		for j := 0; j < 3; j++ {
			if g.board[i][j] == g.board[i-1][j+1] && g.board[i][j] == g.board[i-2][j+2] && g.board[i][j] == g.board[i-3][j+3] && g.board[i][j] != "" {
				if g.board[i][j] == "R" {
					return 1
				}
				if g.board[i][j] == "Y" {
					return 2
				}
			}
		}
	}
	for i := 3; i < 6; i++ {
		for j := 3; j < 5; j++ {
			if g.board[i][j] == g.board[i-1][j-1] && g.board[i][j] == g.board[i-2][j-2] && g.board[i][j] == g.board[i-3][j-3] && g.board[i][j] != "" {
				if g.board[i][j] == "R" {
					return 1
				}
				if g.board[i][j] == "Y" {
					return 2
				}
			}
		}
	}

	return winner
}

func (g game) runGame() int {
	//print board here
	var winner int
	var input string
	gameOver := false
	turnNum := 0
	var currP player
	for !gameOver {
		fmt.Println("Board:")
		g.displayBoard()
		fmt.Printf("Player %d, choose a column for your tile (1-7)\n", (turnNum%2)+1)
		fmt.Scanln(&input)
		col, err1 := strconv.ParseInt(input, 10, 64)
		if ((turnNum % 2) + 1) == 1 {
			currP = g.p1
		} else {
			currP = g.p2
		}
		var check bool
		check, g = g.PlaceTile(col-1, currP)
		if !check || err1 != nil {
			fmt.Printf("Sorry, that's an invalid input, Player %d.\n", (turnNum%2)+1)
			turnNum--
		} else {
			winner = g.checkIfWon()
			if winner == 1 || winner == 2 {
				gameOver = true
				g.displayBoard()
			}
		}
		turnNum++
	}
	return winner
}

func main() {
	g := game{}
	var p1Tok string
	playAgain := "Y"
	for playAgain != "N" && playAgain != "n" {
		fmt.Println("Welcome to Connect Four! Player 1, pick your token color by typing 'R' for red and 'Y' for yellow.")
		fmt.Scanln(&p1Tok)
		if p1Tok == "R" {
			g.p1.token = "R"
			g.p2.token = "Y"
		} else if p1Tok == "Y" {
			g.p1.token = "Y"
			g.p2.token = "R"
		}
		g.p1.name = "Player 1"
		g.p2.name = "Player 2"
		fmt.Println("Beginning the game now!")
		winner := g.runGame()
		if winner == 0 {
			fmt.Println("It's a tie!")
		} else {
			fmt.Printf("Player %d wins! Congrats!", winner)
		}
		fmt.Println("Play again? Y/N")
		fmt.Scanln(&playAgain)
	}

}
