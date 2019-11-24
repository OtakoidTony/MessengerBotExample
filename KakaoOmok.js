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
    this.string = "";
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
    this.string_board = function() {
        this.string = "";
        var x = 0;
        var y = 0;
        while (y < this.board[0].length) {
            this.string = this.string + this.board[x % this.board.length][y];
            x = x + 1;
            if (x != 0 && x % this.board.length == 0) {
                this.string = this.string + "\n";
                y = y + 1;
            }
        }
    }
    this.placement(x, y, com) {
        if (com) {
            this.board[x][y] = '●';
        } else {
            this.board[x][y] = '○';
        }
        this.string_board();
    }
}
