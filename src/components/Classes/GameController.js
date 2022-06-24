import { createChunk, getChunk, updateChunk } from "../../actions/chunk";
import { updateShip } from "../../actions/ship";

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

  async handlePlaceColor(token) {
    const currentPosition = this.currentChunk.position;
    const color = this.color;

    const x = this.position.x * 0.1;
    const y = this.position.y * 0.1;
    const updatesObject = { color: color, coords: { x: x, y: y } };
    const indexOfMatch = this.currentChunk.state.findIndex((element) => {
      return (
        element.coords.x === x && element.coords.y === y
      );
    });
    if (indexOfMatch !== -1) {

      this.currentChunk.state.splice(indexOfMatch, 1, updatesObject);
    } else {

      this.currentChunk.state.unshift(updatesObject)
      // ship.currentChunk.state.pop()
        }
    const newChunk = await updateChunk(token, {
      position: currentPosition,
      state: updatesObject,
      preexisting: indexOfMatch !== -1 ? true : false,
    });
    return newChunk;
  }
//moves ship on arrow button click. Three return statements:
//1. If still on chunk, returns ship as it is, ship position moved one pixel.
//2. If on new chunk, creates new chunk, adds it to ship, and returns ship
//3. If preexisting chunk, loads it from database adds it to ship, and returns updated ship.
  async playerMoveMainLogic(x, y, ship, token) {
   

    const newPosition = this.move.call(ship, x, y);
    ship.position = newPosition;
    let offOrOnChunk = this.checkForOffBoard.call(ship);

    if (!offOrOnChunk) {
      return ship;
    }



    

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
      console.log("preexisting chunk");
      const updatedShip = await updateShip(token, ship._id, {
        currentChunk: newOrOldChunk[1],
        position: { x: ship.position.x, y: ship.position.y },
      });

      this.mirrorMove.call(updatedShip);
      return updatedShip;
  }
//checks if chunk exists or not in database. If it does not exist returns array [true, NewChunk(chunk object)]
//if chunk does not exist returns coordinates object for where to create chunk, e.g., [false, {x: 0, y: 0}] 
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
