if (console == null){
    var console = Log;
}

function make2d_array(x, y) {
    var init = 0
    var tt = new Array(y)
    for (var i = 0; i < y; i++) {
        tt[i] = new Array(x)
        for (var j = 0; j < x; j++) {
            tt[i][j] = init
        }
    }
    return tt
}

Array.max = function(array){ 
    return Math.max.apply(Math, array); 
}; 
Array.min = function(array){ 
    return Math.min.apply(Math, array); 
};
Array.max_loc = function(array){ 
    return array.indexOf(Array.max(array)); 
};
Array.min_loc = function(array){ 
    return array.indexOf(Array.min(array)); 
};
Array.min_loc_array = function(array){
    var minimum = Array.min(array);
    var temp = array;
    var output = [];
    var i = 0;
    while (i<array.length) {
        if(array[i]==minimum){
            output.push(i);
        }
        i=i+1;
    }
    return output;
}
Array.max_loc_array = function(array){
    var maximum = Array.max(array);
    var temp = array;
    var output = [];
    var i = 0;
    while (i<array.length) {
        if(array[i]==maximum){
            output.push(i);
        }
        i=i+1;
    }
    return output;
}
    


function Omok(x, y) {
    this.board = make2d_array(x, y);
    this.numeric_board = make2d_array(x, y);
    this.string = "";
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
    var j = 0;
    while (i < x) {
        if (i == 0) {
            while (j < this.board[0].length) {
                this.board[i][j] = boardYL[j];
                j = j + 1;
            }
        } else {
            if (i == x - 1) {
                while (j < this.board[0].length) {
                    this.board[i][j] = boardYR[j];
                    j = j + 1;
                }
            } else {
                while (j < this.board[0].length) {
                    this.board[i][j] = boardYM[j];
                    j = j + 1;
                }
            }
        }
        j = 0;
        i = i + 1;
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
            if (this.board[x][y] != '●' && this.board[x][y] != '○' && this.board[x][y] != null) {
                this.numeric_board[x][y] = this.numeric_board[x][y] + 1;
            }
        } catch (e) {
            /* Log.debug(e); */
            console.error(e);
        }
    }
    this.minus = function(x, y) {
        try {
            if (this.board[x][y] != '●' && this.board[x][y] != '○' && this.board[x][y] != null) {
                this.numeric_board[x][y] = this.numeric_board[x][y] - 1;
            }
        } catch (e) {
            /* Log.debug(e); */
            console.error(e);
        }
    }
    this.placement = function(x, y, com) {
        if (com) {
            this.board[x][y] = '●';
            this.numeric_board[x][y] = 0;
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
            this.numeric_board[x][y] = 0;
            this.minus(x + 1, y);
            this.minus(x - 1, y);
            this.minus(x, y + 1);
            this.minus(x, y - 1);
            this.minus(x + 1, y + 1);
            this.minus(x - 1, y + 1);
            this.minus(x + 1, y - 1);
            this.minus(x - 1, y - 1);
            this.computer();
        }
        this.string_board();
    }
    this.computer = function() {
        var where=0;
        var i = 0;
        var temp_min=[];
        while (i<this.board.length){
            temp_min.push(Array.min(this.numeric_board[i]));
            i=i+1;
        }
        where = Array.min_loc(temp_min);
        console.log(where);
        var where_x = where;
        temp_min = this.numeric_board[where_x];
        console.log(temp_min);
        var where_y = Array.min_loc(temp_min);
        this.placement(where_x,where_y,true);
        console.log(this.board);
    }
}

var omok = new Omok(8,8);
omok.placement(3,6);
