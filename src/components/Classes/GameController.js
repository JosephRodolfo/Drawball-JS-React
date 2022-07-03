import { getChunk, updateChunk } from "../../actions/chunk";
import { updateShip } from "../../actions/ship";
import { returnDirection } from "../../utilities/returnDirection";


export class GameController {
  mirrorMove() {
    if (this.position.x < 0) {
      this.position.x = this.position.x + 1010;
    } else if (this.position.x > 1000) {
      this.position.x = this.position.x - 1010;
    } else if (this.position.y > 1000) {
      this.position.y = this.position.y - 1010;
    } else if (this.position.y < 0) {
      this.position.y = this.position.y + 1010;
    }
  }

  move(x, y) {
    return { x: this.position.x + x, y: this.position.y + y };
  }

  checkForOffBoard() {
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

  checkForMazeWall(maze, x, y){
    const lastDigitX = this.position.x % 10;
    const lastDigitY = this.position.y % 10;
    if (!lastDigitX === 0 || !lastDigitY ===0){
      return;
    }
    const cell = maze[this.position.x *.1][this.position.y *.1];
    const direction = returnDirection(x, y);
    if (cell[direction]){
      return;
    }
  }

  async handlePlaceColor(token) {
    const newChunk = await updateChunk(token, {
      x: this.position.x * 0.1,
      y: this.position.y * 0.1,
      chunkX: this.chunkX,
      chunkY: this.chunkY,
      color: this.color,
    });
      const index = this.currentChunk.indexOf((element)=>{return element._id === newChunk._id})
      index ===-1 ? this.currentChunk.push(newChunk) : this.currentChunk.splice(index, 1, newChunk);
      

    return newChunk;
  }
//On player move, x, y params are direction of move. 
//1. checks if off board, if not, returns ship in new position
//2. if off board, gets new array of colored pixels from server, and updates ship's currentChunk state
//with them for canvas to render. mirrorMove moves ship across board.  
  async playerMoveMainLogic(x, y, ship, token) {
    const newPosition = this.move.call(ship, x, y);
    ship.position = newPosition;
    const offOrOnChunk = this.checkForOffBoard.call(ship);

    if (!offOrOnChunk) {
      return ship;
    }
    const updatesObject = {
      chunkX: ship.chunkX + x * 0.1,
      chunkY: ship.chunkY - y * 0.1,
    };

    const chunkState = await getChunk(token, updatesObject);
    const updatedShip = await updateShip(token, ship._id, {
      currentChunk: chunkState,
      ...updatesObject,
      position: ship.position,
    });
    this.mirrorMove.call(updatedShip);
    return updatedShip;
  }
}
export const controller = new GameController();
