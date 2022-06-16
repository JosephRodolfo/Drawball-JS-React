import  { useRef, useEffect } from "react";
import {getMousePosition, snapToGridLine} from "../utilities/getMousePosition"
const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "lightgrey";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  function handleClick(e) {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const coords = snapToGridLine(getMousePosition(canvas, e));
    context.fillStyle = "red";
    context.fillRect(coords.x, coords.y, 10, 10);
  }

  return (
    <div>
      <canvas
        height="1000px"
        width="1000px"
        className="canvas"
        onClick={handleClick}
        ref={canvasRef}
        {...props}
      />
      <button onClick={handleClick}>Button</button>
    </div>
  );
};

export default Canvas;
