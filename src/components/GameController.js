import Body from "./Classes/Body";
import { searchForArray } from "../utilities/searchForArray";
import Chunk from "./Classes/Chunk";
export class GameController {
  constructor() {
    this.ships = [];
    this.chunks = [];
  }
//the steps that happen when a player moves
  playerMoveMainLogic(x, y){
    const newPosition = this.ships[0].move(x, y);
    const offOrOnChunk = this.ships[0].checkForOffBoard(newPosition);
    //checks if player left the board
    if(!offOrOnChunk){
        return;
    } //if hit player has left board, checks if this is a new or preexisting; chunk  
    this.handlePlayerHittingNewChunk({x: x/10, y: y/10})


  }

  createShip() {
    let ship = new Body({ h: 10, w: 10 }, 10, { x: 0, y: 0 }, [0, 0]);
    this.ships.push(ship);
  }

  createChunk(position) {
    let chunk = new Chunk(position);
    this.chunks.push(chunk);
  }
  handlePlayerHittingNewChunk(chunk) {
    if (chunk.x !==0) {
      let testChunk  =[this.ships[0].currentChunk[0] + chunk.x, this.ships[0].currentChunk[1]];
        console.log(testChunk)
      checkForExistingChunk(this.chunks, testChunk);
    } else {
        //I'm not sure why this needed to be minus y, but i will investigage
      let testChunk = [this.ships[0].currentChunk[0], this.ships[0].currentChunk[1] - chunk.y];
      console.log(testChunk)

      checkForExistingChunk(this.chunks, testChunk);
    }

    function checkForExistingChunk(array, chunk) {
      let result = searchForArray(array, chunk);
      if (result === -1) {
        console.log(chunk, "new chunk");
        return chunk;
      } else {
        console.log(chunk, "old chunk");
      }
    }
  }
}
