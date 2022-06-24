import { fetchShip } from "../actions/ship";
export const getSetInitialGameState = async (token, id, setState) => {
  const ship = await fetchShip(token, id);
  ship.position = {x: 500, y: 500}
  setState(ship);
};
