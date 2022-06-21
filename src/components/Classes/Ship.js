export default class Ship {
  constructor(size, position, currentChunk, inkLevel, color, owner) {
    this.position = position;
    this.size = size;
    this.color = color;
    this.currentChunk = currentChunk;
    this.inkLevel = inkLevel;
    this.owner= owner;
    this.sleeping = false;
  }



  //sets players position with new coords and returns new coords.
  // move(x, y) {
  //   return {x: this.position.x + x, y: this.position.y + y}
  // }

  // checkForOffBoard(position) {
  //   if (
  //     this.position.x < 0 ||
  //     this.position.x > 1000 ||
  //     this.position.y < 0 ||
  //     this.position.y > 1000
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  // mirrorMove() {
  //   if (this.position.x < 0) {
  //     this.position.x = this.position.x + 1000;
  //   } else if (this.position.x > 1000) {
  //     this.position.x = this.position.x - 1000;
  //   } else if (this.position.y > 1000) {
  //     this.position.y = this.position.y - 1000;
  //   } else if (this.position.y < 0) {
  //     this.position.y = this.position.y + 1000;
  //   }
  // }
}
