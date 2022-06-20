import Body from "./Ship";
import { createChunk } from "../../actions/chunk";
import { useAuth } from "../AuthProvider";
import { checkForExistingChunk } from "../../utilities/checkForExistingChunk";
import {
  searchForArray,
  returnIndexChunkMatchingId,
} from "../../utilities/searchForArray";
import Chunk from "./Chunk";



export class GameController {



  async playerMoveMainLogic(x, y, ship, token){



  
  // the steps that happen when a player moves
    const newPosition = ship.move(x, y);
    ship.position = newPosition;
    const offOrOnChunk = ship.checkForOffBoard(newPosition);
    if (!offOrOnChunk) {
      return ship;
    }
    const newOrOldChunk = await this.handlePlayerHittingNewChunk(
      ship,
      {
        x: x / 10,
        y: y / 10,
      },
      token
    )

    if (newOrOldChunk) {
      //returns Pre-existing chunk object, load and set state in canvas;
      ship.currentChunk = newOrOldChunk;
      ship.mirrorMove();

      return ship;
    }

    //not already existing chunk, create new one, load and set state in canvas, sets in ship's state, returns new chunk object
   let newChunk = await createChunk(token, {position: [x / 10, y / 10]})
    ship.currentChunk = newChunk;
    ship.mirrorMove();
    return ship;
  }
  
  async handlePlayerHittingNewChunk(ship, chunk, token) {
    let testChunk = [
      ship.currentChunk.position[0] + chunk.x,
      ship.currentChunk.position[1] - chunk.y,
    ];
    let newChunk = await checkForExistingChunk(token, {position: testChunk});
    return newChunk;
  }
}
  //sets color in state of chunk at array of array position of current square
export const controller = new GameController();
