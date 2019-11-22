const Matrix={};

Matrix.sum = function (A, B) {
    var answer = Array();
    for (var i = 0; i < A.length; i++) {
        answer[i] = [];
        for (var j = 0; j < A[0].length; j++) {
            answer[i][j] = A[i][j] + B[i][j];
        }
    }
    return answer;
}
Matrix.multiply = function (a, b) {
    var aNumRows = a.length,
        aNumCols = a[0].length,
        bNumRows = b.length,
        bNumCols = b[0].length,
        m = new Array(aNumRows); // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols); // initialize the current row
        for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0; // initialize the current cell
            for (var i = 0; i < aNumCols; ++i) {
                m[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return m;
}
Matrix.T = function (A){
    return A[0].map((col, i) => A.map(row => row[i]));
}
const random = {};

random.rand = function(a) {
    var q = [];
    var i = 0;
    while (i < a) {
        q.push(Math.random());
        i = i + 1;
    }
    return q;
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}
function sigmoid_derivative(p){
    return p * (1 - p);
}

function ReLU(x) {
    if (x >= 0) {
        return x;
    } else {
        return 0;
    }
}
