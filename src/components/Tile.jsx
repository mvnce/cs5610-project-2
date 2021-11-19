import React from "react";
import "../styles/Tile.css";
import { useDispatch } from "react-redux";
import { ACTION_TYPE, TILE_STATE } from "../constants";
import classNames from "classnames";
import { useSelector } from "react-redux";

const Tile = (props) => {
  const dispatch = useDispatch();

  const clickTileHandler = (event) => {
    dispatch({
      type: ACTION_TYPE.CLICK_TILE,
      row: props.row,
      col: props.col,
      boardIndex: props.boardIndex,
    });

    // winning situation
    const winningState = useSelector((state) => state.common.winner);
    const currentPlayer = useSelector((state) => state.common.currentPlayer);

    const boardState;
    if (currentPlayer === "human") {
      boardState = useSelector((state) => state.common.boardState);
    } else {
      // AIboerd need to be implemented
      boardState = useSelector((state) => state.common.AIboard);
      
    }

    

    let count = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (boardState[i][j] == TILE_STATE.DESTRUCTED) {
          count++;
        }
      }
    }

    if (count === 17) {
      dispatch({
        type:ACTION_TYPE.WINNER,
        winner:currentPlayer,
      })
    }
    
  };

  

  const outerClassNames = classNames("tile", "middle-center", {
    "color-pristine": props.dataValue === TILE_STATE.PRISTINE,
    "color-dirty": props.dataValue === TILE_STATE.DIRTY,
    "color-destructed": props.dataValue === TILE_STATE.DESTRUCTED,
    "cursor-clickable": props.dataValue === TILE_STATE.PRISTINE && props.boardIndex === 0,
    "cursor-unclickable": (props.dataValue === TILE_STATE.DIRTY && props.boardIndex === 0) ||
      (props.dataValue === TILE_STATE.DESTRUCTED && props.boardIndex === 0) || props.boardIndex === 1,
  });

  const innerClassNames = classNames("middle-center", {
    "tile-dot": (props.shipValue != null && props.boardIndex !== 0) || props.dataValue === TILE_STATE.DESTRUCTED,
  });

  return (
    <div
      className={outerClassNames}
      onClick={(event) => clickTileHandler(event)}
    >
      <div className={innerClassNames}>
        {/* comment out tile coordinates */}
        {/*{props.row} - {props.col}*/}
      </div>
    </div>
  );
};

export default Tile;
