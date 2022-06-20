import { fetchShip } from "../actions/ship";
import Ship from "../components/Classes/Ship";
export const getSetInitialGameState = async (token, id, setState) => {
  const fetchedShip = await fetchShip(token, id);
  let ship = new Ship(fetchedShip.size, fetchedShip.position, fetchedShip.currentChunk, fetchedShip.inkLevel, fetchedShip.color, fetchedShip.owner);
  setState(ship);
};
