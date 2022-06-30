import { useRef, useEffect } from "react";
import { drawController } from "../utilities/canvasDrawing";
import { useSocketUpdates } from "./Hooks/socketHooks";

const Canvas = ({ ship, shareRealTime }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const {newGhostShipArray, newShip} = useSocketUpdates(ship, shareRealTime)

  useEffect(() => {

  function gameLoop() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "lightgrey";
    context.fillRect(0, 0, canvas.width, canvas.height);
    if (newShip.position) {
      drawController.drawCurrentChunk.call(newShip, context);
      drawController.draw.call(newShip, context);
      newGhostShipArray.length !==0 && newGhostShipArray.forEach((ship)=>{drawController.draw.call(ship, context)})
    }
    requestRef.current = requestAnimationFrame(gameLoop);
  }

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [newShip, newGhostShipArray]);

  return (
    <div className="canvas-wrapper">
      {newShip.position ? (
        <div>
        <h3>Chunk position: {`x: ${newShip.chunkX} y: ${newShip.chunkY}`}</h3>
        <p>Ship position: {`x: ${newShip.position.x} y: ${newShip.position.y}`}</p>
        </div>
      ) : (
        <p>No ship found</p>
      )}

      <canvas
        height="1010px"
        width="1010px"
        className="canvas"
        ref={canvasRef}
      />
    </div>
  );
};

export default Canvas;
