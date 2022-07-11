import React from "react";

const ModeSelector = ({ toggleMaze }) => {

   const toggleMazeChild=(e)=>{
        toggleMaze(e.target.checked)
    }
  return (
    <div className="mode-selector">
      <label>Maze Mode (Beta)</label>
      <label class="switch">
        <input type="checkbox" onChange={toggleMazeChild} />
        <span class="slider"></span>
      </label>
    </div>
  );
};
export default ModeSelector;
