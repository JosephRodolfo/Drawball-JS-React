export function useKeyPress(controller, ship, token, setState, { key }) {
  if (key === "a") {
    controller.playerMoveMainLogic(-10, 0, ship, token).then((result) => {
      setState(result);
    });
  }

  if (key === "d") {
    controller.playerMoveMainLogic(10, 0, ship, token).then((result) => {
      setState(result);
    });
  }

  if (key === "s") {
    controller.playerMoveMainLogic(0, 10, ship, token).then((result) => {
      setState(result);
    });
  }

  if (key === "w") {
    controller.playerMoveMainLogic(0, -10, ship, token).then((result) => {
      setState(result);
    });
  }

  if (key === " ") {
    controller.handlePlaceColor(ship, token);
  }
}
