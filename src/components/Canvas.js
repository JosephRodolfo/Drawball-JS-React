import { useRef, useEffect } from "react";


const Canvas = ({ ship }) => {
  const canvasRef = useRef(null);

  function draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
  }



  function drawCurrentChunk(ctx) {
    if(this.currentChunk){

      this.currentChunk.state.forEach((element, indexX) => {
        element.forEach((elementInner, indexY) => {
          if (elementInner) {
            ctx.fillStyle = this.currentChunk.state[indexX][indexY];
            ctx.fillRect(
              indexX * 10,
              indexY * 10,
              this.size.w,
              this.size.h
            );
          }
        });
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
    let drawChunk = drawCurrentChunk.bind(ship, context)
    function gameLoop() {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = "lightgrey";
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      if (ship.position) {
        drawChunk();
        
        drawShip();
      }
      window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
  }, [ship]);

  return (
    <div className="canvas-wrapper">
      <h3>Chunk position</h3>
      {ship.position ? (
        <p>{`x: ${ship.currentChunk.position[0]} y: ${ship.currentChunk.position[1]}`}</p>
      ) : (
        <p>0,0</p>
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
