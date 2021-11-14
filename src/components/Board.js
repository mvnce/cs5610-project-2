import React from 'react';
import Tile from './Tile';
import '../styles/Board.css';
import { useSelector } from 'react-redux';

const Board = () => {

  const selectBoard = useSelector((state) => state.common.board);

  const renderTile = (row, col, value) => {
    return <Tile key={[row, col].join('-')} innerValue={value} row={row} col={col}/>;
  }

  const renderTiles = (board) => {
    return board.map((rowArray, rowId) =>
      rowArray.map((value, colId) =>
        renderTile(rowId, colId, value)));
  }

  const renderedTiles = renderTiles(selectBoard);

  return (
    <div className='board-container'>
      <div className='board'> {renderedTiles} </div>
    </div>
  );
}

export default Board;
