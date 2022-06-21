import Body from "./Ship";
import { createChunk, getChunk, updateChunk } from "../../actions/chunk";
import { updateShip } from "../../actions/ship";
import { useAuth } from "../AuthProvider";

import Chunk from "./Chunk";

export class GameController {
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

    const x = ship.position.x / 10;
    const y = ship.position.y / 10;
    ship.currentChunk.state[x][y] = ship.color;

    const newChunk = await updateChunk(token, {
      position: currentPosition,
      state: { x: x, y: y },
      color: color,
    });
    return newChunk;
  }

  async playerMoveMainLogic(x, y, ship, token) {
    // the steps that happen when a player moves
    // const newPosition = ship.move(x, y);
    const newPosition = this.move.call(ship, x, y);

    ship.position = newPosition;

    const offOrOnChunk = this.checkForOffBoard.call(ship, newPosition);

    // const offOrOnChunk = ship.checkForOffBoard(newPosition);
    if (!offOrOnChunk) {
      return ship;
    }
    const newOrOldChunk = await this.handlePlayerHittingNewChunk(
      ship,
      { x: x * 0.1, y: y * 0.1 },
      token
    );
    if (newOrOldChunk.length === 2) {
      console.log("new chunk");
      const newChunk = await createChunk(token, { position: newOrOldChunk });
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
      currentChunk: newOrOldChunk[0],
      position: { x: ship.position.x, y: ship.position.y },
    });

    this.mirrorMove.call(updatedShip);

    return updatedShip;
  }

  async handlePlayerHittingNewChunk(ship, chunk, token) {
    const testChunk = [
      ship.currentChunk.position[0] + chunk.x,
      ship.currentChunk.position[1] - chunk.y,
    ];

    const newChunk = await getChunk(token, { position: testChunk });

    if (newChunk) {
      return newChunk;
    }

    return testChunk; //array
  }
}
//sets color in state of chunk at array of array position of current square
export const controller = new GameController();
