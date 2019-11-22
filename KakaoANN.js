const Matrix = {};

Matrix.sum = function(A, B) {
    var answer = Array();
    for (var i = 0; i < A.length; i++) {
        answer[i] = [];
        for (var j = 0; j < A[0].length; j++) {
            answer[i][j] = A[i][j] + B[i][j];
        }
    }
    return answer;
}
Matrix.multiply = function(a, b) {
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
Matrix.dot = function(A, B) {
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
Matrix.scalar_time = function(A, B) {
    var out = [];
    for (var i in A) {
        out[i] = [];
        for (var j in A[i]) {
            out[i][j] = A[i][j] * B[i][j];
        }
    }
    return out;
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function sigmoid_derivative(p) {
    return p * (1 - p);
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

function NeuralNetwork(x, y) {
    this.input = x;
    this.weights1 = Matrix.rand(Matrix.shape(this.input)[1], 4); // considering we have 4 nodes in the hidden layer
    this.weights2 = Matrix.rand(4, 1);
    this.y = y;
    this.output = Matrix.zeros(Matrix.shape(y)[0], Matrix.shape(y)[1]);

    this.feedforward = function() {
        this.layer1 = Matrix.sigmoid(Matrix.multiply(this.input, this.weights1));
        this.layer2 = Matrix.sigmoid(Matrix.multiply(this.layer1, this.weights2));
        return this.layer2
    }

    this.backprop = function() {
        var d_weights2 = Matrix.dot(Matrix.T(this.layer1), Matrix.scalar_time(
                Matrix.time(Matrix.plus(this.y,Matrix.time(this.output,-1),2),
                    Matrix.sigmoid_derivative(this.output))))

        var d_weights1 = Matrix.multiply(
            Matrix.T(this.input),
            Matrix.multiply(
                Matrix.time(
                    Matrix.plus(this.y, -this.output), 2 * sigmoid_derivative(this.output)),
                Matrix.T(this.weights2),

            ), Matrix.sigmoid_derivative(this.layer1)
        );
        /*
        np.dot(
            self.input.T,
            np.dot(
                time((self.y -self.output),2*sigmoid_derivative(self.output)),
                self.weights2.T
            )*sigmoid_derivative(self.layer1)
        )
        */
        this.weights1 = Matrix.plus(this.weights1, d_weights1);
        this.weights2 = Matrix.plus(this.weights2, d_weights2);
    }

    this.train = function(X, y) {
        this.output = this.feedforward()
        this.backprop()
    }
}
