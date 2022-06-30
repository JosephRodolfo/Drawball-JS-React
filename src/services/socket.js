import { io } from "socket.io-client";
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
const updateSharedBoardFunc = (setUpdate, update) => {
  setUpdate(update);
};

const printSocketMessage = (message) => {
  console.log(message.text);
};

export const socketListenerCallbacks = {
  sharePosition,
  printSocketMessage,
  updateSharedBoardFunc,
};
