import React from "react";
import "../styles/Tile.css";
import { useDispatch } from "react-redux";
import { CLICK_TILE } from "../constants/ActionTypes";
import { TILE_STATE } from "../constants/Constants";
import classNames from "classnames";

const Tile = (props) => {

  const dispatch = useDispatch();

  const clickHandler = (event) => {
    console.log(CLICK_TILE, props, event);

    dispatch({ type: CLICK_TILE, row: props.row, col: props.col });
  }

  const containerClassNames = classNames(
    'tile',
    'middle-center',
    { 'color-dirty': props.innerValue === TILE_STATE.DIRTY }
  );

  return (
    <div className={containerClassNames}
         onClick={(event) => clickHandler(event)}>
      <div className='tile-dot middle-center'>{props.row} - {props.col}</div>

    </div>
  );
};

export default Tile;
