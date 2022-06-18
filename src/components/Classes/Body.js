export default class Body {
  constructor(size, mass, position, currentChunk) {
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
    this.mass = mass;
    this.size = size;
    this.color = "blue"
    this.currentChunk = currentChunk;
  }

  draw(ctx, color) {
    ctx.fillStyle = this.color;

    ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
  }
  //sets players position with new coords and returns new coords.
  move(x, y) {
    this.position.x = this.position.x + x;
    this.position.y = this.position.y + y;

    return this.position;
  }

  checkForOffBoard(position) {
    if (
      this.position.x < 0 ||
      this.position.x > 1000 ||
      this.position.y < 0 ||
      this.position.y > 1000
    ) {
      return true;
    }
    return false;
  }

  mirrorMove() {
    if (this.position.x < 0) {
      this.position.x = this.position.x + 1000;
    } else if (this.position.x > 1000) {
      this.position.x = this.position.x - 1000;
    } else if (this.position.y > 1000) {
      this.position.y = this.position.y - 1000;
    } else if (this.position.y < 0) {
      this.position.y = this.position.y + 1000;
    }
  }
}
