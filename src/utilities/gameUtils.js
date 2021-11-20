import { RAW_SHIPS, SHIP_DIRECTION, TILE_STATE } from "../constants";
import { createMatrix, randomNumberByInterval } from "./commonUtils";

const calculateMaxShipPoints = (rawShips) => {
  return rawShips.map(ship => ship.size).reduce((a, b) => a + b);
};

const calculateShipHitPoints = (shipBoard, dataBoard) => {
  return shipBoard.map((rows, rowId) => {
    return rows.map((element, colId) => {
      return (element !== null && dataBoard[rowId][colId] === TILE_STATE.DESTRUCTED) ? 1 : 0;
    }).reduce((a, b) => a + b);
  }).reduce((a, b) => a + b);
};

const createShipBoard = (rowCount, colCount) => {
  let board = createMatrix(rowCount, colCount);

  for (let tries = 0; tries < 10000; tries++) {
    board = createMatrix(rowCount, colCount, null);
    const hasConflicts = embedShips(board, RAW_SHIPS);

    if (!hasConflicts.includes(true)) break;
  }
  return board;
};

const embedShips = (board, ships) => {
  return ships.map((ship) => {
    const [direction, initialCoordinate] = calculateEmbedding(board, ship);
    return embedShip(board, ship, direction, initialCoordinate);
  });
};

const calculateEmbedding = (board, ship) => {
  const direction = randomShipDirection();

  let maxRowIdx = board.length - 1;
  let maxColIdx = board[0].length - 1;

  if (direction === SHIP_DIRECTION.VERTICAL) maxRowIdx -= ship.size - 1;
  if (direction === SHIP_DIRECTION.HORIZONTAL) maxColIdx -= ship.size - 1;

  const initialCoordinate = {
    row: randomNumberByInterval(0, maxRowIdx),
    col: randomNumberByInterval(0, maxColIdx),
  };

  return [direction, initialCoordinate];
};

const embedShip = (shipBoard, rawShip, direction, initialCoordinate) => {
  let hasConflict = false;

  const innerUpdateHelper = (rowIncrease, colIncrease) => {
    for (let i = 0; i < rawShip.size; i++) {
      const currentRow = initialCoordinate.row + i * rowIncrease;
      const currentCol = initialCoordinate.col + i * colIncrease;
      if (shipBoard[currentRow][currentCol] != null) hasConflict = true;
      shipBoard[currentRow][currentCol] = rawShip.id;
    }
  };

  if (direction === SHIP_DIRECTION.HORIZONTAL) innerUpdateHelper(0, 1);
  if (direction === SHIP_DIRECTION.VERTICAL) innerUpdateHelper(1, 0);

  return hasConflict;
};

const randomShipDirection = () => {
  return [SHIP_DIRECTION.VERTICAL, SHIP_DIRECTION.HORIZONTAL][randomNumberByInterval(0, 1)];
};

export {
  calculateMaxShipPoints,
  calculateShipHitPoints,
  createShipBoard
};
