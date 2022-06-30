import { useEffect, useState } from "react";
import { socketListenerCallbacks, socket } from "../../services/socket";
import { socketUpdates } from "../../utilities/realTimeHelpers";
//useShareRealTimeHook is socket listener for if anyone else is in room; returns true or false
export const useShareRealTime = () => {
  const [shareRealTime, setShare] = useState(false);
  const boundSharePosition = socketListenerCallbacks.sharePosition.bind(
    null,
    setShare
  );
  useEffect(() => {
    socket.on("startSharePosition", boundSharePosition);
    return () => {
      socket.off("startSharePosition", boundSharePosition);
    };
  });
  return shareRealTime;
};
//use socket updates recieves updates from other players, movement or placed pixels
//socketUpdates takes those updates and returns both the ghostArray(other players), or returns a new ship
//with updated currentChunk array (Array of pixels)
export const useSocketUpdates = (ship, shareRealTime) => {
  const [update, setUpdate] = useState({});
  const ghostShip = [];
  const boundShare = socketListenerCallbacks.updateSharedBoardFunc.bind(
    null,
    setUpdate
  );
  useEffect(() => {
    socket.on("transferCoords", boundShare);
    return () => {
      socket.off("transferCoords", boundShare);
    };
  });

  return socketUpdates(ship, ghostShip, update, shareRealTime);
};
