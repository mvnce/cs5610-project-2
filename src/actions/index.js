import { CLICK_TILE } from "../constants/ActionTypes";

export function clickTile(payload) {
  return { type: CLICK_TILE, payload };
}

export function getData() {
  return function (dispatch) {
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "DATA_LOADED", payload: json });
      });
  };
}
