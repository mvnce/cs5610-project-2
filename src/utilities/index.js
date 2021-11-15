import { SHIP_DIRECTION } from "../constants/Constants";

const randomNumberByInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomShipDirection = () => {
  return [SHIP_DIRECTION.VERTICAL, SHIP_DIRECTION.HORIZONTAL][
    randomNumberByInterval(0, 1)
  ];
};

const deepCopy = (data) => JSON.parse(JSON.stringify(data));

const createMatrix = (rowCount, colCount) => {
  const matrix = [];
  for (let row = 0; row < rowCount; row++) {
    const rowList = [];
    for (let col = 0; col < colCount; col++) rowList.push(null);
    matrix.push(rowList);
  }
  return matrix;
};

const createShipBoard = (rowCount, colCount) => {
  let board = createMatrix(rowCount, colCount);
  const ships = [
    { id: "a", size: 5 },
    { id: "b", size: 4 },
    { id: "c", size: 3 },
    { id: "d", size: 3 },
    { id: "e", size: 2 },
  ];

  for (let tries = 0; tries < 10000; tries++) {
    console.info("trying to generate ships with iteration: ", tries + 1);
    board = createMatrix(rowCount, colCount);
    const hasConflicts = embedShips(board, ships);

    printShipBoardHelper(board);
    console.log("Reading hasConflicts: ", hasConflicts);

    if (hasConflicts.indexOf(true) < 0) break;
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

const printShipBoardHelper = (board) => {
  let rowString = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      rowString += (board[i][j] == null ? "-" : board[i][j]) + " ";
    }
    rowString += "\n";
  }
  console.log(rowString);
};

export { createMatrix, createShipBoard, deepCopy };
