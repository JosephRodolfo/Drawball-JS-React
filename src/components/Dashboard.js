import Canvas from "../components/Canvas";
import ColorPicker from "../components/ColorPicker";

import { getSetInitialGameState } from "../utilities/getSetInitialGameState";
import { useEffect, useState } from "react";
import { useKeyPress } from "./Controls";
import { GameController } from "./Classes/GameController";
import { useAuth } from "./AuthProvider";
import { updateShip } from "../actions/ship";

function Dashboard() {
  const [ship, setShip] = useState({}); 
   const [paused, setPause] = useState(false);

  const [controller, setController] = useState({});
  const { token, id } = useAuth();

  useEffect(() => {
    getSetInitialGameState(token, id, setShip);
    let controller = new GameController();
    setController(controller);
    console.log("initial useeffect fired");
  }, [token, id]);

  let boundKeyPress = useKeyPress.bind(
    null,
    controller,
    ship,
    token,
    (updatedShip) => {
      if(updateShip===false){

        setPause(true)
        return;
      }
      setPause(false)

      setShip(updatedShip);
    }
  );

  async function updateShipColor(updates) {
    let currentState = ship.currentChunk.state;
    const updatedShip = await updateShip(token, id, {
      position: { x: ship.position.x, y: ship.position.y },
      ...updates,
    });
    updatedShip.currentChunk.state = currentState;
    setShip(updatedShip);
  }

  return (
    <div className="dashboard" onKeyDown={!paused && boundKeyPress} tabIndex="0">
      <div className="temp-page">
        {paused ? <p>LOADING</p> : <p>NOT LOADING</p>}
        <Canvas ship={ship} />
        <ColorPicker updateShipColor={updateShipColor} />
      </div>
    </div>
  );
}

export default Dashboard;
