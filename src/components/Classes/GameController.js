import { getChunk, updateChunk } from "../../actions/chunk";
import { updateShip } from "../../actions/ship";
import {
  returnDirection,
  returnLastDigit,
} from "../../utilities/returnDirection";




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

  checkForMazeWall(ship, x, y, maze, moveX, moveY) {
    const positionX = Math.floor(ship.position.x / 100);
    const positionY = Math.floor(ship.position.y / 100);
    if (!maze[positionY]) {
      return;
    }
    const currentCell = maze[positionY][positionX];
    const lastDigitX = returnLastDigit(x);
    const lastDigitY = returnLastDigit(y);

    const direction = returnDirection(moveX * 0.1, moveY * 0.1);

    if ((lastDigitX === 0 || lastDigitY === 0) && currentCell[direction]) {
      return true;
    }
//so player can't go straight down line on maze border
    if (lastDigitX === 0 && lastDigitY === 0) {
      return true;
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
    return newChunk;
  }

    placeColorInCurrentChunk(newChunk){

      const index = this.currentChunk.indexOf((element) => {
        return element._id === newChunk._id;
      });
      index === -1
        ? this.currentChunk.push(newChunk)
        : this.currentChunk.splice(index, 1, newChunk);
    }
  //On player move, x, y params are direction of move.
  //1. checks if off board, if not, returns ship in new position
  //2. if off board, gets new array of colored pixels from server, and updates ship's currentChunk state
  //with them for canvas to render. mirrorMove moves ship across board.
  async playerMoveMainLogic(x, y, ship, maze, token) {
    const newPosition = this.move.call(ship, x, y);

    const virtualPosition = this.move.call(ship, x, y);

    const hitWall = this.checkForMazeWall(
      ship,
      virtualPosition.x,
      virtualPosition.y,
      maze,
      x,
      y
    );
    if (hitWall) {
      console.log("hit wall?");
      // ship.position = {x: ship.position.x - x, y: ship.position.y - y}
      return ship;
    }
    ship.position = newPosition;
    const offOrOnChunk = this.checkForOffBoard.call(ship);
    if (!offOrOnChunk) {
      return ship;
    }
    const updatesObject = {
      chunkX: Math.floor(ship.chunkX + x * 0.1),
      chunkY: Math.floor(ship.chunkY - y * 0.1),
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
