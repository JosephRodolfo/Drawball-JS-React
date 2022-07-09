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

export function convertClickToDirection(
  width: number,
  height: number,
  x: number,
  y: number
) {
  if (x < width * 0.3 && y < height * 0.7 && y > height * 0.3) {
    return "a";
  }
  if (x > width * 0.7 && y < height * 0.7 && y > height * 0.3) {
    return "d";
  }
  if (y > height * 0.7 && x < width * 0.7 && x > width * 0.3) {
    return "s";
  }
  if (y < height * 0.3 && x < width * 0.7 && x > width * 0.3) {
    return "w";
  }

  if (
    y < height * 0.6 &&
    y > height * 0.4 &&
    x < width * 0.6 &&
    x > width * 0.4
  ) {
    return " ";
  }
}

export function returnCoordsFromClick({ target, pageX, pageY }: any) {
  if (target.id !== "responsive-canvas") {
    return;
  }
  const width = target.scrollWidth;
  const height = target.scrollWidth;
  const x = pageX - target.offsetLeft;
  const y = pageY - target.offsetTop;
  const key = convertClickToDirection(width, height, x, y);
  return key;
}
