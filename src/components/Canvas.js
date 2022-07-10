import { useRef, useEffect } from "react";
import { drawController } from "../utilities/canvasDrawing";
import { useSocketUpdates } from "./Hooks/socketHooks";

const Canvas = ({ ship, shareRealTime, maze }) => {






  








  const canvasRef = useRef(null);

  const requestRef = useRef(null);
  const { newGhostShipArray, newShip } = useSocketUpdates(ship, shareRealTime);

  useEffect(() => {
 

    function gameLoop() {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);

      if (newShip.position) {
        drawController.drawCurrentChunk.call(newShip, context);
        drawController.draw.call(newShip, context);
        newGhostShipArray.length !== 0 &&
          newGhostShipArray.forEach((ship) => {
            drawController.draw.call(ship, context);
          });
      }
      drawController.drawMaze.call(maze, context);
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [newShip, maze, newGhostShipArray]);

  return (
    <div className="canvas-wrapper">
      <canvas
        id="responsive-canvas"
        height={1010}
        width={1010}
        className="canvas"
        ref={canvasRef}
      />
    </div>
  );
};

export default Canvas;
