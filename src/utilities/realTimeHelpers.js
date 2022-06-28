export function findStateMatch(ship, update){
    if(ship){
const indexOfMatch = ship.currentChunk.findIndex((element) => {
    return element.x === update.x && element.y === update.y;
  });
  if (indexOfMatch !== -1) {
    ship.currentChunk.splice(indexOfMatch, 1, update);
  } else {
    ship.currentChunk.unshift(update);
  }}
  return ship;
}