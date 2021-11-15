import React from "react";
import Tile from "./Tile";
import "../styles/Board.css";
import { useSelector } from "react-redux";

const Board = () => {
  const dataBoard = useSelector((state) => state.common.dataBoard);
  const shipBoard = useSelector((state) => state.common.shipBoard);

  const renderTile = (row, col) => {
    return (
      <Tile
        key={[row, col].join("-")}
        row={row}
        col={col}
        dataValue={dataBoard[row][col]}
        shipValue={shipBoard[row][col]}
      />
    );
  };

  const renderTiles = (board) => {
    return board.map((rows, rowId) =>
      rows.map((_, colId) => renderTile(rowId, colId))
    );
  };

  return (
    <div className="board-container">
      <div className="board"> {renderTiles(dataBoard)} </div>
    </div>
  );
};

export default Board;
