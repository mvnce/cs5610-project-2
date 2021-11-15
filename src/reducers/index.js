import { ACTION_TYPE, TILE_STATE } from "../constants";
import { combineReducers } from "@reduxjs/toolkit";
import { createMatrix, createShipBoard, debugBoardsLogger, debugLogger, deepCopy } from "../utilities";

const INITIAL_STATE = {
  dataBoards: [
    createMatrix(10, 10, TILE_STATE.PRISTINE),
    createMatrix(10, 10, TILE_STATE.PRISTINE),
  ],
  shipBoards: [
    createShipBoard(10, 10),
    createShipBoard(10, 10),
  ],
};

debugBoardsLogger(INITIAL_STATE.shipBoards[0], INITIAL_STATE.dataBoards[0]);
debugBoardsLogger(INITIAL_STATE.shipBoards[1], INITIAL_STATE.dataBoards[1]);

function commonReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPE.CLICK_TILE:
      debugLogger("reducer", "action handler", action);

      const editableDataBoards = deepCopy(state.dataBoards);
      const originalShipBoard = state.shipBoards[action.boardIndex];
      const editableDataBoard = editableDataBoards[action.boardIndex];

      if (editableDataBoard[action.row][action.col] === TILE_STATE.DIRTY) {
        debugLogger("This tile is in dirty state!");
        return state;
      }

      if (editableDataBoard[action.row][action.col] === TILE_STATE.DESTRUCTED) {
        debugLogger("This tile is in destructed state!");
        return state;
      }

      if (action.boardIndex === 1) {
        debugLogger("This tile is unable to be clicked!");
        return state;
      }

      if (originalShipBoard[action.row][action.col] != null) {
        editableDataBoard[action.row][action.col] = TILE_STATE.DESTRUCTED;
      } else {
        editableDataBoard[action.row][action.col] = TILE_STATE.DIRTY;
      }

      const newState = Object.assign({}, state, { dataBoards: editableDataBoards });

      debugBoardsLogger(newState.shipBoards[0], newState.dataBoards[0]);
      debugBoardsLogger(newState.shipBoards[1], newState.dataBoards[1]);

      return newState

    default:
      return state;
  }
}

const rootReducer = combineReducers({ common: commonReducer });

export default rootReducer;
