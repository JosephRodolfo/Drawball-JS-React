export default class Body {
  constructor(size, mass, position) {
    this.position = position;
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
    this.mass = mass;
    this.size = size;
  }

  draw(ctx, color) {
    ctx.fillStyle = color;

    ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);

  }

  reset() {
    this.position.y = this.velocity.y = this.velocity.x = 0;
  }

  move(x, y) {
    this.position.x=x;
    this.position.y=y;
  }
}
