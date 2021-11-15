import React from "react";
import "../styles/Tile.css";
import { useDispatch } from "react-redux";
import { CLICK_TILE } from "../constants/ActionTypes";
import { TILE_STATE } from "../constants/Constants";
import classNames from "classnames";

const Tile = (props) => {
  const dispatch = useDispatch();

  const clickTileHandler = (event) => {
    console.log(CLICK_TILE, props);

    dispatch({ type: CLICK_TILE, row: props.row, col: props.col });
  };

  const outerClassNames = classNames("tile", "middle-center", {
    "color-dirty": props.dataValue === TILE_STATE.DIRTY,
  });

  const innerClassNames = classNames("middle-center", {
    "tile-dot": props.shipValue != null,
  });

  return (
    <div
      className={outerClassNames}
      onClick={(event) => clickTileHandler(event)}
    >
      <div className={innerClassNames}>
        {props.row} - {props.col}
      </div>
    </div>
  );
};

export default Tile;
