import { TILE_STATE } from "../constants/Constants";
import { CLICK_TILE, MOVE_SHIP } from "../constants/ActionTypes";
import { combineReducers } from "@reduxjs/toolkit";
import { createMatrix, createShipBoard, deepCopy } from "../utilities";

const initialState = {
  dataBoard: createMatrix(10, 10, TILE_STATE.PRISTINE),
  shipBoard: createShipBoard(10, 10),
};

function commonReducer(state = initialState, action) {
  if (action.type === CLICK_TILE) {
    console.log(action);

    const newBoard = deepCopy(state.dataBoard);
    newBoard[action.row][action.col] = TILE_STATE.DIRTY;

    return Object.assign({}, state, { dataBoard: newBoard });
  }

  if (action.type === MOVE_SHIP) {
    console.log(action);

    // const previousPosition = action.previousPosition;
    // const currentPosition = action.currentPosition;

    // TODO: find previous one in array
    const newShips = JSON.parse(JSON.stringify(state.board));

    newShips[0].x = action.data.x;
    newShips[0].y = action.data.y;

    return Object.assign({}, state, { ships: newShips });
  }

  return state;
}

const rootReducer = combineReducers({ common: commonReducer });

export default rootReducer;
