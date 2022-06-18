import { useRef, useEffect, useState } from "react";
import {
  getMousePosition,
  snapToGridLine,
} from "../utilities/getMousePosition";
import ViewController from "./ViewController";
import { controller } from "./GameController";
import { useKeyPress } from "./Controls";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [currentChunk, setCurrentChunk] = useState([0, 0]);
  const [disabledButton, setDisabledButton] = useState(false);




  const startGame=()=>{
    setDisabledButton(true);
  controller.createChunk([0, 0]);
  controller.createShip();
















  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");

  function gameLoop() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "lightgrey";
    context.fillRect(0, 0, canvas.width, canvas.height);
    controller.ships[0].draw(context, "blue");
    controller.drawChunk(context, currentChunk);

    window.requestAnimationFrame(gameLoop);
  }

  gameLoop();}

  let boundKeyPress = useKeyPress.bind(null, controller, (chunk) => {
    setCurrentChunk(chunk);
  });

  useEffect(() => {

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // context.fillStyle = "lightgrey";
    // context.fillRect(0, 0, canvas.width, canvas.height);



if(controller.ships[0]){
setCurrentChunk(controller.ships[0].currentChunk)
}
  }, [currentChunk]);

 

  return (
    <div className="canvas-wrapper" onKeyDown={boundKeyPress} tabIndex="0">
      <h2>{`${currentChunk.position} `}</h2>
      <p>State: {currentChunk.state}</p>
      <canvas
        height="1010px"
        width="1010px"
        className="canvas"
        ref={canvasRef}
        {...props}
      />
      <button disabled={disabledButton}onClick={startGame}>Button</button>
      <button onClick={()=>{
        console.log(controller)
      }}>check everything</button>
    </div>
  );
};

export default Canvas;
