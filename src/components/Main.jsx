import React from "react";
import "../styles/Main.css";
import Board from "./Board";

const Main = () => {
  return (
    <div className="main-container">
      <div className="board-title">Opponent's Board</div>
      <Board boardIndex={0}/>

      <div className="board-title">My Board</div>
      <Board boardIndex={1}/>
    </div>
  );
};

export default Main;
