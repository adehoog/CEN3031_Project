package main

import (
	"testing"
)

func TestDisplayBoard(t *testing.T) {

	p1 := player{name: "Player 1", marker: "X"}
	g := game{p: p1, b: board{board: [3][3]string{}}}

	g.displayBoard()
}

func TestUpdateBoard(t *testing.T) {

	p1 := player{name: "Player 1", marker: "X"}
	g := game{p: p1, b: board{board: [3][3]string{}}}
	g.b.board[0][0] = "X"

	g1 := game{p: p1, b: board{board: [3][3]string{}}}
	g1 = g1.updateBoard(0, 0)
	g1.displayBoard()

	if g1 != g {
		t.Errorf("Expected result does not match output")
	}
}

func TestCheckIfWon(t *testing.T) {

	p1 := player{name: "Player 1", marker: "X"}
	g := game{p: p1, b: board{board: [3][3]string{}}}
	g.b.board[0][0] = "X"
	g.b.board[1][1] = "X"
	g.b.board[2][2] = "X"
	expected := true
	g.displayBoard()

	result := g.checkIfWon()
	if result != expected {
		t.Errorf("Expected result true does not match actual result false")
	}
}

func TestIsDraw(t *testing.T) {

	p1 := player{name: "Player 1", marker: "X"}
	g := game{p: p1, b: board{board: [3][3]string{}}}
	g.b.board[0][0] = "X"
	g.b.board[0][1] = "X"
	g.b.board[0][2] = "O"
	g.b.board[1][0] = "O"
	g.b.board[1][1] = "O"
	g.b.board[1][2] = "X"
	g.b.board[2][0] = "X"
	g.b.board[2][1] = "O"
	g.b.board[2][2] = "X"
	g.displayBoard()
	expected := true

	result := g.isDraw()
	if result != expected {
		t.Errorf("Expected result true does not match actual result false")
	}
}
