import { RAW_SHIPS, SHIP_DIRECTION } from "../constants";

const randomNumberByInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomShipDirection = () => {
  return [SHIP_DIRECTION.VERTICAL, SHIP_DIRECTION.HORIZONTAL][randomNumberByInterval(0, 1)];
};

const deepCopy = (data) => JSON.parse(JSON.stringify(data));

const createMatrix = (rowCount, colCount, defaultValue) => {
  const matrix = [];
  for (let row = 0; row < rowCount; row++) {
    const rowList = [];
    for (let col = 0; col < colCount; col++) rowList.push(defaultValue);
    matrix.push(rowList);
  }
  return matrix;
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

const debugLogger = (...strs) => {
  console.debug(...strs);
};

const debugBoardsLogger = (shipBoard, dataBoard) => {
  let rowString = "";
  for (let i = 0; i < shipBoard.length; i++) {
    for (let j = 0; j < shipBoard[i].length; j++) {
      rowString += (shipBoard[i][j] === null ? "-" : shipBoard[i][j]) + " ";
    }
    rowString += "   |   ";
    for (let j = 0; j < dataBoard[i].length; j++) {
      rowString += (dataBoard[i][j] === 0 ? "-" : dataBoard[i][j]) + " ";
    }
    rowString += "\n";
  }
  debugLogger(rowString);
};

export { createMatrix, createShipBoard, deepCopy, debugBoardsLogger, debugLogger };
