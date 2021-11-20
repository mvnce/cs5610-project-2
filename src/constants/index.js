const ACTION_TYPE = {
  CLICK_TILE: "ClickTile",
  CLICK_RESET: "ClickReset",
};

const RAW_SHIPS = [
  { id: "5", size: 5 },
  { id: "4", size: 4 },
  { id: "a", size: 3 },
  { id: "b", size: 3 },
  { id: "2", size: 2 },
];

const SHIP_DIRECTION = {
  VERTICAL: "Vertical",
  HORIZONTAL: "Horizontal",
};

const TILE_STATE = {
  PRISTINE: 0,
  DIRTY: 1,
  DESTRUCTED: 2,
};

const PLAYER_TYPE = {
  BOT: 0,
  HUMAN: 1,
};

const GAME_MODE = {
  FREE: 0,
  BOT: 1,
};

export {
  ACTION_TYPE,
  GAME_MODE,
  PLAYER_TYPE,
  RAW_SHIPS,
  SHIP_DIRECTION,
  TILE_STATE,
};
