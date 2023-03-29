package main

import (
	"fmt"
	"testing"
)

func TestInitializeDeck(t *testing.T) {

	g := game{player_: player{}, deck_: deck{}}
	g = initializeDeck(g)
	for i := 0; i < len(g.deck_.deck); i++ {
		fmt.Println(g.deck_.deck[i].nameRank, " of ", g.deck_.deck[i].suit)
	}
	if len(g.deck_.deck) != 52 {
		t.Errorf("Error: Card deck not correctly initialized")
	}
}

func TestDeal(t *testing.T) {

	g := game{player_: player{}, deck_: deck{}}
	g = initializeDeck(g)
	newCard := deal(g)

	if len(newCard.nameRank) == 0 || newCard.numberRank <= 0 || newCard.numberRank > 13 || len(newCard.suit) == 0 {
		t.Errorf("Error, unable to deal valid card")
	}
	fmt.Println("Card dealt: ", newCard.nameRank, " of ", newCard.suit)
}

func TestCalculateHand(t *testing.T) {

	g := game{player_: player{}, deck_: deck{}}
	p := player{name: "Player"}
	d := player{name: "Dealer"}
	g = initializeDeck(g)
	g.player_.name = "Player"
	newCard1 := deal(g)
	fmt.Println(newCard1.nameRank, " of ", newCard1.suit)
	newCard2 := deal(g)
	fmt.Println(newCard2.nameRank, " of ", newCard2.suit)
	p.hand = append(p.hand, newCard1, newCard2)
	g.player_.hand = append(g.player_.hand, newCard1, newCard2)
	sum := newCard1.numberRank + newCard2.numberRank
	fmt.Println("Total value: ", sum)
	fmt.Println()

	g.player_ = p
	g = calculateHand(g, p, d)
}

func TestCompareHands(t *testing.T) {

	g := game{player_: player{}, deck_: deck{}}
	p := player{name: "Player"}
	d := player{name: "Dealer"}
	g = initializeDeck(g)
	g.player_.name = "Player"
	newCard1 := deal(g)
	fmt.Println(newCard1.nameRank, " of ", newCard1.suit)
	newCard2 := deal(g)
	fmt.Println(newCard2.nameRank, " of ", newCard2.suit)
	p.hand = append(p.hand, newCard1, newCard2)
	g.player_.hand = append(g.player_.hand, newCard1, newCard2)
	sum := newCard1.numberRank + newCard2.numberRank
	fmt.Println("Total value: ", sum)
	fmt.Println()

	g.player_ = p
	compareHands(g, p, d)
}
