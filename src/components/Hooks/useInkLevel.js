import { timer } from "../Timer";
import { useEffect, useState } from "react";
import { socketEmitter } from "../../services/socket";
import { updateShip } from "../../actions/ship";

export const useInkLevel = (ship, token) => {
  const [ink, setInk] = useState(ship.inkLevel);

  useEffect(() => {
    setInk(ship.inkLevel);
  }, [ship.inkLevel, ship]);

  useEffect(() => {
    timer.start(() => {
      if (ship.inkLevel > 200) {
        return;
      }
      const number = ship.inkLevel + 1;
      ship.inkLevel = number;
      updateShip(token, ship._id, {inkLevel: number});
      // socketEmitter("incrementInk", { id: ship._id, ink: number });

      setInk(number);
      return;
    }, 10000);

    return () => timer.stop();
  }, [ship, token]);

  return ink;
};
