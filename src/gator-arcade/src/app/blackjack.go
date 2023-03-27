package main

import (
	"fmt"
	"math/rand"
	"os"
	"time"
)

type card struct {
	nameRank   string
	numberRank int
	suit       string
}

type deck struct {
	deck [52]card
}

type player struct {
	name string
	hand []card
}

type game struct {
	player_ player
	deck_   deck
}

// Initializes all cards in the deck and shuffles it before returning
func initializeDeck(g game) {
	newCard := card{}
	for i := 0; i < 52; i++ {
		switch i % 4 {
		case 0:
			newCard.suit = "Hearts"
		case 1:
			newCard.suit = "Diamonds"
		case 2:
			newCard.suit = "Spades"
		case 3:
			newCard.suit = "Clubs"
		}
		switch i % 13 {
		case 1:
			newCard.numberRank = 1
			newCard.nameRank = "Ace"
		case 2:
			newCard.numberRank = 2
			newCard.nameRank = "Two"
		case 3:
			newCard.numberRank = 3
			newCard.nameRank = "Three"
		case 4:
			newCard.numberRank = 4
			newCard.nameRank = "Four"
		case 5:
			newCard.numberRank = 5
			newCard.nameRank = "Five"
		case 6:
			newCard.numberRank = 6
			newCard.nameRank = "Six"
		case 7:
			newCard.numberRank = 7
			newCard.nameRank = "Seven"
		case 8:
			newCard.numberRank = 8
			newCard.nameRank = "Eight"
		case 9:
			newCard.numberRank = 9
			newCard.nameRank = "Nine"
		case 10:
			newCard.numberRank = 10
			newCard.nameRank = "Ten"
		case 11:
			newCard.numberRank = 11
			newCard.nameRank = "Jack"
		case 12:
			newCard.numberRank = 12
			newCard.nameRank = "Queen"
		case 0:
			newCard.numberRank = 0
			newCard.nameRank = "King"
		}
		g.deck_.deck[i] = newCard
	}
	shuffleDeck(g)
}

// Utilizes the Fisher–Yates shuffle algorithm to shuffle the deck
func shuffleDeck(g game) {
	rand.Seed(time.Now().UnixNano())
	for i := len(g.deck_.deck) - 1; i > 0; i-- {
		j := rand.Intn(i + 1)
		g.deck_.deck[i], g.deck_.deck[j] = g.deck_.deck[j], g.deck_.deck[i]
	}
}

// Deals player a card from the top of the deck
func deal(g game) card {
	return g.deck_.deck[0]
}

func calculateHand(g game, p player, d player) {

	playerHand := 0
	dealerHand := 0
	sum := 0

	for i := 1; i < len(g.player_.hand); i++ {
		sum += g.player_.hand[i].numberRank
	}

	if g.player_.name == "Player" {
		for i := 1; i < len(d.hand); i++ {
			dealerHand += d.hand[i].numberRank
		}
	} else {
		for i := 1; i < len(p.hand); i++ {
			playerHand += p.hand[i].numberRank
		}
	}

	if sum >= 21 {

		fmt.Println("Player's hand: ", playerHand)
		fmt.Println("Dealer's hand: ", dealerHand)

		if g.player_.name == "Player" {
			fmt.Println("Game over, dealer wins!")
			os.Exit(0)
		} else {
			fmt.Println("Game over, player wins!")
			os.Exit(0)
		}
	} else if sum == 21 {

		fmt.Println("Player's hand: ", playerHand)
		fmt.Println("Dealer's hand: ", dealerHand)

		if g.player_.name == "Player" {
			fmt.Println("Game over, player wins!")
			os.Exit(0)
		} else {
			fmt.Println("Game over, dealer wins!")
			os.Exit(0)
		}
	} else {
		if g.player_.name == "Player" {
			fmt.Println("Your current hand is valued at: ", sum)
			fmt.Println("Would you like to draw another card? Y/N")
			var answer string
			fmt.Scanln(&answer)
			if answer == "Y" {
				newCard := deal(g)
				g.player_.hand = append(g.player_.hand, newCard)
				calculateHand(g, p, d)
			} else {
				return
			}
		} else {
			if sum >= 16 {
				newCard := deal(g)
				g.player_.hand = append(g.player_.hand, newCard)
				calculateHand(g, p, d)
			}
			return
		}
	}
}

// compares player's and dealer's hands if they are both < 21
func compareHands(g game, p player, d player) {
	playerHand := 0
	dealerHand := 0

	for i := 1; i < len(d.hand); i++ {
		dealerHand += d.hand[i].numberRank
	}
	for i := 1; i < len(p.hand); i++ {
		playerHand += p.hand[i].numberRank
	}

	fmt.Println("Player's hand: ", playerHand)
	fmt.Println("Dealer's hand: ", dealerHand)

	if dealerHand > playerHand {
		fmt.Println("Dealer wins!")
	} else {
		fmt.Println("Player wins!")
	}
	os.Exit(0)
}

func main() {
	currentPlayer := player{}
	personPlayer := player{}
	dealer := player{}
	deck := deck{}
	game := game{currentPlayer, deck}
	dealer.name = "Dealer"
	personPlayer.name = "Player"
	initializeDeck(game)

	// two cards for each player are drawn
	playerHand := deal(game)
	fmt.Println("You drew: ", playerHand.nameRank, " of ", playerHand.suit)
	personPlayer.hand[0] = playerHand
	playerHand = deal(game)
	fmt.Println("You drew: ", playerHand.nameRank, " of ", playerHand.suit)
	personPlayer.hand[1] = playerHand
	dealerHand := deal(game)
	dealer.hand[0] = dealerHand
	dealerHand = deal(game)
	dealer.hand[1] = dealerHand

	// player's turn first, then dealer's
	game.player_ = personPlayer
	calculateHand(game, personPlayer, dealer)
	game.player_ = dealer
	calculateHand(game, personPlayer, dealer)

	// compare final hands to determine winner if neither player nor the dealer won or busted
	compareHands(game, personPlayer, dealer)
}
