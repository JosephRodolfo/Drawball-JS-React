import { updateShip } from "../actions/ship";
export async function setShipColor(token, id, updates, setState) {
    const currentState = this.currentChunk;
    const updatedShip = await updateShip(token, id, {
      position: { x: this.position.x, y: this.position.y },
      ...updates,
    });
    updatedShip.currentChunk = currentState;
    setState(updatedShip);
  }
