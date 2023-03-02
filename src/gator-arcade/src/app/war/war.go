package main

import (
	"fmt"
	"math"
	"math/rand"

	"github.com/emirpasic/gods/stacks/arraystack"
)

type card struct {
	suit string
	val  int
	name string
}

type deck struct {
	d_ [52]card
}

type player struct {
	hand     arraystack.Stack
	numCards int
	newHand  arraystack.Stack
}

type game struct {
	d      deck
	p1, p2 player
}

func (g *game) HandleTie() int {
	pot1 := [3]card{}
	pot2 := [3]card{}
	var t1, t2 interface{}
	var temp1, temp2 card
	var b1, b2 bool
	fmt.Println("It's a tie! Drawing 3 cards each...")
	for i := 0; i < 3; i++ {
		t1, b1 = g.p1.hand.Peek()
		t2, b2 = g.p2.hand.Peek()
		if b1 && b2 {
			g.p1.hand.Pop()
			g.p2.hand.Pop()
			g.p1.numCards--
			g.p2.numCards--
		} else if b1 {
			//p2 hand is empty
			g.p1.hand.Pop()
			if g.p2.newHand.Empty() { //no cards left for p2
				for j := 0; j < i; j++ {
					g.p1.newHand.Push(pot1[j])
					g.p1.newHand.Push(pot2[j])
					g.p1.numCards += 2
				}
				return 1
			} else {
				g.p2.hand = g.p2.newHand
				g.p2.newHand = *arraystack.New()
				t2, b2 = g.p2.hand.Pop()
			}

		} else if b2 {
			//p1 hand empty
			g.p2.hand.Pop()
			if g.p1.newHand.Empty() {
				for j := 0; j < i; j++ {
					g.p2.newHand.Push(pot1[j])
					g.p2.newHand.Push(pot2[j])
					g.p2.numCards += 2
				}
				return 2
			} else {
				g.p1.hand = g.p1.newHand
				g.p1.newHand = *arraystack.New()
				t1, b1 = g.p1.hand.Pop()
			}
		} else {
			//both empty
			if i == 0 {
				return 0
			}
			if pot1[i-1].val > pot2[i-1].val {
				for j := 0; j < i; j++ {
					g.p1.newHand.Push(pot1[j])
					g.p1.newHand.Push(pot2[j])
					g.p1.numCards += 2
				}
				return 1
			} else if pot2[i-1].val > pot1[i-1].val {
				for j := 0; j < i; j++ {
					g.p2.newHand.Push(pot1[j])
					g.p2.newHand.Push(pot2[j])
					g.p2.numCards += 2
				}
				return 2
			} else {
				return 0
			}
		}
		temp1 = t1.(card)
		temp2 = t2.(card)
		pot1[i] = temp1
		pot2[i] = temp2
	}
	j := g.draw()
	if j == 0 {
		k := g.HandleTie()
		for i := 0; i < 3; i++ {
			if k == 1 {
				g.p1.newHand.Push(pot1[i])
				g.p1.newHand.Push(pot2[i])
				g.p1.numCards += 2
				fmt.Printf("")
			}
			if k == 2 {
				g.p2.newHand.Push(pot2[i])
				g.p2.newHand.Push(pot1[i])
				g.p2.numCards += 2
			}
		}
		return k
	}
	if j == 1 {
		fmt.Println("Congrats, Player 1! You won/saved the following cards:")
		i_ := (int)(math.Min((float64)(len(pot1)), (float64)(len(pot2))))

		for i := 0; i < i_; i++ {
			g.p1.newHand.Push(pot1[i])
			g.p1.newHand.Push(pot2[i])
			g.p1.numCards += 2
			fmt.Printf(pot1[i].name + " of " + pot1[i].suit + "\n")
			fmt.Printf(pot2[i].name + " of " + pot2[i].suit + "\n")
		}
		return j
	}
	if j == 2 {
		fmt.Println("Congrats, Player 2! You won/saved the following cards:")
		i_ := (int)(math.Min((float64)(len(pot1)), (float64)(len(pot2))))
		for i := 0; i < i_; i++ {
			g.p2.newHand.Push(pot2[i])
			g.p2.newHand.Push(pot1[i])
			g.p2.numCards += 2
			fmt.Printf(pot1[i].name + " of " + pot1[i].suit + "\n")
			fmt.Printf(pot2[i].name + " of " + pot2[i].suit + "\n")
		}
		return j
	}
	return -1
}

func (g game) InitDeck(d *deck) player {
	var tempSuit string
	for i := 0; i < 52; i++ {
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
		temp := card{}
		temp.suit = tempSuit
		temp.val = i % 13
		switch i % 13 {
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
		g.d.d_[i] = temp
	}
	return g.InitHands()
}

func (g game) InitHands() player { //Fisher-Yates Shuffle algorithm
	var r int
	var temp card
	for i := 51; i > 0; i-- {
		r = rand.Intn(i)
		temp = g.d.d_[r]
		g.d.d_[r] = g.d.d_[i]
		g.d.d_[i] = temp
	}
	g.p1.hand = *arraystack.New()
	g.p2.hand = *arraystack.New()
	g.p1.newHand = *arraystack.New()
	g.p2.newHand = *arraystack.New()
	for i := 0; i < 52; i++ {
		if i%2 == 0 {
			g.p1.hand.Push(g.d.d_[i])
		}
		if i%2 == 1 {
			g.p2.hand.Push(g.d.d_[i])
		}
	}
	g.p1.numCards = 26
	if g.p1.hand.Size() != 26 {
		return player{}
	}
	g.p2.numCards = 26
	return g.PlayGame()
}

func (g *game) draw() int { //return num of player who won
	var retval int
	fmt.Printf("Drawing...\n")
	//card1:= card{}
	card1, _1 := g.p1.hand.Pop()
	card2, _2 := g.p2.hand.Pop()
	if !_1 {
		g.p1.hand = g.p1.newHand
		g.p1.newHand = *arraystack.New()
		card1, _1 = g.p1.hand.Pop()
		if !_1 {
			g.p2.hand.Push(card2.(card))
			return 2
		}
	}
	if !_2 {
		g.p2.hand = g.p2.newHand
		g.p2.newHand = *arraystack.New()
		card2, _2 = g.p2.hand.Pop()
		if !_2 {
			g.p1.hand.Push(card1.(card))
			return 1
		}
	}
	v1 := card1.(card).val
	v2 := card2.(card).val
	fmt.Println("Player 1 draws a " + card1.(card).name + " of " + card1.(card).suit + ".")
	fmt.Println("Player 2 draws a " + card2.(card).name + " of " + card2.(card).suit + ".")
	if v1 > v2 {
		retval = 1
		g.p1.newHand.Push(card1.(card))
		g.p1.newHand.Push(card2.(card))
		fmt.Println("Player 1 wins this round!")
	}
	if v1 < v2 {
		retval = 2
		g.p2.newHand.Push(card1.(card))
		g.p2.newHand.Push(card2.(card))
		fmt.Println("Player 2 wins this round!")
	}
	if v1 == v2 {
		retval = g.HandleTie()
		if retval == 1 {
			g.p1.newHand.Push(card1.(card))
			g.p1.newHand.Push(card2.(card))
		} else if retval == 2 {
			g.p2.newHand.Push(card1.(card))
			g.p2.newHand.Push(card2.(card))
		} else {
			g.p1.newHand.Push(v1)
			g.p2.newHand.Push(v2)
		}
	}
	g.p1.numCards = g.p1.hand.Size() + g.p1.newHand.Size()
	g.p2.numCards = g.p2.hand.Size() + g.p2.newHand.Size()
	return retval
}

func (g game) PlayGame() player {
	fmt.Println("Beginning the game now!")
	roundNum := 0
	gameOver := false
	var rWinner int
	for !gameOver {
		roundNum++
		rWinner = g.draw()
		g.p1.numCards = g.p1.hand.Size() + g.p1.newHand.Size()
		g.p2.numCards = g.p2.hand.Size() + g.p2.newHand.Size()
		if g.p1.numCards == 0 || g.p2.numCards == 0 || roundNum >= 5000 || rWinner == 0 { //online study found that 88.2% of simulated war games run for under 5000 turns
			gameOver = true
		}
	}
	if roundNum >= 5000 {
		if g.p1.numCards > g.p2.numCards {
			rWinner = 1
			fmt.Printf("Congrats, Player 1! After 5000 turns, you had more cards than Player 2 at %d vs %d. Let's call that a win!", g.p1.numCards, g.p2.numCards)
		}
		if g.p1.numCards < g.p2.numCards {
			rWinner = 2
			fmt.Printf("Congrats, Player 2! After 5000 turns, you had more cards than Player 1 at %d vs %d. Let's call that a win!", g.p2.numCards, g.p1.numCards)
		}
		if g.p1.numCards == g.p2.numCards {
			rWinner = 0
			fmt.Println("It's a tie after 5000 turns. Wow! What a game!")
		}
	} else {
		fmt.Printf("Player %d won the game after %d rounds! Thanks for playing.", rWinner, roundNum)
	}
	if rWinner == 1 {
		return g.p1
	}
	if rWinner == 2 {
		return g.p2
	}
	return player{}
}

func main() {
	var uInput string
	d := deck{}
	p1 := player{}
	p2 := player{}
	g := game{d, p1, p2}
	uInput = "Y"
	g.InitDeck(&g.d)
	for uInput == "Y" {
		d = deck{}
		p1 = player{}
		p2 = player{}
		g = game{d, p1, p2}
		g.InitDeck(&g.d)
		fmt.Println("Would you like to play again? Y/N")
		fmt.Scanln(&uInput)
	}
}
