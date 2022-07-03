export function returnDirection(x: number, y: number): string {
    if (x === 1 && y ===0){
      return "right";
    }
    else if (x === -1 && y ===0){
      return "left";
    }
    else if (x === 0 && y ===1){
      return "bottom";
    }
     else
      return "top";

}