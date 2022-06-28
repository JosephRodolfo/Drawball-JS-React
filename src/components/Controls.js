export async function useKeyPress(
  controller,
  ship,
  token,
  setLoading,
  resultsCallback,
  { key }
) {
  setLoading(false);

  if (key === "a") {
    controller
      .playerMoveMainLogic(-10, 0, ship, token)
      .then((result) => {
        resultsCallback(result);
      })
      .then((result) => {
        setLoading(true);
      });
  }

  if (key === "d") {
    controller
      .playerMoveMainLogic(10, 0, ship, token)
      .then((result) => {
        resultsCallback(result);
      })
      .then((result) => {
        setLoading(true);
      });
  }

  if (key === "s") {
    controller
      .playerMoveMainLogic(0, 10, ship, token)
      .then((result) => {
        resultsCallback(result);
      })
      .then((result) => {
        setLoading(true);
      });
  }

  if (key === "w") {
    controller
      .playerMoveMainLogic(0, -10, ship, token)
      .then((result) => {
        resultsCallback(result);
        setLoading(true);
      })
      .then((result) => {
        setLoading(true);
      });
  }

  if (key === " ") {
    controller.handlePlaceColor.call(ship, token).then((result) => {
      resultsCallback(result);
    }).then((result)=>{
      setLoading(true)
    });
  }
}
