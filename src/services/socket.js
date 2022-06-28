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
      const newGhostShipArray =
        index === -1
          ? [update, ...ghostShipCopy]
          : (ghostShipCopy[index] = update);
      setGhost(newGhostShipArray);
      return;
    }
  };

const printSocketMessage = (message) => {
    console.log(message.text);
  };

  export const socketListenerCallbacks = {
    sharePosition,
    printSocketMessage,
    updateSharedBoardFunc
  };


