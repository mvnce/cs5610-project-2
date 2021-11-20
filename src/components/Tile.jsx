import React from "react";
import "../styles/Tile.css";
import { useDispatch } from "react-redux";
import { ACTION_TYPE, PLAYER_TYPE, TILE_STATE } from "../constants";
import classNames from "classnames";

const Tile = (props) => {
  const dispatch = useDispatch();

  const clickTileHandler = (event) => {
    dispatch({
      type: ACTION_TYPE.CLICK_TILE,
      row: props.row,
      col: props.col,
      ownerPlayerType: props.ownerPlayerType,
    });
  };

  const outerClassNames = classNames("tile", "middle-center", {
    "color-pristine": props.dataValue === TILE_STATE.PRISTINE,
    "color-dirty": props.dataValue === TILE_STATE.DIRTY,
    "color-destructed": props.dataValue === TILE_STATE.DESTRUCTED,
    "cursor-clickable":
      props.dataValue === TILE_STATE.PRISTINE &&
      props.ownerPlayerType === PLAYER_TYPE.BOT,
    "cursor-unclickable":
      (props.dataValue === TILE_STATE.DIRTY &&
        props.ownerPlayerType === PLAYER_TYPE.BOT) ||
      (props.dataValue === TILE_STATE.DESTRUCTED &&
        props.ownerPlayerType === PLAYER_TYPE.BOT) ||
      props.ownerPlayerType === PLAYER_TYPE.HUMAN,
  });

  const innerClassNames = classNames("middle-center", {
    "tile-dot":
      (props.shipValue != null && props.ownerPlayerType !== PLAYER_TYPE.BOT) ||
      props.dataValue === TILE_STATE.DESTRUCTED,
  });

  return (
    <div
      className={outerClassNames}
      onClick={(event) => clickTileHandler(event)}
    >
      <div className={innerClassNames}>
        {/* comment out tile coordinates */}
        {/*{props.row} - {props.col}*/}
      </div>
    </div>
  );
};

export default Tile;
