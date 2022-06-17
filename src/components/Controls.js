export function useKeyPress ( controller, setState, {key} ){
  if (key === "a") {
let result = controller.playerMoveMainLogic(-10, 0);
    setState(result)

    
  }

  if (key === "d") {
let result =  controller.playerMoveMainLogic(10, 0);

setState(result)

  }
  if (key === "s") {
 let result =   controller.playerMoveMainLogic(0, 10);

 setState(result)


  }

  if (key === "w") {
  let result =  controller.playerMoveMainLogic(0, -10);

  setState(result)


  }

  if (key===" "){
    controller.handlePlaceColor();
  }
};