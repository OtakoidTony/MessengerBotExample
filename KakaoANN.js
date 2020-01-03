var Matrix = {};
Matrix.dot = function (a, b) {
    var aNumRows = a.length,
        aNumCols = a[0].length,
        bNumRows = b.length,
        bNumCols = b[0].length,
        m = new Array(aNumRows);
    for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols);
        for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;
            for (var i = 0; i < aNumCols; ++i) {
                m[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return m;
}

Matrix.shape = function (A) {
    return [A.length, A[0].length];
}

Matrix.numbers = function (a, b, n) {
    var A = [];
    var B = [];
    for (var j = 0; j < b; j++) {
        B.push(n);
    }
    for (var i = 0; i < a; i++) {
        A.push(B);
    }
    return A;
}
Matrix.zeros = function (a, b) {
    return Matrix.numbers(a, b, 0);
}

Matrix.multiply_scalar = function (A, B) {
    var out = 0;
    for (var i in A) {
        for (var j in A[i]) {
            out = out + A[i][j] * B[i][j];
        }
    }
    return out;
}
Matrix.zeros_like = (A, t) => A.map((v) => v.map((k) => (0)));
Matrix.T = (A) => A[0].map((col, i) => A.map(row => row[i]));
Matrix.time = (A, t) => A.map((v) => v.map((k) => (k * t)));
Matrix.plus = (a1, a2) => a1.map((b1, ind1) => b1.map((b2, ind2) => b2 + a2[ind1][ind2]));
Matrix.minus = (a1, a2) => a1.map((b1, ind1) => b1.map((b2, ind2) => b2 - a2[ind1][ind2]));
Matrix.multiply = (a1, a2) => a1.map((b1, ind1) => b1.map((b2, ind2) => b2 * a2[ind1][ind2]));
Matrix.exp = (A) => A.map((v) => v.map((k) => Math.exp(k)));
Matrix.log = (A) => A.map((v) => v.map((k) => Math.log(k)));
Matrix.sigmoid = (A) => A.map((v) => v.map((k) => (1 / (1 + Math.exp(-k)))));
Matrix.sigmoid_derivative = (A) => A.map((v) => v.map((k) => (k * (1 - k))));
Matrix.ReLU = (A) => A.map((v) => v.map((k) => (Math.max(0.00000000001, k))));
Matrix.ReLU_derivative = (A) => A.map((v) => v.map((k) => (Math.max(0.00000000001, 1))));
Matrix.sum = function (A) {
    var result = 0;
    for (var i = 0; i < A.length; i++) {
        for (var j = 0; j < A[0].length; j++) {
            result += A[i][j];
        }
    }
    return result;
}
Matrix.rand = function (a, b) {
    var q = [];
    for (var i = 0; i < a; i++) {
        q[i] = [];
        for (var j = 0; j < b; j++) {
            q[i][j] = Math.random();
        }
    }
    return q;
}
Matrix.max = function (array) {
    var temp = [];
    for (var i in array) {
        temp.push(Math.max.apply(Math, array[i]));
    }
    return Math.max.apply(Math, temp);
};
Matrix.min = function (array) {
    var temp = [];
    for (var i in array) {
        temp.push(Math.min.apply(Math, array[i]));
    }
    return Math.min.apply(Math, temp);
};
Matrix.softmax = function (A) {
    var out = [];
    var max = Matrix.max(A);
    var max_matrix = Matrix.numbers(Matrix.shape(A)[0], Matrix.shape(A)[1], max);
    for (var i in A) {
        out[i] = [];
        for (var j in A[i]) {
            out[i][j] = Math.exp(A[i][j] - max) / Matrix.sum(Matrix.exp(Matrix.minus(A, max_matrix)));
        }
    }
    return out;
}
/**
 * Cross Entropy Error = −∑{p·log(q)}
 * @param {any} p
 * @param {any} q
 */
Matrix.cross_entropy_error = function (p, q) {
    var delta = 0.0000001;
    var qlog = Matrix.log(q + delta);
    return -Matrix.sum(Matrix.multiply(p, qlog));
}

Matrix.argmax = function (A, axis) {
    if (axis == 1) {
        var temp = [];
        for (var i in A) {
            temp.push(A[i].indexOf(Math.max.apply(Math, A[i])));
        }
        return [temp];
    }
    if (axis == 0) {
        var temp = [];
        var A = Matrix.T(A);
        for (var i in A) {
            temp.push(A[i].indexOf(Math.max.apply(Math, A[i])));
        }
        return [temp];
    }
}
/**
 * Mean Squared Error = 0.5∑(y-t)²
 * @param {any} y
 * @param {any} t
 */
Matrix.mean_squared_error = function (y, t) {
    var error = Matrix.minus(y, t);
    var squared = Matrix.multiply(error, error);
    return 0.5 * Matrix.sum(squared);
}

function numerical_gradient(f, x) {
    var delta = 0.00000000001;
    return (f(x + delta) - f(x - delta)) / (2 * delta);
}

Matrix.numerical_gradient = (f, A) => A.map((v) => v.map((k) => (numerical_gradient(f, k))));


Matrix.sum_axis_x = function (A) {
    var result = [];
    var sum = 0;
    for (var i = 0; i < A.length; i++) {
        for (var j = 0; j < A[0].length; j++) {
            sum = sum + A[j];
        }
        result[i] = sum;
        sum = 0;
    }
    return [result];
}

/**
 * Layer Object based on Y=XW+b
 * @param {any} W Weight
 * @param {any} b Bias
 */
function Affine(W, b) {
    /**Weight */
    this.W = W;
    /**Bias */
    this.b = b;
    this.forward = function (x) {
        this.x = x;
        return Matrix.plus(Matrix.dot(x, this.W), this.b);
    }
    this.backward = function (dout) {
        var dx = Matrix.dot(dout, Matrix.T(this.W));
        this.dW = Matrix.dot(Matrix.T(this.x), dout);
        this.db = Matrix.sum_axis_x(dout);
        return dx;
    }
}

/**
 * Layer Object based on Sigmoid Function
 * */
function Sigmoid() {
    this.forward = function (x) {
        var out = Matrix.sigmoid(x);
        this.out = out;
        return out;
    }
    this.backward = function (dout) {
        var shape = Matrix.shape(dout);
        var one = Matrix.numbers(shape[0], shape[1], 1);
        var dx = Matrix.multiply(Matrix.multiply(dout, Matrix.minus(one, this.out)), this.out);
        return dx;
    }
}

function SoftmaxWithLoss() {
    this.forward = function (x, t) {
        this.t = t;
        this.y = Matrix.softmax(x);
        this.loss = Matrix.cross_entropy_error(this.y, this.t);
        return this.loss;
    }
    this.backward = function () {
        var batch_size = Matrix.shape(this.t)[0];
        var dx = (this.y - this.t) / batch_size;
        return dx;
    }
}

/**
 * Artificial Neural Network Neuron
 * @param {Number} x Input
 * @param {Function} f Activation Function
 */
function Node(x, f) {
    this.input = x;
    this.output = function (w, b) {
        return this.f(this.x * w + b);
    }
}

function identity(x) {
    return x;
}

/*
 입력층의 노드가 3개, 은닉층의 노드가 2개, 출력층의 노드가 3개인 신경망은?
 단, 은닉층 활성화 함수는 Sigmoid를 사용하고, 출력층 활성화 함수는 softmax를 사용하시오.
 */
function NeuralNetwork(x, y) {
    this.training_set_inputs = x;
    this.training_set_outputs = y;

    this.x0_1;
    this.x0_2;
    this.x0_3;

    this.b1 = Math.random();
    this.b2 = Math.random();

    this.a0_1;
    this.a0_2;
    this.a0_3;

}




/* 3 layer */
function NeuralNetwork3Layer(x, y) {
    this.training_set_inputs = x;
    this.training_set_outputs = y;
    var l2 = 5;
    var l3 = 7;

    this.synaptic_weights1 = Matrix.minus(Matrix.time(Matrix.rand(3, l2), 2), Matrix.numbers(3, l2, 1));
    this.synaptic_weights2 = Matrix.minus(Matrix.time(Matrix.rand(l2, l3), 2), Matrix.numbers(l2, l3, 1));
    this.synaptic_weights3 = Matrix.minus(Matrix.time(Matrix.rand(l3, 1), 2), Matrix.numbers(l3, 1, 1));
    this.feedforward = function () {
        this.layer1 = Matrix.sigmoid(Matrix.dot(this.training_set_inputs, this.synaptic_weights1));
        this.layer2 = Matrix.sigmoid(Matrix.dot(this.layer1, this.synaptic_weights2));
        this.layer3 = Matrix.sigmoid(Matrix.dot(this.layer2, this.synaptic_weights3));
        return this.layer3;
    }
    this.backprop = function () {
        this.del3 = Matrix.multiply(Matrix.minus(this.training_set_outputs, this.layer3), Matrix.sigmoid_derivative(this.layer3));
        this.del2 = Matrix.multiply(Matrix.dot(this.synaptic_weights3, Matrix.T(this.del3)), (Matrix.T(Matrix.sigmoid_derivative(this.layer2))));
        this.del1 = Matrix.multiply(Matrix.dot(this.synaptic_weights2, this.del2), (Matrix.T(Matrix.sigmoid_derivative(this.layer1))));

        this.adjustment3 = Matrix.dot(Matrix.T(this.layer2), this.del3);
        this.adjustment2 = Matrix.dot(Matrix.T(this.layer1), Matrix.T(this.del2));
        this.adjustment1 = Matrix.dot(Matrix.T(this.training_set_inputs), Matrix.T(this.del1));

        this.synaptic_weights1 = Matrix.plus(this.synaptic_weights1, this.adjustment1);
        this.synaptic_weights2 = Matrix.plus(this.synaptic_weights2, this.adjustment2);
        this.synaptic_weights3 = Matrix.plus(this.synaptic_weights3, this.adjustment3);
    }
    this.train = function (number_of_training) {
        for (k = 0; k < number_of_training; k++) {
            this.feedforward();
            this.backprop();
        }
    }
    this.forward_pass = function (inputs) {
        var layer1 = Matrix.sigmoid(Matrix.dot(inputs, this.synaptic_weights1));
        var layer2 = Matrix.sigmoid(Matrix.dot(layer1, this.synaptic_weights2));
        var layer3 = Matrix.sigmoid(Matrix.dot(layer2, this.synaptic_weights3));
        return layer3;
    }
    this.shape = function () {
        console.info();
        console.info("Artificial Neural Network 3 Layer Matrix Shape");
        console.info("=====================================================");
        console.info("layer  1: " + Matrix.shape(this.layer1));
        console.info("layer  2: " + Matrix.shape(this.layer2));
        console.info("layer  3: " + Matrix.shape(this.layer3));
        console.info();
        console.info("del    1: " + Matrix.shape(this.del1));
        console.info("del    2: " + Matrix.shape(this.del2));
        console.info("del    3: " + Matrix.shape(this.del3));
        console.info();
        console.info("adjust 1: " + Matrix.shape(this.adjustment1));
        console.info("adjust 2: " + Matrix.shape(this.adjustment2));
        console.info("adjust 3: " + Matrix.shape(this.adjustment3));
        console.info();
        console.info("weight 1: " + Matrix.shape(this.synaptic_weights1));
        console.info("weight 2: " + Matrix.shape(this.synaptic_weights2));
        console.info("weight 3: " + Matrix.shape(this.synaptic_weights3));
        console.info();
    }
}
training_set_inputs = [
    [0, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [0, 1, 1]
];
training_set_outputs = Matrix.T([
    [0, 1, 1, 0]
]);
var neural_network = new NeuralNetwork3Layer(training_set_inputs, training_set_outputs);
neural_network.train(10000);
neural_network.forward_pass([
    [1, 0, 0]
]);
neural_network.shape();