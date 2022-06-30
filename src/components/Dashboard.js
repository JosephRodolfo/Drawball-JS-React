import Canvas from "../components/Canvas";
import ColorPicker from "../components/ColorPicker";

import { getSetInitialGameState } from "../utilities/getSetInitialGameState";
import { useEffect, useState } from "react";
import { keyPress, spacePress } from "./Controls";
import { useAuth } from "./AuthProvider";
import { setShipColor } from "../utilities/updateShipColor";
import { createHashIdFromCoords } from "../utilities/createHashFromId";
import {
  socket,
  socketListenerCallbacks,
  socketEmitter,
} from "../services/socket";
import { directionArrowToCoords } from "../utilities/directionArrowToCoords";

function Dashboard() {
  const [ship, setShip] = useState({});
  const [loading, setLoading] = useState(true);
  const [room, setCurrentRoom] = useState(null);
  const { token, id } = useAuth();
  const [shareRealTime, setShare] = useState(false);
  const [ghostShip, setGhostShip] = useState([]);

  useEffect(() => {
    getSetInitialGameState(token, id).then((returnedShip) => {
      const currentRoomdId = createHashIdFromCoords(
        returnedShip.chunkX,
        returnedShip.chunkY
      );
      setShip(returnedShip);
      setCurrentRoom(currentRoomdId);
      socketEmitter("join", { userId: id, room: currentRoomdId });
    });
    return () => {
      socketEmitter("leave", id);
    };
  }, [token, id]);

  const returnKey = ({ key }) => {
    const paramsArray = [ship, token, setLoading];
     if(key ===" ") {
      spacePress(paramsArray, (result) => {
        socketEmitter("sendUpdate", result);
      });
      return;
    }
      const direction = directionArrowToCoords(key);
      keyPress(paramsArray, direction, (result) => {
        //set returned ship in state after completing move
        setShip(result);
        const { chunkX, chunkY, color, size, _id, position } = result;
        const hashedRoomID = createHashIdFromCoords(chunkX, chunkY);
        //if another ship is present, send player coords
        shareRealTime && socketEmitter("sendUpdate", { position, _id, color, size });
        //if ship enters a new chunk, switch socket room and reset ghost ship array.
        //id-only object param in sendUpdates tells other players to delete player from their ghost ship array because they left chunk.
        if (hashedRoomID !== room) {
          setGhostShip([]);
          setCurrentRoom(hashedRoomID);
          socketEmitter("sendUpdate", { _id });
          socketEmitter("switch", { userId: id, room: hashedRoomID });
        }
    });
    return;

  };

  const updateShipColor = (updates) => {
    setShipColor.bind(ship, token, id, updates, setShip)();
  };

//socket listeners
//boundSharePosition recieves signal to start sharing position via socket because another player is in room. Any other time, server never knows player position, other than current chunk.
//boundShare recieves the coordinates for ghostShip array and to set in players current chunk array. 
//boundPrint was mostly for testing, just prints messages to console from socket
  useEffect(() => {
    const boundPrint = socketListenerCallbacks.printSocketMessage.bind(null);
    const boundShare = socketListenerCallbacks.updateSharedBoardFunc.bind(null, ship, setGhostShip, setShip, ghostShip);
    const boundSharePosition = socketListenerCallbacks.sharePosition.bind(null, setShare);
    socket.on("message", boundPrint);
    socket.on("transferCoords", boundShare);
    socket.on("startSharePosition", boundSharePosition);
    return () => {
      socket.off("startSharePosition", boundSharePosition);
      socket.off("transferCoords", boundShare);
      socket.off("message", boundPrint);
    };
  }, [ship, ghostShip]);

  return (
    <div
      className="dashboard"
      onKeyDown={!loading ? undefined : returnKey}
      tabIndex="0"
    >
      <div className="temp-page">
        {!loading ? <p>Loading Chunk</p> : <p>Chunk Ready</p>}
        <Canvas ghostShip={ghostShip} ship={ship} />
        <ColorPicker updateShipColor={updateShipColor} />
      </div>
    </div>
  );
}

export default Dashboard;
