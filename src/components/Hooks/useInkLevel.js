import { timer } from "../Timer";
import { useEffect, useState } from "react";
import { socketEmitter } from "../../services/socket";

export const useInkLevel = (ship) => {
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
      socketEmitter("incrementInk", { id: ship._id, ink: number });

      setInk(number);
      return;
    }, 10000);

    return () => timer.stop();
  }, [ship]);

  return ink;
};
