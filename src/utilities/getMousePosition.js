export const getMousePosition = (canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX;
  const y = event.clientY;
  const factor = canvas.width / rect.width;
  const newFactorX = factor * (x - rect.left);
  const newFactorY = factor * (y - rect.top);
  const newCoords = { x: newFactorX, y: newFactorY };
  return newCoords;
};

export const snapToGridLine = ({ x, y }) => {
  return { x: Math.floor(x / 10) * 10, y: Math.floor(y / 10) * 10 };
};
