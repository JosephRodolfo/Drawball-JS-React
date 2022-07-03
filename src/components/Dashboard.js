import Canvas from "../components/Canvas";
import ColorPicker from "../components/ColorPicker";

import { getSetInitialGameState } from "../utilities/getSetInitialGameState";
import { useEffect, useState } from "react";
import { keyPress, spacePress } from "./Controls";
import { useAuth } from "./AuthProvider";
import { setShipColor } from "../utilities/updateShipColor";
import { createHashIdFromCoords } from "../utilities/createHashFromId";
import {socketEmitter} from "../services/socket";
import { useShareRealTime } from "./Hooks/socketHooks";
import generator from "generate-maze";
import {hashids} from "../utilities/createHashFromId";


function Dashboard() {
  const [ship, setShip] = useState({});
  const [loading, setLoading] = useState(true);
  const [room, setCurrentRoom] = useState(null);
  const { token, id } = useAuth();
  const [maze, setMaze] = useState([]);
  const shareRealTime = useShareRealTime();

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
    key === " " && spacePress(paramsArray, (result) => {
        socketEmitter("sendUpdate", result);
        return;
      });
    
      keyPress(paramsArray, maze, key, (result) => {
        //set returned ship in state after completing move
        setShip(result);
        const { chunkX, chunkY, color, size, _id, position } = result;
        const hashedRoomID = createHashIdFromCoords(chunkX, chunkY);
        //if another ship is present, start sending player coords (shareRealTime determines this)
        shareRealTime && socketEmitter("sendUpdate", { position, _id, color, size });
        //if ship enters a new chunk, switch socket room. 
        //id-only object param in sendUpdates tells other players to delete player from their ghost ship array because they left chunk.
        if (hashedRoomID !== room) {
          const numbers = hashids.decode(hashedRoomID);
          const newMaze = generator(10, 10, false, numbers[0])
          console.log(numbers);
          setMaze(newMaze);
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

  return (
    <div
      className="dashboard"
      onKeyDown={!loading ? undefined : returnKey}
      tabIndex="0"
    >
      <div className="temp-page">
        {!loading ? <p>Loading Chunk</p> : <p>Chunk Ready</p>}
        <Canvas shareRealTime={shareRealTime} maze={maze} ship={ship} />
        <ColorPicker updateShipColor={updateShipColor} />
      </div>
    </div>
  );
}

export default Dashboard;
