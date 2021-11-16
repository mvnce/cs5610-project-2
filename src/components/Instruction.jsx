

const Instruction = () => {
    return (
      <body>
 
      <h1>
        Game Objective
      </h1>
      <p1>
      The object of Battleship is to try and sink all of the other player's before they sink all of your ships. 
      All of the other player's ships are somewhere on his/her board.  You try and hit them by calling out 
      the coordinates of one of the squares on the board.  
      The other player also tries to hit your ships by calling out coordinates.  
      Neither you nor the other player can see the other's board so you must try to guess where they are.  
      Each board in the physical game has two grids:  the lower (horizontal) section for the player's 
      ships and the upper part (vertical during play) for recording the player's guesses.
      </p1>

      <h1>
          Starting a new game
      </h1>

      <p1>
          On home page, player can choose a normal game with AI or a A free play game - 
          only show the opponent board (and remember to hide the enemy ships.)  
          The enemy AI does not take any turns here and their turn will be skipped.
          Each player places the 5 ships somewhere on their board.  The ships can only be placed vertically or horizontally. 
          Diagonal placement is not allowed. No part of a ship may hang off the edge of the board.  
          Ships may not overlap each other.  No ships may be placed on another ship. 
          Once the guessing begins, the players may not move the ships.
      </p1>

    <h1> Playing the Game
        </h1>
      <p1>
      During the game, you and an AI will take turns (the player always goes first).  
      On your turn, you will select a square on your opponent’s board.  On your opponent’s turn,
       the AI will randomly select a square on your grid.  If you or your opponent hit a ship, then 
       mark that board with a color and symbol.  If you or your opponent miss, then mark a spot on the 
       board to remind the players where on the board they have attempted.  The AI will not try to hit
        the same place more than once and the user should not be able to select the same spot more than once.
        Player's take turns guessing by calling out the coordinates. The AI responds with "hit" or "miss" as appropriate.  Both players should mark their board with pegs: 
         red for hit, white for miss. For example, if you call out F6 and your opponent does not have any ship located at F6, your opponent would respond with "miss".  
         You record the miss F6 by placing a white peg on the lower part of your board at F6.  Your opponent records the miss by placing.
         When all of the squares that one your ships occupies have been hit, the ship will be sunk.   You should announce "hit and sunk". 
         In the physical game, a red peg is placed on the top edge of the vertical board to indicate a sunk ship. 
         As soon as all of one player's ships have been sunk, the game ends.

      </p1>
      </body>

      
      
  
    );
  };
  
  export default Instruction;