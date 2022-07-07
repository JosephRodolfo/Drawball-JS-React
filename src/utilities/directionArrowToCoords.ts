export function directionArrowToCoords(key: string) {
  if (key === "a") {
    return [-10, 0];
  }
  if (key === "d") {
    return [10, 0];
  }
  if (key === "s") {
    return [-0, 10];
  }
  if (key === "w") {
    return [0, -10];
  }
}
