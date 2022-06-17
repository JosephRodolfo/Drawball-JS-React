import { useRef, useEffect, useState } from "react";
import {
  getMousePosition,
  snapToGridLine,
} from "../utilities/getMousePosition";
import ViewController from "./ViewController";
import { controller } from "./GameController";
import {useKeyPress} from "./Controls"

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [currentChunk, setCurrentChunk] = useState(false);
  const [testState, setTestState] = useState(false)

  let viewController = new ViewController();

  controller.createChunk([0, 0]);
  controller.createShip();

let boundKeyPress = useKeyPress.bind(null, controller, (chunk)=>{
  setCurrentChunk(chunk)
})







  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");


    function gameLoop() {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = "lightgrey";
      context.fillRect(0, 0, canvas.width, canvas.height);

      controller.ships[0].draw(context, "blue");     
       window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
  }, []);

  return (
    <div className="canvas-wrapper"
    onKeyDown={boundKeyPress}
    tabIndex="0">
      <h2>{currentChunk.position}</h2>
      <canvas
        height="1000px"
        width="1000px"
        className="canvas"
        ref={canvasRef}
        {...props}
      />
      <button>Button</button>
    </div>
  );
};

export default Canvas;
