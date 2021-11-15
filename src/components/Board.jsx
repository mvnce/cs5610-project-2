import React from "react";
import Tile from "./Tile";
import "../styles/Board.css";
import { useSelector } from "react-redux";

const Board = (props) => {
  const dataBoard = useSelector((state) => state.common.dataBoards[props.boardIndex]);
  const shipBoard = useSelector((state) => state.common.shipBoards[props.boardIndex]);

  const renderTile = (row, col) => {
    return (
      <Tile
        key={[row, col].join("-")}
        row={row}
        col={col}
        dataValue={dataBoard[row][col]}
        shipValue={shipBoard[row][col]}
        boardIndex={props.boardIndex}
      />
    );
  };

  const renderTiles = () => {
    return dataBoard.map((rows, rowId) =>
      rows.map((_, colId) => renderTile(rowId, colId))
    );
  };

  return (
    <div className="board-container">
      <div className="board"> {renderTiles()} </div>
    </div>
  );
};

export default Board;
