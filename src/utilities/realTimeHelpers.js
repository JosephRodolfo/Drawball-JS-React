export function findStateMatch(ship, update){
    if(ship){
const indexOfMatch = ship.currentChunk.state.findIndex((element) => {
    return element.coords.x === update.coords.x && element.coords.coords.y === update.coords.coords.y;
  });
  if (indexOfMatch !== -1) {
    ship.currentChunk.state.splice(indexOfMatch, 1, update.coords);
  } else {
    ship.currentChunk.state.unshift(update.coords);
  }}
  return ship;
}