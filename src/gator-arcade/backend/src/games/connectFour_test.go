package main

import (
	"testing"
	//"math/rand"
	//"strconv"
)

func TestPlaceTile_legal(t *testing.T) {
	var p1 player
	var g game
	check := false
	for i := 0; i < 6; i++ {
		check, g = g.PlaceTile(0, p1)
		if !check {
			t.Error("Legal tile Placement Test Failed")
		}
	}

}

func TestPlaceTile_illegal(t *testing.T) {
	var p1 player
	var g game
	check, g := g.PlaceTile(7, p1)
	if check {
		t.Error("Ilegal tile placement passed unexpectedly")
	}
}

func TestCheckIfWon(t *testing.T) {
	var b1 [6][7]string
	var p1, p2 player
	p1.token = "R"
	p2.token = "Y"
	var check1 bool
	g := game{b1, p1, p2}
	check1, g = g.PlaceTile(0, g.p1)
	check1, g = g.PlaceTile(1, g.p2)
	check1, g = g.PlaceTile(0, g.p1)
	check1, g = g.PlaceTile(1, g.p2)
	check1, g = g.PlaceTile(0, g.p1)
	check1, g = g.PlaceTile(1, g.p2)
	check1, g = g.PlaceTile(0, g.p1)
	if g.checkIfWon() == -1 || check1 == false {
		t.Error("Failed column win condition")
		g.displayBoard()
	}
	g = game{b1, p1, p2}
	var i int64
	for i = 0; i < 3; i++ {
		check1, g = g.PlaceTile(i, g.p1)
		check1, g = g.PlaceTile(i, g.p2)
	}
	check1, g = g.PlaceTile(3, g.p1)
	if g.checkIfWon() == -1 {
		t.Error("Failed row win condition")
		g.displayBoard()
	}
	check1, g = g.PlaceTile(0, g.p1)
	check1, g = g.PlaceTile(1, g.p2)
	check1, g = g.PlaceTile(1, g.p1)
	check1, g = g.PlaceTile(2, g.p2)
	check1, g = g.PlaceTile(3, g.p1)
	check1, g = g.PlaceTile(2, g.p2)
	check1, g = g.PlaceTile(2, g.p1)
	check1, g = g.PlaceTile(3, g.p2)
	check1, g = g.PlaceTile(3, g.p1)
	check1, g = g.PlaceTile(4, g.p2)
	check1, g = g.PlaceTile(3, g.p1)
	if g.checkIfWon() == -1 || check1 == false {
		t.Error("Failed diagonal win condition")
		g.displayBoard()
	}
}
