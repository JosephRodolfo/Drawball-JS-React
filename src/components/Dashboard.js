import Canvas from "../components/Canvas";
import ColorPicker from "../components/ColorPicker";

import { getSetInitialGameState } from "../utilities/getSetInitialGameState";
import { useEffect, useState } from "react";
import { placeColor, moveShip } from "./Controls";
import { useAuth } from "./AuthProvider";
import { updateShip } from "../actions/ship";
import { createHashIdFromCoords } from "../utilities/createHashFromId";
import { socketEmitter } from "../services/socket";
import { useShareRealTime } from "./Hooks/socketHooks";
import DataDisplay from "./DataDisplay";
import { returnClick, returnKey } from "../utilities/onInputReturnKey";
import generator from "generate-maze";
import loader from "../assets/images/loader.gif";
import { hashids } from "../utilities/createHashFromId";

function Dashboard() {
  const [ship, setShip] = useState({});
  const [loading, setLoading] = useState(true);
  const [room, setCurrentRoom] = useState(null);
  const [newestChunk, setNewestChunk] = useState(null);
  const { token, id } = useAuth();
  const [maze, setMaze] = useState([]);
  const [toggledMaze, setToggledMaze] = useState(false);
  const shareRealTime = useShareRealTime();
  //effect fires on signing in and loading component, sets initial game state and joins socket room; cleans up with disconnecting from socket room
  useEffect(() => {
    setLoading(false);
    getSetInitialGameState(token, id).then((returnedShip) => {
      const currentRoomdId = createHashIdFromCoords(
        returnedShip.chunkX,
        returnedShip.chunkY
      );
      setShip(returnedShip);
      setLoading(true);
      setCurrentRoom(currentRoomdId);
      socketEmitter("join", { userId: id, room: currentRoomdId });
    });
    return () => {
      socketEmitter("leave", id);
    };
  }, [token, id]);
  //when ship udates, this effect fires, transmitting new position to other players if present and switching room if necessary
  useEffect(() => {
    const { chunkX, chunkY, color, size, _id, position } = ship;
    const hashedRoomID = createHashIdFromCoords(chunkX, chunkY);
    //if another ship is present, start sending player coords (shareRealTime determines this)
    shareRealTime &&
      socketEmitter("sendUpdate", { position, _id, color, size });
    //if ship enters a new chunk, switch socket room.
    //id-only object param in sendUpdates tells other players to delete player from their ghost ship array because they left chunk.

    if (toggledMaze) {
      const numbers = hashids.decode(hashedRoomID);
      const newMaze = generator(10, 10, false, numbers[0]);
      setMaze(newMaze);
    }
    if (hashedRoomID !== room) {
      setCurrentRoom(hashedRoomID);
      socketEmitter("sendUpdate", { _id });
      socketEmitter("switch", { userId: id, room: hashedRoomID });
    }
  }, [ship, id, room, shareRealTime, toggledMaze]);
  //useEffect fires when a new pixel is placed, emits via socket.io to other players.
  useEffect(() => {
    if (newestChunk) {
      socketEmitter("sendUpdate", newestChunk);
    }
  }, [newestChunk]);
  //updates ship color on click.
  const updateShipColor = async (updates) => {
    await updateShip(token, id, { ...updates });
    ship.color = updates.color;
    setShip(ship);
  };
  //on key press (or click) places color or moves ship and returns a new ship or chunk that's set into state
  const keySwitch = (key) => {
    const paramsArray = [ship, token, setLoading];
    key === " " &&
      //on space press, places color and sends pixel update to other players
      placeColor(paramsArray, (newChunk, newShip) => {
        setShip(newShip);
        setNewestChunk(newChunk);
        return;
      });
    //set returned ship in state after completing move
    moveShip(paramsArray, maze, key, (result) => {
      setShip(result);
    });
  };

  const toggleMaze = () => {
    const toggle = !toggledMaze;
    setToggledMaze(toggle);
    !toggle && setMaze([]);
  };

  return (
    <div
      className="dashboard"
      onMouseDown={!loading ? undefined : returnClick.bind(null, keySwitch)}
      onKeyDown={!loading ? undefined : returnKey.bind(null, keySwitch)}
      tabIndex="0"
    >
      <div className="content-container">
        <div className="dashboard-info-container">
          {ship.position ? <DataDisplay ship={ship} /> : <p>No ship found</p>}
        </div>
        {/* {!loading ? <p>Loading Chunk</p> : <p>Chunk Ready</p>} */}
        <div className="canvas-color-picker-container">
          {loading ? (
            <Canvas shareRealTime={shareRealTime} maze={maze} ship={ship} />
          ) : (
            <div className="hourglass-loader-container">
              <img alt="hourglass loader" src={loader} />
            </div>
          )}
          <div className="color-picker-container">
          <ColorPicker updateShipColor={updateShipColor} />
          </div>
        </div>
      </div>
      <button onClick={toggleMaze}>Maze Mode Beta</button>
    </div>
  );
}

export default Dashboard;
