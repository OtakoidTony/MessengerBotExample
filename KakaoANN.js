var Matrix = {};

Matrix.sum = function(A, B) {
    var answer = [];
    for (var i = 0; i < A.length; i++) {
        answer[i] = [];
        for (var j = 0; j < A[0].length; j++) {
            answer[i][j] = A[i][j] + B[i][j];
        }
    }
    return answer;
}
Matrix.dot = function(a, b) {
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
Matrix.T = function(A) {
    return A[0].map((col, i) => A.map(row => row[i]));
}
Matrix.shape = function(A) {
    return [A.length, A[0].length];
}
Matrix.zeros = function(a, b) {
    var i = 0;
    var j = 0;
    var A = [];
    var B = [];
    while (j < b) {
        B.push(0);
        j = j + 1;
    }
    while (i < a) {
        A.push(B);
        i = i + 1;
    }
    return A;
}
Matrix.numbers = function(a, b, n) {
    var i = 0;
    var j = 0;
    var A = [];
    var B = [];
    while (j < b) {
        B.push(n);
        j = j + 1;
    }
    while (i < a) {
        A.push(B);
        i = i + 1;
    }
    return A;
}
Matrix.time = function(A, t) {
    var out = [];
    for (var i in A) {
        out[i] = [];
        for (var j in A[i]) {
            out[i][j] = A[i][j] * t;
        }
    }
    return out;
}
Matrix.multiply_scalar = function(A, B) {
    var out = 0;
    for (var i in A) {
        for (var j in A[i]) {
            out = out + A[i][j] * B[i][j];
        }
    }
    return out;
}
Matrix.plus = function(A, B) {
    var i = 0;
    var j = 0;
    var Output = [];
    for (i in A) {
        Output[i] = [];
        for (j in A[i]) {
            Output[i][j] = A[i][j] + B[i][j];
        }
    }
    return Output;
}
Matrix.minus = function(A, B) {
    var i = 0;
    var j = 0;
    var Output = [];
    for (i in A) {
        Output[i] = [];
        for (j in A[i]) {
            Output[i][j] = A[i][j] - B[i][j];
        }
    }
    return Output;
}
Matrix.rand = function(a, b) {
    var q = [];
    var i = 0;
    var j = 0;
    while (i < a) {
        q[i] = [];
        while (j < b) {
            q[i][j] = Math.random();
            j = j + 1;
        }
        j = 0;
        i = i + 1;
    }
    return q;
}
Matrix.sigmoid = function(A) {
    var out = [];
    for (var i in A) {
        out[i] = [];
        for (var j in A[i]) {
            out[i][j] = 1 / (1 + Math.exp(-A[i][j]));
        }
    }
    return out;
}
Matrix.sigmoid_derivative = function(A) {
    var out = [];
    for (var i in A) {
        out[i] = [];
        for (var j in A[i]) {
            out[i][j] = A[i][j] * (1 - A[i][j]);
        }
    }
    return out;
}
Matrix.ReLU = function(A) {
    var out = [];
    for (var i in A) {
        out[i] = [];
        for (var j in A[i]) {
            if (A[i][j]>=0){
                out[i][j] = A[i][j];
            } else {
                out[i][j] = 0;
            }
        }
    }
    return out;
}
Matrix.multiply = function(A, B) {
    var answer = [];
    for (var i = 0; i < A.length; i++) {
        answer[i] = [];
        for (var j = 0; j < A[0].length; j++) {
            answer[i][j] = A[i][j] * B[i][j];
        }
    }
    return answer;
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function sigmoid_derivative(p) {
    return p * (1 - p);
}

function ReLU(x) {
    if (x >= 0) {
        return x;
    } else {
        return 0;
    }
}

/*
인공신경망을 구성하는 프로세서인 인공 뉴런의 기능은 다음과 같다.
단순히 입력된 신호 x=[x1, x2, … , xn]을 연결가중치 w=[w1, w2, … , wn]과
곱한 값을 모두 더한 다음, 그 결과에 비선형 함수 f를 취하는 것이다.
이때 동일한 입력 x를 가했을 때의 출력은 w에 따라 다른 값이 된다.
따라서 정보는 바로 연결 가중치 벡터 w에 저장된다고 볼 수 있다.
출력 y의 값은 다음과 같은 식에 의해 계산된다. y=f(Σxw-θw₀)

"인공 뉴런." 위키백과, . 1 7 2017, 04:00 UTC. 23 11 2019, 04:59 <https://ko.wikipedia.org/wiki/인공_뉴런>
*/
function ArtificialNeuron(X, W, Bias, ActivationFunction){
    var i = 0;
    var output = 0;
    while (i < X.length) {
        output = output + ( X[i] * W[i] );
        i = i + 1;
    }
    return ActivationFunction(output-Bias);
}

function NeuralNetwork(x, y) {
    var NodeAmount = 4;
    this.input = x;
    this.weights1 = Matrix.rand(Matrix.shape(this.input)[1], NodeAmount);
    this.weights2 = Matrix.rand(NodeAmount, 1);
    
    this.y = y;
    this.output = Matrix.zeros(Matrix.shape(y)[0], Matrix.shape(y)[1]);

    this.feedforward = function() {
        /*
        layer1=σ(input*weights1)
        layer2=σ(layer1*weights2)
        */
        this.layer1 = Matrix.sigmoid(Matrix.dot(this.input, this.weights1));
        this.layer2 = Matrix.sigmoid(Matrix.dot(this.layer1, this.weights2));
        return this.layer2;
    }

    this.backprop = function() {
        var run_1 = Matrix.minus(this.y, this.output); // y-output
        var run_2 = Matrix.time(run_1, 2); // 2(y-output)
        var run_3 = Matrix.multiply(run_2, Matrix.sigmoid_derivative(this.output)); // 2(y-output)σ'(output)
        var d_weights2 = Matrix.dot(Matrix.T(this.layer1), run_3); // layer.T×2(y-output)σ'(output)

        var run_4 = Matrix.dot(run_3, Matrix.T(this.weights2));
        var run_5 = Matrix.multiply(run_4, Matrix.sigmoid_derivative(this.layer1));
        var d_weights1 = Matrix.dot(Matrix.T(this.input), run_5);

        this.weights1 = Matrix.plus(this.weights1, d_weights1);
        this.weights2 = Matrix.plus(this.weights2, d_weights2);
    }

    this.train = function(X, y) {
        this.output = this.feedforward();
        this.backprop();
    }
}
var X = [
    [0, 0, 1],
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
];
var y = [
    [0],
    [1],
    [1],
    [0]
];

var NN = new NeuralNetwork(X, y);
var i = 0;
while (i < 1000) {
    NN.train(X, y);
    i = i + 1;
}
