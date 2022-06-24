export function useKeyPress(
  controller,
  ship,
  token,
  setState,
  setLoading,
  { key }
) {
  setLoading(false);

  if (key === "a") {
    controller.playerMoveMainLogic(-10, 0, ship, token).then((result) => {
      setState(result);
      setLoading(true);
    });
  }

  if (key === "d") {
    controller.playerMoveMainLogic(10, 0, ship, token).then((result) => {
      setState(result);
      setLoading(true);
    });
  }

  if (key === "s") {
    controller.playerMoveMainLogic(0, 10, ship, token).then((result) => {
      setState(result);
      setLoading(true);
    });
  }

  if (key === "w") {
    controller.playerMoveMainLogic(0, -10, ship, token).then((result) => {
      setState(result);
      setLoading(true);
    });
  }

  if (key === " ") {
    controller.handlePlaceColor.call(ship, token);
  }
}
