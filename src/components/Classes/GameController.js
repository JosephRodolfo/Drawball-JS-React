import { createChunk, getChunk, updateChunk } from "../../actions/chunk";
import { updateShip } from "../../actions/ship";

export class GameController {
  constructor() {
    this.pause = false;
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

  async handlePlaceColor(ship, token) {
    const currentPosition = ship.currentChunk.position;
    const color = ship.color;

    const x = ship.position.x * 0.1;
    const y = ship.position.y * 0.1;
    const updatesObject = { color: color, coords: { x: x, y: y } };
    const indexOfMatch = ship.currentChunk.state.findIndex((element) => {
      return (
        element.coords.x === x && element.coords.y === y
      );
    });
    console.log(indexOfMatch)
    if (indexOfMatch !== -1) {
      console.log('old one')

      ship.currentChunk.state.splice(indexOfMatch, 1, updatesObject);
    } else {
      console.log('new one')

      ship.currentChunk.state.unshift(updatesObject)
      // ship.currentChunk.state.pop()
        }
    const newChunk = await updateChunk(token, {
      position: currentPosition,
      state: updatesObject,
      preexisting: indexOfMatch !== -1 ? true : false,
    });
    return newChunk;
  }

  async playerMoveMainLogic(x, y, ship, token) {
    let offOrOnChunk = this.checkForOffBoard.call(ship);
    const newPosition = this.move.call(ship, x, y);

    ship.position = newPosition;

    if (!offOrOnChunk) {
      this.pause = false;
      return ship;
    }
    this.pause = true;

    if (this.pause) {
      const newOrOldChunk = await this.handlePlayerHittingNewChunk(
        ship,
        { x: x * 0.1, y: y * 0.1 },
        token
      );
      if (newOrOldChunk[0] === false) {
        console.log(newOrOldChunk[1]);
        console.log("new chunk");
        const newChunk = await createChunk(token, {
          position: newOrOldChunk[1],
        });
        const updatedShip = await updateShip(token, ship._id, {
          currentChunk: newChunk,
          position: { x: ship.position.x, y: ship.position.y },
        });

        this.mirrorMove.call(updatedShip);
        return updatedShip;
      }
      //not already existing chunk, create new one, load and set state in canvas, sets in ship's state, returns new chunk object
      console.log("preexisting chunk");
      //returns Pre-existing chunk object, load and set state in canvas;
      const updatedShip = await updateShip(token, ship._id, {
        currentChunk: newOrOldChunk[1],
        position: { x: ship.position.x, y: ship.position.y },
      });

      this.mirrorMove.call(updatedShip);

      return updatedShip;
    }
  }

  async handlePlayerHittingNewChunk(ship, chunk, token) {
    const testChunk = {
      x: ship.currentChunk.position.x + chunk.x,
      y: ship.currentChunk.position.y - chunk.y,
    };
    const newChunk = await getChunk(token, { position: testChunk });

    if (newChunk) {
      return [true, newChunk];
    }

    return [false, testChunk]; //object with coordinates for where new chunk should be 
  }
}
//sets color in state of chunk at array of array position of current square
export const controller = new GameController();
