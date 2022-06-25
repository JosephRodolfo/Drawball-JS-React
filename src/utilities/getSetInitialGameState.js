import { fetchShip } from "../actions/ship";
export const getSetInitialGameState = async (token, id) => {
  const ship = await fetchShip(token, id);
  ship.position = {x: 500, y: 500}
  return ship
};
