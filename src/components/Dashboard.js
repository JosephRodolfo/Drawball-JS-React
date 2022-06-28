import Canvas from "../components/Canvas";
import ColorPicker from "../components/ColorPicker";

import { getSetInitialGameState } from "../utilities/getSetInitialGameState";
import { useEffect, useState } from "react";
import { useKeyPress } from "./Controls";
import { GameController } from "./Classes/GameController";
import { useAuth } from "./AuthProvider";
import { socket } from "../services/socket";
import { setShipColor } from "../utilities/updateShipColor";
import { findStateMatch } from "../utilities/realTimeHelpers";
import { createHashIdFromCoords } from "../utilities/createHashFromId";

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
      const currentRoomdId =
        returnedShip.currentChunk.length !== 0
          ? returnedShip.currentChunk[0].sessionId
          : createHashIdFromCoords(returnedShip.chunkX, returnedShip.chunkY);
      setShip(returnedShip);
      setCurrentRoom(currentRoomdId);
      socket.emit("join", { userId: id, room: currentRoomdId }, (error) => {
        if (error) {
          alert(error);
        }
      });
    });
    const controller = new GameController();
    setController(controller);

    return () => {
      socket.emit("leave", id);
    };
  }, [token, id]);

  const boundKeyPress = useKeyPress.bind(
    null,
    controller,
    ship,
    token,
    setLoading,
    (result) => {
      const hashedRoomID = createHashIdFromCoords(result.chunkX, result.chunkY);
      if (result.currentChunk) {
        if (shareRealTime) {
          sendUpdates({
            position: result.position,
            _id: result._id,
            color: result.color,
            size: result.size,
          });
        }
        setShip(result);
      }
      if (result.currentChunk && hashedRoomID !== room) {
        setGhostShip([]);
        setCurrentRoom(hashedRoomID);
        sendUpdates({ _id: result._id });
        socket.emit("switch", { userId: id, room: hashedRoomID }, (error) => {
          if (error) {
            alert(error);
          }
        });
      }
      if (result.sessionId) {
        sendUpdates(result);
      }
      return result;
    }
  );

  const updateShipColor = (updates) => {
    setShipColor.bind(ship, token, id, updates, setShip)();
  };

  function sendUpdates(update) {
    socket.emit("sendUpdate", update, (error) => {
      if (error) {
        return console.log(error);
      }
    });
  }

  useEffect(() => {
    socket.on("message", printSocketMessage);
    socket.on("transferCoords", updateSharedBoardFunc);
    socket.on("startSharePosition", sharePosition);
    return () => {
      socket.off("startSharePosition", sharePosition);

      socket.off("transferCoords", updateSharedBoardFunc);
      socket.off("message", printSocketMessage);
    };
  }, [ship]);

  const sharePosition = (state) => {
    setShare(state);
  };

  const updateSharedBoardFunc = (update) => {
    const newShip = findStateMatch(ship, update);
    setShip(newShip);
    if (!update.sessionId) {
      const index = ghostShip.findIndex((element) => element._id === update._id);
      const ghostShipCopy = ghostShip;

      if (!update.position) {
        ghostShipCopy.splice(index, 1);
        setGhostShip(ghostShipCopy);
        return;
      }
      const newGhostShipArray =
        index === -1
          ? [update, ...ghostShipCopy]
          : (ghostShipCopy[index] = update);
      setGhostShip(newGhostShipArray);
      return;
    }
  };

  const printSocketMessage = (message) => {
    console.log(message.text);
  };

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
