### **Detail of Work Completed in Sprint 2**
**Frontend**

Created unit test and Cypress test. Created tic-tac-toe board and its basic functionality. 

### **Unit Tests and Cypress Test for Frontend**
**Unit Tests**
1. WarComponent - should create
2. AppComponent - should create the app, should have as title 'gator-arcade'
3. SolitaireComponent - should create
4. ConnectFourComponent - should create
5. TicTacToeComponent - should create, should update cell value when makeMove is called, should reset the game state when reset method is called
6. CheckersComponent - should create

**Cypress test**

Test tic-tac-toe board - the board should update when empty cell is clicked, swapping between X and O (no win/lose parameters set up yet), and the board should return to being blank when the reset button is clicked. 

### **Unit Tests for Backend**
**Tic-Tac-Toe**
1. TestDisplayBoard - should test that the tic-tac-toe board is properly displayed on the screen
2. TestUpdateBoard - should test that the tic-tac-toe board is properly updated once a player makes a move
3. TestCheckIfWon - should test that the program recognizes when a player wins the game
4. TestIsDraw - should test that the program recognizes when the game is a draw

**War**



### **Backend Documentation**
Introduction

Gator Arcade is a collection of classic board and card games such as tic-tac-toe, connect four, checkers, hangman, blackjack, War, and Go Fish. This documentation will be going over the backend work for tic-tac-toe and War specifically.

Tutorial: Tic-Tac-Toe

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

Tutorial: War

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

Error Codes/Warnings

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
