export function returnDirection(x: number, y: number) {
  if (x === 1 && y === 0) return "right";
  if (x === -1 && y === 0) return "left";
  if (x === 0 && y === 1) return "bottom";
  if (x === 0 && y === -1) return "top";
}

export function returnOppositeDirection(direction: string) {
  if (direction === "top") return "bottom";
  if (direction === "bottom") return "top";
  if (direction === "right") return "left";
  if (direction === "left") return "right";
}

export function returnLastDigit(number: number): number {
  const lastDigitXStr = String(number / 10).slice(-1);
  return Number(lastDigitXStr);
}
