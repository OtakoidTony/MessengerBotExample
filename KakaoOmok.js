/* 13, 13
01┏┯┯┯┯┯┯┯┯┯┯┯┓
02┠┼┼┼┼┼┼┼┼┼┼┼┨
03┠┼┼┼┼┼┼┼┼┼┼┼┨
04┠┼┼┼┼┼┼┼┼┼┼┼┨
05┠┼┼┼┼┼┼┼┼┼┼┼┨
06┠┼┼┼┼┼┼┼┼┼┼┼┨
07┠┼┼┼┼┼┼┼┼┼┼┼┨
08┠┼┼┼┼┼┼┼┼┼┼┼┨
09┠┼┼┼┼┼┼┼┼┼┼┼┨
10┠┼┼┼┼┼┼┼┼┼┼┼┨
11┠┼┼┼┼┼┼┼┼┼┼┼┨
12┠┼┼┼┼┼┼┼┼┼┼┼┨
13┗┷┷┷┷┷┷┷┷┷┷┷┛
*/
/* 10, 10
01┏┯┯┯┯┯┯┯┯┓
02┠┼┼┼┼┼┼┼┼┨
03┠┼┼┼┼┼┼┼┼┨
04┠┼┼┼┼┼┼┼┼┨
05┠┼┼┼┼┼┼┼┼┨
06┠┼┼┼┼┼┼┼┼┨
07┠┼┼┼┼┼┼┼┼┨
08┠┼┼┼┼┼┼┼┼┨
09┠┼┼┼┼┼┼┼┼┨
10┗┷┷┷┷┷┷┷┷┛
*/
function Omok() {
    this.board = [];
    this.make_board = function(x, y) {
        var i = 0;
        var boardYL = []; /**/
        var boardYM = []; /**/
        var boardYR = []; /**/
        while (i < y) {
            if (i == 0) {
                boardYL[i] = "┏";
                boardYM[i] = "┯";
                boardYR[i] = "┓";
            } else {
                if (i == y - 1) {
                    boardYL[i] = "┗";
                    boardYM[i] = "┷";
                    boardYR[i] = "┛";
                } else {
                    boardYL[i] = "┠";
                    boardYM[i] = "┼";
                    boardYR[i] = "┨";
                }
            }
            i = i + 1;
        }
        i = 0;
        while (i < x) {
            if (i == 0) {
                this.board[i] = boardYL;
            } else {
                if (i == x - 1) {
                    this.board[i] = boardYR;
                } else {
                    this.board[i] = boardYM;
                }
            }
            i = i + 1;
        }
    }
