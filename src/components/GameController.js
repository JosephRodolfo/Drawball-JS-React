import Body from "./Classes/Body";
import { searchForArray } from "../utilities/searchForArray";
import Chunk from "./Classes/Chunk";

export class GameController {
  constructor() {
    this.ships = [];
    this.chunks = [];
  }

  //the steps that happen when a player moves
  playerMoveMainLogic(x, y) {
    const newPosition = this.ships[0].move(x, y);
    const offOrOnChunk = this.ships[0].checkForOffBoard(newPosition);
    //checks if player left the board
    if (!offOrOnChunk) {
      //player didn't leave board, return
      return this.ships[0].currentChunk;
    } //if hit player has left board, checks if this is a new or preexisting; chunk

    const newOrOldChunk = this.handlePlayerHittingNewChunk({
      x: x / 10,
      y: y / 10,
    });
    console.log(newOrOldChunk)
    if (!newOrOldChunk) {
      //returns Pre-existing chunk object, load and set state in canvas;
      console.log('oldchunk')
      return newOrOldChunk;
    }
    //not already existing chunk, create new one, load and set state in canvas, sets in ship's state, returns new chunk object
    let newChunk = this.createChunk(newOrOldChunk);
    this.ships[0].currentChunk = newChunk;
    this.ships[0].mirrorMove();

    return newOrOldChunk;
  }

  createShip() {
    let ship = new Body({ h: 10, w: 10 }, 10, { x: 0, y: 0 }, this.chunks[0]);
    this.ships.push(ship);
  }

  createChunk(position) {
    let chunk = new Chunk(position);
    this.chunks.push(chunk);
    return chunk;
  }
  handlePlayerHittingNewChunk(chunk) {
    if (chunk.x !== 0) {
      let testChunk = [
        this.ships[0].currentChunk.position[0] + chunk.x,
        this.ships[0].currentChunk.position[1],
      ];
      return checkForExistingChunk(this.chunks, testChunk);
    } else {
      //I'm not sure why this needed to be minus y, but i will investigage
      let testChunk = [
        this.ships[0].currentChunk.position[0],
        this.ships[0].currentChunk.position[1] - chunk.y,
      ];

      return checkForExistingChunk(this.chunks, testChunk);
    }
    //checks for esting array, either returns position for new Chunk to be created, or the pre-existing chunk object itself
    function checkForExistingChunk(array, chunk) {
      let result = searchForArray(array, chunk);
      if (result === -1) {
         console.log(chunk, "new chunk");
         //!!!!!!!!!!!!!!! The problem is right now both of these return the same thing,
        return chunk;
      } else {
        console.log(array[result].position, "pre-existing chunk");

        return array[result].position;
      }
    }
  }
  //sets color in state of chunk at array of array position of current square
  handlePlaceColor() {
    let chunkToColor = this.chunks.findIndex((element) => {
      return element.id === this.ships[0].currentChunk.id;
    });
    let x = this.ships[0].position.x / 10;
    let y = this.ships[0].position.y / 10;
    this.chunks[chunkToColor].state[x][y] = this.ships[0].color;
  }

  drawChunk(ctx) {
    let chunkToColor = this.chunks.findIndex((element) => {
      return element.id === this.ships[0].currentChunk.id;
    });
    if(chunkToColor!==-1){

    this.chunks[chunkToColor].state.forEach((element, indexX) => {
      element.forEach((elementInner, indexY) => {
        if (elementInner) {
          ctx.fillStyle=this.ships[0].color
          ctx.fillRect(
            indexX * 10,
            indexY * 10,
            this.ships[0].size.w,
            this.ships[0].size.h
          );
        }
      });
    });

  }
  }
}

export const controller = new GameController();

// draw(ctx, color) {
//   ctx.fillStyle = this.color;

//   ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
// }
