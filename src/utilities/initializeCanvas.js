


export const initializeCanvas = (canvasRef, ship, chunk) => {

const canvas = canvasRef.current;
const context = canvas.getContext("2d");



function gameLoop() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = "lightgrey";
  context.fillRect(0, 0, canvas.width, canvas.height);
  ship.draw(context, "blue");
  chunk.drawChunk(context, chunk);

  window.requestAnimationFrame(gameLoop);
}

gameLoop();
}