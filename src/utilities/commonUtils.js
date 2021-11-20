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

const randomNumberByInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const debugLogger = (...str) => {
  console.debug(...str);
};

const debugBoardsLogger = (context, shipBoard, dataBoard) => {
  let rowString = "";
  rowString += !!context ? "====== " + context + " ======\n" : "";
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

export {
  createMatrix,
  debugBoardsLogger,
  debugLogger,
  deepCopy,
  randomNumberByInterval,
};
