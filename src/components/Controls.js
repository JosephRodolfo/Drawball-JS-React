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
    //will probably move thsi below the the handlePlaceColor just in case to prevent errors once I fix html/css and positioning
    //at the moment loading moves map around which is annoying.

    setLoading(true);

    controller.handlePlaceColor.call(ship, token).then((result)=>{
      return result;

    });
  }
}
