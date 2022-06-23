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

  const [controller, setController] = useState({});
  const { token, id } = useAuth();

  useEffect(() => {
    getSetInitialGameState(token, id, setShip);
    let controller = new GameController();
    setController(controller);
  }, [token, id]);

  let boundKeyPress = useKeyPress.bind(
    null,
    controller,
    ship,
    token,
    (updatedShip) => {
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
    <div className="dashboard" onKeyDown={boundKeyPress} tabIndex="0">
      <div className="temp-page">
        <Canvas ship={ship} />
        <ColorPicker updateShipColor={updateShipColor} />
      </div>
    </div>
  );
}

export default Dashboard;
