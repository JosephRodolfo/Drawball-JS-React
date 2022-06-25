import Canvas from "../components/Canvas";
import ColorPicker from "../components/ColorPicker";

import { getSetInitialGameState } from "../utilities/getSetInitialGameState";
import { useEffect, useState } from "react";
import { useKeyPress } from "./Controls";
import { GameController } from "./Classes/GameController";
import { useAuth } from "./AuthProvider";
import { socket } from "../services/socket";
import { setShipColor } from "../utilities/updateShipColor";

function Dashboard() {
  const [ship, setShip] = useState({});
  const [loading, setLoading] = useState(true);
  const [controller, setController] = useState({});
  const [currentChunk, setCurrentChunk] = useState(null);
  const { token, id } = useAuth();

  useEffect(() => {
    console.log('initial useeffect fired')
    getSetInitialGameState(token, id).then((ship) => {
      setShip(ship);
      const roomId = ship.currentChunk._id;
      setCurrentChunk(roomId);

      socket.emit("join", { id: id, room: roomId }, (error) => {
        if (error) {
          alert(error);
        }
      });
    });
    let controller = new GameController();
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
      if (result.currentChunk) {
        setShip(result);
      }
      if (result.currentChunk._id !== currentChunk){
        setCurrentChunk(result.currentChunk._id)
        socket.emit("switch", { id: id, room: currentChunk }, (error) => {
          if (error) {
            alert(error);
          }
        });
      }
      if (result.coords){
        console.log(result)
      sendUpdates(result);}
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

      console.log("Message delivered");
    });
  }





  return (
    <div
      className="dashboard"
      onKeyDown={!loading ? undefined : boundKeyPress}
      tabIndex="0"
    >
      <div className="temp-page">
        {!loading && <p>Loading Chunk</p>}
        <Canvas ship={ship} />
        <ColorPicker updateShipColor={updateShipColor} />
      </div>
    </div>
  );
}

export default Dashboard;
