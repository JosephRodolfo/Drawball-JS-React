export function useKeyPress ( controller, setState, {key} ){
  if (key === "ArrowLeft") {
let result = controller.playerMoveMainLogic(-10, 0);
    setState(result)

    
  }

  if (key === "ArrowRight") {
let result =  controller.playerMoveMainLogic(10, 0);

setState(result)

  }
  if (key === "ArrowDown") {
 let result =   controller.playerMoveMainLogic(0, 10);

 setState(result)


  }

  if (key === "ArrowUp") {
  let result =  controller.playerMoveMainLogic(0, -10);

  setState(result)

  }
};