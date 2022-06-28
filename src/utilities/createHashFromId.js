import Hashids from 'hashids'
const hashids = new Hashids("drawball");
//creates hash from x, y coords. cantorPairSigned, turns x, y integers into single integer,
//accomodating negative numbers, then hashids turns it into a string. Used for sessionIds for socket.io rooms
//Because player won't always have sessionId on client, using a hash permits them to calculate it based on 
//their chunk x, y position.
export function createHashIdFromCoords(x, y) {
  function cantorPairSigned(x, y) {
    function cantorPair(x, y) {
      return 0.5 * (x + y) * (x + y + 1) + y;
    }
    const a = x >= 0.0 ? 2.0 * x : -2.0 * x - 1.0;
    const b = y >= 0.0 ? 2.0 * y : -2.0 * y - 1.0;
    return cantorPair(a, b);
  }

  const cantorId = cantorPairSigned(x, y);
  return hashids.encode(cantorId);
}
