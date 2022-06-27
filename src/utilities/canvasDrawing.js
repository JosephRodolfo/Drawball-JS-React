function draw(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
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

export const drawController = {
    draw,
    drawCurrentChunk,
  };
