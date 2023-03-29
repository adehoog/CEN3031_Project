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
	deck []card
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
func initializeDeck(g game) game {
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
			newCard.numberRank = 13
			newCard.nameRank = "King"
		}
		g.deck_.deck = append(g.deck_.deck, newCard)
	}

	// Utilizes the Fisher–Yates shuffle algorithm to shuffle the deck
	rand.Seed(time.Now().UnixNano())
	for i := len(g.deck_.deck) - 1; i > 0; i-- {
		j := rand.Intn(i + 1)
		g.deck_.deck[i], g.deck_.deck[j] = g.deck_.deck[j], g.deck_.deck[i]
	}
	return g
}

// Deals player a card from the top of the deck
func deal(g game) card {
	index := 0
	for g.deck_.deck[index].nameRank == "NULL" {
		index++
	}

	newCard := g.deck_.deck[index]
	g.deck_.deck[index].nameRank = "NULL"
	return newCard
}

func calculateHand(g game, p player, d player) game {

	playerHand := 0
	dealerHand := 0
	sum := 0

	for i := 0; i < len(g.player_.hand); i++ {
		sum += g.player_.hand[i].numberRank
	}

	for i := 0; i < len(d.hand); i++ {
		dealerHand += d.hand[i].numberRank
	}
	for i := 0; i < len(p.hand); i++ {
		playerHand += p.hand[i].numberRank
	}

	if sum > 21 {

		fmt.Println("Player's hand: ", playerHand)
		fmt.Println("Dealer's hand: ", dealerHand)

		if g.player_.name == "Player" {
			if dealerHand > 21 {
				fmt.Println("Game over! You both bust!")
				os.Exit(0)
			}
			fmt.Println("Game over, dealer wins!")
			os.Exit(0)
		} else {
			if playerHand > 21 {
				fmt.Println("Game over! You both bust!")
				os.Exit(0)
			}
			fmt.Println("Game over, player wins!")
			os.Exit(0)
		}
	} else if playerHand == 21 && dealerHand == 21 {
		fmt.Println("Player's hand: ", playerHand)
		fmt.Println("Dealer's hand: ", dealerHand)
		fmt.Println("It's a tie!")
	} else if sum == 21 {

		fmt.Println("Blackjack!")
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
				fmt.Println("You drew ", newCard.nameRank, " of ", newCard.suit)
				p.hand = append(p.hand, newCard)
				g.player_.hand = append(g.player_.hand, newCard)
				g = calculateHand(g, p, d)
			} else {
				g.player_ = d
				g = calculateHand(g, p, d)
			}
		} else {
			if sum <= 16 {
				newCard := deal(g)
				g.player_.hand = append(g.player_.hand, newCard)
				d.hand = append(d.hand, newCard)
				g = calculateHand(g, p, d)
			}
			return g
		}
	}
	return g
}

// compares player's and dealer's hands if they are both < 21
func compareHands(g game, p player, d player) {

	playerHand := 0
	dealerHand := 0
	sum := 0

	for i := 0; i < len(g.player_.hand); i++ {
		sum += g.player_.hand[i].numberRank
	}

	for i := 0; i < len(d.hand); i++ {
		dealerHand += d.hand[i].numberRank
	}

	for i := 0; i < len(p.hand); i++ {
		playerHand += p.hand[i].numberRank
	}

	fmt.Println("Player's hand: ", playerHand)
	fmt.Println("Dealer's hand: ", dealerHand)

	if dealerHand > playerHand {
		fmt.Println("Dealer wins!")
	} else if playerHand > dealerHand {
		fmt.Println("Player wins!")
	} else {
		fmt.Println("It's a tie!")
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
	game = initializeDeck(game)

	// two cards for each player are drawn
	playerHand := deal(game)
	fmt.Println("You drew: ", playerHand.nameRank, " of ", playerHand.suit)
	personPlayer.hand = append(personPlayer.hand, playerHand)
	playerHand = deal(game)
	fmt.Println("You drew: ", playerHand.nameRank, " of ", playerHand.suit)
	personPlayer.hand = append(personPlayer.hand, playerHand)
	dealerHand := deal(game)
	dealer.hand = append(dealer.hand, dealerHand)
	dealerHand = deal(game)
	dealer.hand = append(dealer.hand, dealerHand)

	// player's turn first
	game.player_ = personPlayer
	game = calculateHand(game, personPlayer, dealer)

	// compare final hands to determine winner if neither player nor the dealer won or busted
	compareHands(game, personPlayer, dealer)
}
