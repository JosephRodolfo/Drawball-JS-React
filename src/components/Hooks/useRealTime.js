import { useEffect, useState } from "react";
import { socketListenerCallbacks, socket } from "../../services/socket";
import { socketUpdates } from "../../utilities/realTimeHelpers";

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

export const useSocketUpdates = (ship, ghostShip, shareRealTime) => {
  const [update, setUpdate] = useState({});
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
