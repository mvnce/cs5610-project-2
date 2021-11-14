import { TILE_STATE } from '../constants/Constants';
import { CLICK_TILE } from '../constants/ActionTypes';
import { combineReducers } from '@reduxjs/toolkit';

const initialState = {
  board: Array(10).fill(Array(10).fill(TILE_STATE.PRISTINE)),
  targets:[[]]
};

function commonReducer(state = initialState, action) {
  if (action.type === CLICK_TILE) {
    console.log(action);

    const newBoard = state.board.map(cols => [...cols]);
    newBoard[action.row][action.col] = TILE_STATE.DIRTY;

    return Object.assign({}, state, {
      board: newBoard
    });
  }

  return state;
}

const rootReducer = combineReducers({ common: commonReducer });

export default rootReducer;
