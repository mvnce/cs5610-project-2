import React from "react";
import "../styles/Boards.css";
import Board from "./Board";
import { ACTION_TYPE, GAME_MODE, PLAYER_TYPE } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

const Boards = () => {
  const winner = useSelector((state) => state.common.winner);
  const mode = useSelector((state) => state.common.mode);
  const dispatch = useDispatch();

  const playAgainClickHandler = () => {
    dispatch({
      type: ACTION_TYPE.CLICK_RESET,
      mode: mode,
    });
  };

  const winnerClassNames = classNames("winner-container", {
    hidden: winner === null,
  });

  return (
    <div className="primary-container">
      <div className={winnerClassNames}>
        <div>{winner ? "YOU WIN THE GAME :)" : "YOU LOSE THE GAME :("}</div>
        <div className="primary-button" onClick={() => playAgainClickHandler()}>
          Play Again
        </div>
      </div>

      <div className="main-container">
        <div className="board-container">
          <div className="board-title">Opponent's Board</div>
          <Board ownerPlayerType={PLAYER_TYPE.BOT} />
        </div>

        <div
          className={
            mode === GAME_MODE.FREE
              ? "board-container hidden"
              : "board-container"
          }
        >
          <div className="board-title">Your Board</div>
          <Board ownerPlayerType={PLAYER_TYPE.HUMAN} />
        </div>
      </div>
    </div>
  );
};

export default Boards;
