import {
  calculateMaxShipPoints,
  calculateShipHitPoints,
  createMatrix,
  createShipBoard,
  debugBoardsLogger,
  debugLogger,
  deepCopy,
} from "../utilities";
import {
  ACTION_TYPE,
  GAME_MODE,
  PLAYER_TYPE,
  RAW_SHIPS,
  TILE_STATE,
} from "../constants";
import { randomNumberByInterval } from "../utilities/commonUtils";

const createNewState = () => {
  return {
    dataBoards: {
      [PLAYER_TYPE.BOT]: createMatrix(10, 10, TILE_STATE.PRISTINE),
      [PLAYER_TYPE.HUMAN]: createMatrix(10, 10, TILE_STATE.PRISTINE),
    },
    shipBoards: {
      [PLAYER_TYPE.BOT]: createShipBoard(10, 10),
      [PLAYER_TYPE.HUMAN]: createShipBoard(10, 10),
    },
    maxPoints: calculateMaxShipPoints(RAW_SHIPS),
    mode: GAME_MODE.FREE,
    winner: null,
    freeModeData: {},
    botModeData: {
      currentPlayer: PLAYER_TYPE.HUMAN,
    },
  };
};

const commonReducer = (state = createNewState(), action) => {
  switch (action.type) {
    case ACTION_TYPE.CLICK_RESET:
      debugLogger("handling CLICK_RESET action event: ", action);
      return Object.assign({}, createNewState(), { mode: action.mode });

    case ACTION_TYPE.CLICK_TILE:
      debugLogger("handling CLICK_TILE action event: ", action);

      const editableDataBoards = deepCopy(state.dataBoards);
      const originalShipBoard = state.shipBoards[action.ownerPlayerType];
      const editableDataBoard = editableDataBoards[action.ownerPlayerType];

      if (state.winner !== null) {
        debugLogger("The game is over!");
        return state;
      }

      if (editableDataBoard[action.row][action.col] === TILE_STATE.DIRTY) {
        debugLogger("This tile is in dirty state!");
        return state;
      }

      if (editableDataBoard[action.row][action.col] === TILE_STATE.DESTRUCTED) {
        debugLogger("This tile is in destructed state!");
        return state;
      }

      if (action.ownerPlayerType === PLAYER_TYPE.HUMAN) {
        debugLogger("This tile is unable to be clicked!");
        return state;
      }

      if (originalShipBoard[action.row][action.col] != null) {
        editableDataBoard[action.row][action.col] = TILE_STATE.DESTRUCTED;
      } else {
        editableDataBoard[action.row][action.col] = TILE_STATE.DIRTY;
      }

      const newState = Object.assign({}, state, {
        dataBoards: editableDataBoards,
      });
      const hitPoints = calculateShipHitPoints(
        originalShipBoard,
        editableDataBoard
      );

      if (hitPoints === state.maxPoints) {
        newState.winner = PLAYER_TYPE.HUMAN;
      }

      while (true && state.mode === GAME_MODE.BOT) {
        const row = randomNumberByInterval(0, 9);
        const col = randomNumberByInterval(0, 9);

        const humanShipBoard = state.shipBoards[PLAYER_TYPE.HUMAN];
        const humanDataBoard = state.dataBoards[PLAYER_TYPE.HUMAN];

        if (
          humanDataBoard[row][col] === TILE_STATE.DIRTY ||
          humanDataBoard[row][col] === TILE_STATE.DESTRUCTED
        ) {
          continue;
        }

        if (humanShipBoard[row][col] != null) {
          newState.dataBoards[PLAYER_TYPE.HUMAN][row][col] =
            TILE_STATE.DESTRUCTED;
        } else {
          newState.dataBoards[PLAYER_TYPE.HUMAN][row][col] = TILE_STATE.DIRTY;
        }

        const hitPoints = calculateShipHitPoints(
          newState.shipBoards[PLAYER_TYPE.HUMAN],
          newState.dataBoards[PLAYER_TYPE.HUMAN]
        );

        if (hitPoints === state.maxPoints) {
          newState.winner = PLAYER_TYPE.BOT;
        }

        break;
      }

      debugBoardsLogger(
        "Bot's shipBoards",
        newState.shipBoards[PLAYER_TYPE.BOT],
        newState.dataBoards[PLAYER_TYPE.BOT]
      );
      debugBoardsLogger(
        "Human's shipBoards",
        newState.shipBoards[PLAYER_TYPE.HUMAN],
        newState.dataBoards[PLAYER_TYPE.HUMAN]
      );

      return newState;

    default:
      return state;
  }
};

export default commonReducer;
