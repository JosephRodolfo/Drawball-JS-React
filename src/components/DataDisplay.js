import React from "react";

const DataDisplay = ({ ship, inkLevel, loading }) => (
  <div className="data-display">
    <div className="dashboard-item">
      <p>Chunk position:</p>

      <span className="data-display-text">{!loading ? `LOADING` :` x: ${ship.chunkX} y: ${ship.chunkY}`}</span>
    </div>
    <div className="dashboard-item">
      <p>Ship position:</p>

      <span className="data-display-text">{!loading ? `LOADING`: ` x: ${(ship.position.x / 10)
        .toString()
        .padStart(3, 0)} y: ${(ship.position.y / 10)
        .toString()
        .padStart(3, 0)}`}</span>
    </div>
    <div className={inkLevel<10 ? "low-ink-class dashboard-item": "dashboard-item"}>
      <p>Ink level:</p>
      <span className="data-display-text">{inkLevel}</span>
    </div>
  </div>
);

export default DataDisplay;
