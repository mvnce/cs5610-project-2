import React from 'react';
import Tile from './Tile';
import '../styles/Board.css';
import { TILE_STATE } from '../constants/Constants';
import { useDispatch, useSelector } from "react-redux";
import { selectBoard } from "../features/counterSlice";

const Board = () => {

  const boardData = useSelector(selectBoard);
  const dispatch = useDispatch();

  // helper functions
  const initializeBoard = (boardSize, defaultValue) => {
    return Array(boardSize).fill(Array(boardSize).fill(defaultValue));
  }

  const renderTile = (row, col, value) => {
    return <Tile key={[row, col].join('-')} innerValue={value} row={row} col={col}/>;
  }

  const renderTiles = (board) => {
    return board.map((cols, col) =>
      cols.map((value, row) =>
        renderTile(row, col, value)));
  }

  // initialization and rendering
  const board = initializeBoard(10, TILE_STATE.PRISTINE);
  const renderedTiles = renderTiles(board);

  return (
    <div className='board-container'>
      <div className='board'> {renderedTiles} </div>
    </div>
  );
}

export default Board;
