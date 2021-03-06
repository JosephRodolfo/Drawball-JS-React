import { controller } from "./Classes/GameController";
import { directionArrowToCoords } from "../utilities/directionArrowToCoords";

//keyPress is pressing an arrow ship and moving ship. Returns moved ship for callback. 
export async function moveShip(params, maze, key, resultsCallback) {
  const direction = directionArrowToCoords(key);

  if (!direction){
    return;
  }
  const [ship, token, setLoading] = params;
  setLoading(false);
  const [x, y] = direction;
   const result = await controller.playerMoveMainLogic(x, y, ship, maze, token)
   resultsCallback(result);
   setLoading(true);
}
//spacePress is pressing space and placing pixel. Returns placed pixel for callback. 

export const placeColor = async (params, resultsCallback) => {
  const [ship, token, setLoading] = params;
  setLoading(false);
  const result = await controller.handlePlaceColor.call(ship, token);
  if (!result){
    setLoading(true);
    return;
  }
  const {chunk, inkLevel} = result
  ship.inkLevel = inkLevel;
  controller.placeColorInCurrentChunk.call(ship, chunk);
  resultsCallback(chunk, ship);
  setLoading(true);
};
