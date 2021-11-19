import React from "react";
import { useSelector } from "react-redux";
import "../styles/Main.css";
import Board from "./Board";



const Main = () => {

  let winner = useSelector((state) => state.common.winner);
  return (
    


        <div className="main-container">
          // winner shows up
          <div>
            {
              winner.length > 0 && 
              <h3>Winner is: {winner}</h3>
            }
          </div>
      <div className="board-title">Opponent's Board</div>
      <Board boardIndex={0}/>

      <div className="board-title">My Board</div>
      <Board boardIndex={1}/>
    </div>


  );
};

export default Main;
