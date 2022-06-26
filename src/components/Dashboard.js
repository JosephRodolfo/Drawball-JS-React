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

function Dashboard() {
  const [ship, setShip] = useState({});
  const [loading, setLoading] = useState(true);
  const [controller, setController] = useState({});
  const [room, setCurrentRoom] = useState(null);
  const { token, id } = useAuth();

  useEffect(() => {
    getSetInitialGameState(token, id).then((returnedShip) => {
       setShip(returnedShip);
      setCurrentRoom(returnedShip.currentChunk._id);

      socket.emit("join", {userId: id, room: returnedShip.currentChunk._id}, (error) => {
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
      if (result.currentChunk && result.currentChunk._id !== room){
        setCurrentRoom(result.currentChunk._id)
        socket.emit("switch", { userId: id, room: result.currentChunk._id}, (error) => {
          if (error) {
            alert(error);
          }
        });

      }
      if (result.coords){
      sendUpdates(result);}
        return result
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
return ()=>{
  socket.off("transferCoords", updateSharedBoardFunc);
  socket.off("message", printSocketMessage);
}



  }, [ship]);



  const updateSharedBoardFunc = (update) => {
    const newShip = findStateMatch(ship, update);
    setShip(newShip)
    
  }

  const printSocketMessage = (message)=>{
    console.log(message.text)

  }

  return (
    <div
      className="dashboard"
      onKeyDown={!loading ? undefined : boundKeyPress}
      tabIndex="0"
    >
      <div className="temp-page">
        {!loading? <p>Loading Chunk</p>: <p>Chunk Ready</p>}
        <Canvas ship={ship} />
        <ColorPicker updateShipColor={updateShipColor} />
      </div>
    </div>
  );
}

export default Dashboard;
