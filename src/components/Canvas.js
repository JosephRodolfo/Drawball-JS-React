import { useRef, useEffect } from "react";

const Canvas = ({ ship }) => {
  const canvasRef = useRef(null);

  function draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
  }

  function drawCurrentChunk(ctx) {
    if (this.currentChunk) {
      this.currentChunk.state.forEach((element, index) => {
        if (element === null){
          return;
        }
        ctx.fillStyle = element.color
        ctx.fillRect(
          element.coords.x * 10,
          element.coords.y * 10,
          this.size.w,
          this.size.h
        );
      });
    } else {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "lightgrey";
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let drawShip = draw.bind(ship, context);
    let drawChunk = drawCurrentChunk.bind(ship, context);
    function gameLoop(running) {
      if(running===true){
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = "lightgrey";
      context.fillRect(0, 0, canvas.width, canvas.height);

      if (ship.position) {
        drawChunk();

        drawShip();
      }
      window.requestAnimationFrame(()=>{gameLoop(true)});
    }
    }

    gameLoop(true);

    return ()=>{
      gameLoop(false)
    }
  }, [ship]);

  return (
    <div className="canvas-wrapper">
      <h3>Chunk position</h3>
      {ship.position ? (
        <p>{`x: ${ship.currentChunk.position.x} y: ${ship.currentChunk.position.y}`}</p>
      ) : (
        <p>0,0</p>
      )}

      <canvas
        height="1000px"
        width="1000px"
        className="canvas"
        ref={canvasRef}
      />
    </div>
  );
};

export default Canvas;
