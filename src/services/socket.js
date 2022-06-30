import { io } from "socket.io-client";
import { findStateMatch } from "../utilities/realTimeHelpers";
export const socket = io(process.env.REACT_APP_PORT);

export function socketEmitter(listener, update) {
  socket.emit(listener, update, (error) => {
    if (error) {
      return console.log(error);
    }
  });
}

const sharePosition = (setShareState, state) => {
  setShareState(state);
};
//callback on receiving signal from socket.io. 1. Recieves an update object for ship array for pixels placed by other players and returns
//Or if there is no sessionId, indidcates it's the coordinates of another player to set in ghostShip. 
//first if statement indicates player has left. 
const updateSharedBoardFunc = (ship, setGhost, setShip, ghostShip, update) => {
  const newShip = findStateMatch(ship, update);
  setShip(newShip);
  if (!update.sessionId) {
    const index = ghostShip.findIndex((element) => element._id === update._id);
    const ghostShipCopy = ghostShip;

    if (!update.position) {
      ghostShipCopy.splice(index, 1);
      setGhost(ghostShipCopy);
      return;
    }

    if (index === -1) {
      const newGhostShipArray = [update, ...ghostShipCopy];
      setGhost(newGhostShipArray);
      return;
    }

    ghostShipCopy.splice(index, 1, update);

    setGhost(ghostShipCopy);
    return;
  }
};

const printSocketMessage = (message) => {
  console.log(message.text);
};

export const socketListenerCallbacks = {
  sharePosition,
  printSocketMessage,
  updateSharedBoardFunc,
};
