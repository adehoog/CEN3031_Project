### **Detail of Work Completed in Sprint 4**
Fixed unit tests. 

### **Unit Tests for Frontend**

| Component | Method | Description |
| --- | --- | --- |
| WarComponent | initDeck | should initialize the deck and call initHands |
|  | initHands | should initialize the hands of the two players |
|  | draw | should correctly handle drawing and compare the values of cards |
|  | handleTie | should add three cards from each player to a new hand and call draw() |
|  | playGame | should repeatedly call draw() until one player has no cards left |
|  | startGame | should initialize the deck and call playGame() |
|  | playAgain | should reset the game state and call startGame() |
| AppComponent |  | should create the app, should have as title 'gator-arcade' |
| BlackjackComponent | initializeDeck | should initialize the deck and shuffle it |
|  |  | should handle errors |
|  | shuffleDeck | should shuffle the deck |
|  | deal | should deal a card from the top of the deck |
|  |  | should throw an error when the deck is empty |
|  | initHands | should initialize player and dealer hands |
|  |  | should handle errors |
|  | calculateHand | should update the player and dealer hands |
|  | compareHands | should correctly determine the winner |
|  | handleError | should return an Observable with a default value on error |
| ConnectFourComponent |  | should create |
| TicTacToeComponent | handleError | should log errors and return an observable of the given result |
|  | createGame | should create a new game and return it |
|  | isDraw | should return false for a non-draw game |
|  |  | should return true for a draw game |
|  | checkIfWon | should return true if a player has won |
|  |  | should return false if a player has not won |
|  | makeMove | should return an Observable<Game> |
|  | displayBoard | should display the game board with dashes |
|  | updateBoard | should update the game board with a valid move |
|  |  | should not update the game board with an invalid move |
|  | getGame | should retrieve a specific game |
|  |  | should retrieve all games |
|  | updateGame | should send an HTTP PUT request to update a game on the server |
|  |  | should handle errors when updating a game |
| CheckersComponent |  | should create |

### **Unit Tests for Backend**
**Tic-Tac-Toe**

TestDisplayBoard - should test that the tic-tac-toe board is properly displayed on the screen
  
TestUpdateBoard - should test that the tic-tac-toe board is properly updated once a player makes a move
  
TestCheckIfWon - should test that the program recognizes when a player wins the game
  
TestIsDraw - should test that the program recognizes when the game is a draw
  
**War**

TestHandleTie_DepthOne - should test that when players draw two cards of the same value, the winner receives the correct number of cards.
  
TestHandleTie_DepthTwo - should test that if two players tie, then tie again in the resolution of the initial tie, the winner still receives the correct number of cards.
  
TestPlayGame_Draw - should test that given identical decks that were not shuffled, a draw is reached after 5000 rounds.
  
TestInitDeck_WinnerHasAllCards - should test that upon the game's end, there are still 52 cards (no leakage).
  
**Blackjack**
  
TestInitializeDeck - should test that the card deck is correctly initialized with all 52 cards present
  
TestDeal - should test that a valid, random card is dealt to a player or dealer
  
TestCalculateHand - should test that the function calculating the player's current hand is accurate
  
TestCompareHands - should test that the function calculating and comparing the player's and dealer's hands is accurate
  

### **Backend API Documentation**
Introduction

Gator Arcade is a collection of classic board and card games such as tic-tac-toe, connect four, checkers, hangman, blackjack, War, and Go Fish. This documentation will be going over the backend work for tic-tac-toe and War specifically.

**Tutorial: Tic-Tac-Toe**

To start the game, first run the following command in the terminal:
```
go run tictactoe.go
```
A prompt will show asking Player 1 to choose their marker. Type 'X' or 'O' and hit ENTER. At this point, a blank board should display on the screen, and another prompt to select a spot on the board. In order to do this, type in the ROW and COLUMN number separated by only a space and then hit ENTER. The display will show the updated board with your marker in the selected spot. For example, typing in "1 2" will return:
```
---
--X
---
```

Now the game will prompt Player 2 to do the same.
The game will continue until one player wins or the game is a draw.
Win example:

```
Player 1 wins!
O-O
XXX
---
```

Draw example:
```
Game is a draw.
XOX
XOO
OXX
```

**Tutorial: War**

To start the game, first run the following command in the terminal:
```
go run war.go
```

A deck is initialized with numbers assigned to each card and then shuffled using the Fisher-Yates Shuffle algorithm. The deck is then split between Player 1 and Player 2 (26 cards each). The game will begin to automatically draw and compare cards for both players and display the results on the screen:
```
Drawing...
Player 1 draws a Nine of Hearts.
Player 2 draws a Queen of Clubs.
Player 2 wins this round!
```

In the case of a tie, the game will automatically draw 3 cards for each player.
```
Player 1 draws a Nine of Hearts.
Player 2 draws a Nine of Hearts.
It's a tie! Drawing 3 cards each...
```

The game will loop through until one player wins all 52 cards possible or the game has run for over 5000 rounds. In the case of the game running for over 5000 rounds, it will declare one of the players the winner if they ended up with more cards than the other, except for in the case of a tie.
Win examples:
```
Player 1 won the game after 829 rounds! Thanks for playing.
Congrats, Player 2! After 5000 turns, you had more cards than Player 1 at 45 vs 44. Let's call that a win!
```

Draw example:
```
It's a tie after 5000 turns. Wow! What a game!
```

**Tutorial: Blackjack**

To start the game, first run the following command in the terminal:
```
go run blackjack.go
```
A deck is initialized with numbers assigned to each card and then shuffled using the Fisher-Yates Shuffle algorithm. Two cards each are then dealt to the player and the dealer. The player's current hand is calculated and shown on the screen. Then a prompt will ask if the player wants to draw another card (hit) or not (stay).
```
You drew: Jack of Hearts.
You drew: Nine of Clubs.
Your current hand is valued at: 20
Would you like to draw another card? Y/N
```
If the player chooses to stay, then it's the dealer's turn to hit or stay, and the final results will show on screen:
```
Player's hand: 20
Dealer's hand: 18
Game over, player wins!
```
If the player chooses to hit (draw another card), then the process repeats unless his hand goes over 21, in which case he busts and the dealer wins:
```
You drew: Seven of Diamonds
Player's hand: 27
Dealer's hand: 18
Game over, dealer wins!
```
If the dealer also goes over 21, the following message will appear:
```
Game over! You both bust!
```
After the game is over, the program exits automatically.


**Error Codes/Warnings**

If a player in War is dealt more or less than exactly half of the card deck (26 cards), then a warning will display on screen such as this:
```
Size error in func deal: P1 hand stack is size 27
```

If a spot on the tic-tac-toe board is already taken by a player's marker and this spot is selected again, the following message will appear:
```
Spot already taken. Please choose another spot.
```
If a spot is chosen on the tic-tac-toe board that is out of bounds, this error will appear:
```
Error: Out of bounds
```


### **Video Links**
