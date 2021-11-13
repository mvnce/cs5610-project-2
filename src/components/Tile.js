import React from "react";
import "../styles/Tile.css";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../features/counterSlice";

const Tile = (props) => {

  const dispatch = useDispatch();

  const clickHandler = (event) => {
    console.log("tile click", props, event);
    dispatch(increment());
  }

  return (
    <div className="tile" onClick={(event) => clickHandler(event)}>
      {props.row} - {props.col}
    </div>
  );
};

export default Tile;
