package main

import (
	"testing"

	"github.com/emirpasic/gods/stacks/arraystack"
)

func TestHandleTie_DepthOne(t *testing.T) {
	p1 := player{*arraystack.New(), 0, *arraystack.New()}
	p2 := player{*arraystack.New(), 0, *arraystack.New()}
	ptr1 := &p1
	ptr2 := &p2
	expected := 1
	ptr1.hand.Push(card{"Spades", 14, "Ace"})
	ptr2.hand.Push(card{"Clubs", 2, "Two"})
	for i := 0; i < 3; i++ {
		ptr1.hand.Push(card{})
		ptr2.hand.Push(card{})
	}
	ptr1.hand.Push(card{"Diamonds", 13, "King"})
	ptr2.hand.Push(card{"Hearts", 13, "King"})
	g := game{deck{}, *ptr1, *ptr2}
	result := g.draw()
	if result != expected {
		t.Errorf("Expected result does not match actual result in handleTie with depth = 1\n")
	} else {
		if g.p1.numCards != 10 || g.p2.numCards != 0 {
			t.Errorf("Error in handleTie depth = 1. Players' card counts do not match expected values. Expected: 10, 0. Actual: %d, %d.\n", g.p1.numCards, g.p2.numCards)
		}
	}
}

func TestHandleTie_DepthTwo(t *testing.T) {
	p1 := player{*arraystack.New(), 0, *arraystack.New()}
	p2 := player{*arraystack.New(), 0, *arraystack.New()}
	expected := 1
	p1.hand.Push(card{"Spades", 14, "Ace"})
	p2.hand.Push(card{"Clubs", 2, "Two"})
	for i := 0; i < 3; i++ {
		p1.hand.Push(card{})
		p2.hand.Push(card{})
	}
	p1.hand.Push(card{"Spades", 3, "Three"})
	p2.hand.Push(card{"Clubs", 3, "Three"})
	for j := 0; j < 3; j++ {
		p1.hand.Push(card{})
		p2.hand.Push(card{})
	}
	p1.hand.Push(card{"Diamonds", 13, "King"})
	p2.hand.Push(card{"Hearts", 13, "King"})
	p1.numCards = p1.hand.Size()
	p2.numCards = p2.hand.Size()
	g := game{deck{}, p1, p2}
	result := g.draw()
	if result != expected {
		t.Errorf("Expected result does not match actual result in handleTie with depth = 2\n")
	} else if g.p1.numCards != 18 || g.p2.numCards != 0 {
		t.Errorf("Error in handleTie depth = 2. Players' card counts do not match expected values. Expected: 8, 0. Actual: %d, %d.\n", g.p1.numCards, g.p2.numCards)
	}
}

func TestPlayGame_Draw(t *testing.T) {
	p1 := player{*arraystack.New(), 0, *arraystack.New()}
	p2 := player{*arraystack.New(), 0, *arraystack.New()}
	var d deck
	var tempSuit string
	for i := 0; i < 4; i++ {
		switch i % 4 {
		case 0:
			tempSuit = "Hearts"
		case 1:
			tempSuit = "Diamonds"
		case 2:
			tempSuit = "Clubs"
		case 3:
			tempSuit = "Spades"
		}
		for j := 0; j < 13; j++ {
			temp := card{}
			temp.suit = tempSuit
			temp.val = j % 13
			switch j % 13 {
			case 1:
				temp.name = "Ace"
				temp.val = 14
			case 2:
				temp.name = "Two"
			case 3:
				temp.name = "Three"
			case 4:
				temp.name = "Four"
			case 5:
				temp.name = "Five"
			case 6:
				temp.name = "Six"
			case 7:
				temp.name = "Seven"
			case 8:
				temp.name = "Eight"
			case 9:
				temp.name = "Nine"
			case 10:
				temp.name = "Ten"
			case 11:
				temp.name = "Jack"
			case 12:
				temp.name = "Queen"
			case 0:
				temp.name = "King"
				temp.val = 13
			}
			if temp.suit == "Hearts" || temp.suit == "Diamonds" {
				p1.hand.Push(temp)
			} else {
				p2.hand.Push(temp)
			}
			d.d_[i] = temp
		}
	}
	p1.numCards = p1.hand.Size()
	p2.numCards = p2.hand.Size()
	g := game{d, p1, p2}
	rWinner := g.draw()
	if g.p1.numCards != g.p2.numCards || rWinner != 0 {
		t.Errorf("Error in playGame_Draw_Test: Card numbers not equal after 5000 rounds. Expected 26, 26, found %d %d\n", g.p1.numCards, g.p2.numCards)
	}
}

func TestInitDeck_WinnerHasAllCards(t *testing.T) {
	var cards [4][13]int
	var won player
	p1 := player{*arraystack.New(), 0, *arraystack.New()}
	p2 := player{*arraystack.New(), 0, *arraystack.New()}
	ptr1 := &p1
	ptr2 := &p2
	var d deck
	var s int
	g := game{d, *ptr1, *ptr2}
	ptrG := &g
	won = g.InitDeck(&ptrG.d)
	for i := 0; i < won.numCards; i++ {
		x, b := won.hand.Peek()
		if !b {
			won.hand = won.newHand
			x, b = won.hand.Peek()
			if !b {
				t.FailNow()
			}
		}
		c := x.(card)
		switch c.suit {
		case "Hearts":
			s = 0
		case "Spades":
			s = 1
		case "Diamonds":
			s = 2
		case "Clubs":
			s = 3
		}
		x, b = won.hand.Pop()
		c = x.(card)
		if !b {
			break
		}
		switch c.val {
		case 14:
			cards[s][0] = 1
		case 0:
		default:
			cards[s][c.val-1] = 1
		}
	}
	x := ptr1.numCards + ptr2.numCards
	if x == 52 {
		return
	}
	if won.numCards != 52 {
		t.Errorf("Card leakage found in winner's hand\n")
	}
	for i := 0; i < 4; i++ {
		for j := 0; j < 13; j++ {
			if cards[i][j] != 1 {
				t.Errorf("Quantity of card %d of suit %d incorrect. Expected 1, found %d", j+1, i, cards[i][j])
			}
		}
	}
}
