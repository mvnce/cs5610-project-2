import { ACTION_TYPE } from "../constants";

export function clickTile(payload) {
  return { type: ACTION_TYPE.CLICK_TILE, payload };
}
