export function socketUpdates(ship, ghostShip, update, shareRealTime) {
  const newShip = findStateMatch(ship, update);
  // setShip(newShip);

  const ghostShipCopy = () => {
    if (!update.sessionId) {
      const index = ghostShip.findIndex(
        (element) => element._id === update._id
      );
      const ghostShipCopy = ghostShip;
      //remove it from array if it left chunk
      if (!update.position) {
        ghostShipCopy.splice(index, 1);
        // setGhost(ghostShipCopy);
        return ghostShipCopy;
      }
      //add it to array if it's a new player
      if (index === -1 && shareRealTime) {
        const newGhostShipArray = [update, ...ghostShipCopy];
        // setGhost(newGhostShipArray);
        return newGhostShipArray;
      } else if (shareRealTime){
      //if it just moved replace old coords
      ghostShipCopy.splice(index, 1, update);

      // setGhost(ghostShipCopy);
      return ghostShipCopy;
      }
    }
  };
  const newCopy = ghostShipCopy();
  return newCopy ? { newCopy, newShip } : { newCopy: [], newShip}
   

  function findStateMatch(ship, update) {
    if (ship.currentChunk) {
      const indexOfMatch = ship.currentChunk.findIndex((element) => {
        return element.x === update.x && element.y === update.y;
      });
      if (indexOfMatch !== -1) {
        ship.currentChunk.splice(indexOfMatch, 1, update);
      } else {
        ship.currentChunk.unshift(update);
      }
    }
    return ship;
  }
}
