function draw(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.position.x, this.position.y, this.size.w = 10, this.size.h = 10);
}
function drawCurrentChunk(ctx) {
  if (this.currentChunk) {
    this.currentChunk.forEach((element) => {

      ctx.fillStyle = element.color;
      ctx.fillRect(
        element.x * 10,
        element.y * 10,
        this.size.w,
        this.size.h
      );
    });
  } else {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "lightgrey";
  }
}

function drawMaze(ctx){

  this.forEach((row)=>{
    row.forEach((cell)=>{

      const cellX = cell.x * 100 + 5;
      const cellY = cell.y * 100 + 5;
      cell.top && drawLine(ctx, {x: cellX, y: cellY}, {x: cellX + 100, y: cellY})
      cell.bottom && drawLine(ctx, {x: cellX, y: cellY + 100}, {x: cellX + 100, y: cellY + 100})
      cell.right && drawLine(ctx, {x: cellX + 100, y: cellY}, {x: cellX + 100, y: cellY + 100})      
      cell.left && drawLine(ctx, {x: cellX, y: cellY}, {x: cellX, y: cellY + 100})
    })
function drawLine(ctx, start, end){
ctx.beginPath();
ctx.strokeStyle = 'blue';
ctx.moveTo(start.x, start.y);
ctx.lineTo(end.x, end.y);
ctx.stroke();
}
  })

}

export const drawController = {
    draw,
    drawCurrentChunk,
    drawMaze
  };
