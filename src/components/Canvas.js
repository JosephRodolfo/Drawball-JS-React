import { useRef, useEffect, useState } from "react";
import {
  getMousePosition,
  snapToGridLine,
} from "../utilities/getMousePosition";
import { GameController } from "./GameController";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [currentChunk, setCurrentChunk] = useState([0, 0]);

  let controller = new GameController();

  controller.createShip();
  controller.createChunk([0, 0]);
  const useKeyPress = function (targetKey) {

    function downHandler({ key }) {
      if (key === "ArrowLeft") {
        controller.playerMoveMainLogic(-10, 0);
      }

      if (key === "ArrowRight") {
        controller.playerMoveMainLogic(10, 0);

      }
      if (key === "ArrowDown") {
        controller.playerMoveMainLogic(0, 10);
     
      }

      if (key === "ArrowUp") {

        controller.playerMoveMainLogic(0, -10);

      }
    }

    const upHandler = ({ key }) => {
      if (key === targetKey) {
      }
    };

    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);

      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    });
  };

  useKeyPress();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    function gameLoop(timeStamp) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = "lightgrey";
      context.fillRect(0, 0, canvas.width, canvas.height);

      controller.ships[0].draw(context, "blue"); // Keep requesting new frames
      window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
  }, []);

  const mouseHandler = {
    handleClick(e) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const coords = snapToGridLine(getMousePosition(canvas, e));
      console.log(coords);
      // context.fillStyle = "red";
      // context.fillRect(coords.x, coords.y, 10, 10);
    },
  };
  return (
    <div>
      <h2>{currentChunk}</h2>
      <canvas
        onClick={mouseHandler.handleClick}
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
