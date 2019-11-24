function Omok() {
    this.board = [];
    this.numeric_board = [];
    this.numeric_board[0] = [];
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
            this.numeric_board[0][i] = 0;
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
            this.numeric_board[i] = this.numeric_board[0];
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
    this.plus = function(x, y) {
        try {
            if ((this.board[x])[y] != '●' && (this.board[x])[y] != '○' && (this.board[x])[y] != null) {
                (this.numeric_board[x])[y] = (this.numeric_board[x])[y] + 1;
            }
        } catch (e) {
            Log.debug(e);
        }
    }
    this.minus = function(x, y) {
        try {
            if ((this.board[x])[y] != '●' && (this.board[x])[y] != '○' && (this.board[x])[y] != null) {
                (this.numeric_board[x])[y] = (this.numeric_board[x])[y] - 1;
            }
        } catch (e) {
            Log.debug(e);
        }
    }
    this.placement = function(x, y, com) {
        if (com) {
            (this.board[x])[y] = '●';
            this.plus(x + 1, y);
            this.plus(x - 1, y);
            this.plus(x, y + 1);
            this.plus(x, y - 1);
            this.plus(x + 1, y + 1);
            this.plus(x - 1, y + 1);
            this.plus(x + 1, y - 1);
            this.plus(x - 1, y - 1);
        } else {
            this.board[x][y] = '○';
            this.minus(x + 1, y);
            this.minus(x - 1, y);
            this.minus(x, y + 1);
            this.minus(x, y - 1);
            this.minus(x + 1, y + 1);
            this.minus(x - 1, y + 1);
            this.minus(x + 1, y - 1);
            this.minus(x - 1, y - 1);
        }
        this.string_board();
    }
    this.computer = function() {
        this.numeric_board;
    }
}
