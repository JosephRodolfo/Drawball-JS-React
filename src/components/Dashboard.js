import Canvas from "../components/Canvas";
import ColorPicker from "../components/ColorPicker";

import { getSetInitialGameState } from "../utilities/getSetInitialGameState";
import { useEffect, useState } from "react";
import { useKeyPress } from "./Controls";
import { GameController } from "./Classes/GameController";
import { useAuth } from "./AuthProvider";


function Dashboard() {

  const [ship, setShip] = useState({});
  const [controller, setController] = useState({})
  const { token, id } = useAuth();


  useEffect(()=>{
    getSetInitialGameState(token, id, setShip)
    let controller = new GameController();
    setController(controller);
    console.log('initial useeffect fired')
  }, [token, id])

  let boundKeyPress = useKeyPress.bind(null, controller, ship, token, (updatedShip) => {
    setShip(updatedShip);
  });
  

  return (
    <div className="dashboard" onKeyDown={boundKeyPress} tabIndex="0" >
      <div className="temp-page">
      <Canvas ship={ship}/>
      <ColorPicker />
      </div>
    </div>
  );
}

export default Dashboard;