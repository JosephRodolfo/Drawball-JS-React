export const config = 
{

    // gameSize: 10,
    // get boardSize() {
    //     return (this.gameSize * 100) + this.gameSize;
    // },
    scale: 1,

    get gameSize() {return (this.boardSize - .01*this.boardSize) / 100},
    boardSize: 1010,



};