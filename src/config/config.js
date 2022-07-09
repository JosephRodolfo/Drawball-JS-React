
export const config = {
  get gameSize() {
    return (this.boardSize - 0.01 * this.boardSize) / 100;
  },
  boardSize: 1010,
};
