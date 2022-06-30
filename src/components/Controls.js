import { controller } from "./Classes/GameController";

//keyPress is pressing an arrow ship and moving ship. Returns moved ship for callback. 
export async function keyPress(params, direction, resultsCallback) {
  if (!direction){
    return;
  }
  const [ship, token, setLoading] = params;
  setLoading(false);
  const [x, y] = direction;
  controller
    .playerMoveMainLogic(x, y, ship, token)
    .then((result) => {
      resultsCallback(result);
    })
    .then((result) => {
      setLoading(true);
    });
}
//spacePress is pressing space and placing pixel. Returns placed pixel for callback. 

export const spacePress = (params, resultsCallback) => {
  const [ship, token, setLoading] = params;

  setLoading(false);

  controller.handlePlaceColor
    .call(ship, token)
    .then((result) => {
      resultsCallback(result);
    })
    .then((result) => {
      setLoading(true);
    });
};
