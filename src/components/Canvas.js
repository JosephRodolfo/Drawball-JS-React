import { useRef, useEffect } from "react";
import { drawController } from "../utilities/canvasDrawing";

const Canvas = ({ ship }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  useEffect(() => {

  function gameLoop() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "lightgrey";
    context.fillRect(0, 0, canvas.width, canvas.height);
    if (ship.position) {
      drawController.drawCurrentChunk.call(ship, context);
      drawController.draw.call(ship, context);
    }
    requestRef.current = requestAnimationFrame(gameLoop);
  }

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [ship]);

  return (
    <div className="canvas-wrapper">
      <h3>Chunk position</h3>
      {ship.position ? (
        <div>
        <p>Chunk position: {`x: ${ship.chunkX} y: ${ship.chunkY}`}</p>
        <p>Ship position: {`x: ${ship.position.x} y: ${ship.position.y}`}</p>
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
