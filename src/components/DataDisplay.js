import React from "react";

const DataDisplay = ({ ship }) => (
  <div className="data-display">
    <p>
      Chunk position:
      <span className="data-display-text">{` x: ${ship.chunkX} y: ${ship.chunkY}`}</span>
    </p>
    <p>
      Ship position:
      <span className="data-display-text">{` x: ${(ship.position.x/10).toString().padStart(3, 0)} y: ${(ship.position.y/10).toString().padStart(3,0)}`}</span>
    </p>
    <p>
      Ink level: <span className="data-display-text">{ship.inkLevel}</span>
    </p>
  </div>
);

export default DataDisplay;
