import Canvas from "../components/Canvas";
import ColorPicker from "../components/ColorPicker";

import { getSetInitialGameState } from "../utilities/getSetInitialGameState";
import { useEffect, useState } from "react";
import { useKeyPress } from "./Controls";
import { GameController } from "./Classes/GameController";
import { useAuth } from "./AuthProvider";
import { setShipColor } from "../utilities/updateShipColor";
import { createHashIdFromCoords } from "../utilities/createHashFromId";
import { socket, socketListenerCallbacks, socketEmitter } from "../services/socket"; 

function Dashboard() {
  const [ship, setShip] = useState({});
  const [loading, setLoading] = useState(true);
  const [controller, setController] = useState({});
  const [room, setCurrentRoom] = useState(null);
  const { token, id } = useAuth();
  const [shareRealTime, setShare] = useState(false);
  const [ghostShip, setGhostShip] = useState([]);

  useEffect(() => {
    getSetInitialGameState(token, id).then((returnedShip) => {
      const currentRoomdId = createHashIdFromCoords(returnedShip.chunkX, returnedShip.chunkY);
      setShip(returnedShip);
      setCurrentRoom(currentRoomdId);
      socketEmitter("join", { userId: id, room: currentRoomdId });
    });
    const controller = new GameController();
    setController(controller);
    return () => {
      socketEmitter("leave", id);
    };
  }, [token, id]);

  const boundKeyPress = useKeyPress.bind(null, controller, ship, token, setLoading, (result) => {
    
      const {chunkX, chunkY, currentChunk, color, size, _id, position, sessionId} = result;  
      const hashedRoomID = createHashIdFromCoords(chunkX, chunkY);
    
      //if another ship is present, send player coords
      if (shareRealTime && currentChunk) {
        socketEmitter("sendUpdate", {
          position,
          _id,
          color,
          size,
        });
      }
      //if result is a ship, set ship
      if (currentChunk) {
        setShip(result);
      }
      //if ship enters a new chunk, switch socket room and reset ghost ship array. 
      //id only object param in sendUpdates tells other players to delete player from their ghost ship array because they left chunk. 
      if (currentChunk && hashedRoomID !== room) {
        setGhostShip([]);
        setCurrentRoom(hashedRoomID);
        socketEmitter("sendUpdate", { _id });
        socketEmitter("switch", { userId: id, room: hashedRoomID });
      }
      //result.sessionId is color placing. sends updates to other players
      if (sessionId) {
        socketEmitter("sendUpdate", result);
      }
      return result;
    }
  );

  const updateShipColor = (updates) => {
    setShipColor.bind(ship, token, id, updates, setShip)();
  };

  useEffect(() => {
    const boundPrint = socketListenerCallbacks.printSocketMessage.bind(null)
    const boundShare = socketListenerCallbacks.updateSharedBoardFunc.bind(null, ship, setGhostShip, setShip, ghostShip)
    const boundSharePosition = socketListenerCallbacks.sharePosition.bind(null, setShare)
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
      onKeyDown={!loading ? undefined : boundKeyPress}
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
