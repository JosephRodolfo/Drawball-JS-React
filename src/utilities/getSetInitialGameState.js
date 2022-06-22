import { fetchShip } from "../actions/ship";
export const getSetInitialGameState = async (token, id, setState) => {
  const ship = await fetchShip(token, id);
  setState(ship);
};
