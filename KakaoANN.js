var Matrix = {};

Matrix.dot = function(a, b) {
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
            out[i][j] = Math.max(0.00000000001, A[i][j]);
        }
    }
    return out;
}
Matrix.ReLU_derivative = function(A) {
    var out = [];
    for (var i in A) {
        out[i] = [];
        for (var j in A[i]) {
            out[i][j] = Math.max(0.00000000001, 1);
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
    this.input = x;
    this.weights1 = Matrix.rand(Matrix.shape(this.input)[1], Matrix.shape(this.input)[0]);
    this.weights2 = Matrix.rand(Matrix.shape(y)[0], Matrix.shape(y)[1]);
    
    this.y = y;
    this.output = Matrix.zeros(Matrix.shape(y)[0], Matrix.shape(y)[1]);
    
    /* ŷ=σ(W₂σ(W₁x+b₁)+b₂) */
    this.feedforward = function() {
        this.layer1 = Matrix.sigmoid(Matrix.dot(this.input, this.weights1));
        this.layer2 = Matrix.sigmoid(Matrix.dot(this.layer1, this.weights2));
        return this.layer2;
    }
    
    /* Loss(y,ŷ)=Σ(y-ŷ)² */
    this.backprop = function() {
        var run_1 = Matrix.minus(this.y, this.output); /* y-ŷ₂ */
        var run_2 = Matrix.time(run_1, 2); /* 2(y-ŷ₂) */
        var run_3 = Matrix.multiply(run_2, Matrix.sigmoid_derivative(this.output)); /* 2(y-ŷ₂)σ'(ŷ₂) */
        var d_weights2 = Matrix.dot(Matrix.T(this.layer1), run_3); /* 2(y-ŷ₂)σ'(ŷ₂)ŷ₁ᵀ */

        var run_4 = Matrix.dot(run_3, Matrix.T(this.weights2));
        var run_5 = Matrix.multiply(run_4, Matrix.sigmoid_derivative(this.layer1));
        var d_weights1 = Matrix.dot(Matrix.T(this.input), run_5);

        this.weights1 = Matrix.plus(this.weights1, d_weights1);
        this.weights2 = Matrix.plus(this.weights2, d_weights2);
    }

    this.train = function(X, y) {
        if (X != null && y != null) {
            this.input = X;
            this.y = y;
        }
        this.output = this.feedforward();
        this.backprop();
    }
}


/* 3 layer */
function NeuralNetwork3Layer(x, y){
	this.training_set_inputs = x;
	this.training_set_outputs = y;
	
	var l2 = 12;
	var l3 = 12;
	
	this.synaptic_weights1 = Matrix.minus(Matrix.time(Matrix.rand(3, l2), 2), Matrix.numbers(3, l2, 1));
	this.synaptic_weights2 = Matrix.minus(Matrix.time(Matrix.rand(l2, l3), 2), Matrix.numbers(l2, l3, 1));
	this.synaptic_weights3 = Matrix.minus(Matrix.time(Matrix.rand(l3, 1), 2), Matrix.numbers(l3, 1, 1));
	
	this.feedforward = function(){		
		this.layer1 = Matrix.sigmoid(Matrix.dot(this.training_set_inputs, this.synaptic_weights1));
		this.layer2 = Matrix.sigmoid(Matrix.dot(this.layer1, this.synaptic_weights2));
		this.layer3 = Matrix.sigmoid(Matrix.dot(this.layer2, this.synaptic_weights3));
        return this.layer3;
    }
	
	this.backprop = function(){
		var del3 = Matrix.multiply(Matrix.minus(this.training_set_outputs, this.layer3), Matrix.sigmoid_derivative(this.layer3));
		var del2 = Matrix.multiply(Matrix.dot(this.synaptic_weights3, Matrix.T(del3)),(Matrix.T(Matrix.sigmoid_derivative(this.layer2))));
		var del1 = Matrix.multiply(Matrix.dot(this.synaptic_weights2, del2),(Matrix.T(Matrix.sigmoid_derivative(this.layer1))));
			
		var adjustment3 = Matrix.dot(Matrix.T(this.layer2), del3);
		var adjustment2 = Matrix.dot(Matrix.T(this.layer1), Matrix.T(del2));
		var adjustment1 = Matrix.dot(Matrix.T(this.training_set_inputs), Matrix.T(del1));
			
		this.synaptic_weights1 = Matrix.plus(this.synaptic_weights1, adjustment1);
		this.synaptic_weights2 = Matrix.plus(this.synaptic_weights2, adjustment2);
		this.synaptic_weights3 = Matrix.plus(this.synaptic_weights3, adjustment3);
	}
	
	this.train = function(number_of_training){
		for (k = 0; k < number_of_training; k++){
			this.feedforward();
			this.backprop();
		}
	}
	
	this.forward_pass = function(inputs){
		var layer1 = Matrix.sigmoid(Matrix.dot(inputs, this.synaptic_weights1));
		var layer2 = Matrix.sigmoid(Matrix.dot(layer1, this.synaptic_weights2));
		var layer3 = Matrix.sigmoid(Matrix.dot(layer2, this.synaptic_weights3));
		return layer3;
	}
}

training_set_inputs = [[0,0,1],[1,1,1],[1,0,1],[0,1,1]];
training_set_outputs = Matrix.T([[0,1,1,0]]);
var neural_network = new NeuralNetwork3Layer(training_set_inputs,training_set_outputs);

neural_network.train(10000);
neural_network.forward_pass([[1,0,0]]);








/*
function NeuralNetwork4Layer(x, y){
	this.inputs = x;
	this.y = y;
	
	var l2 = 6;
	var l3 = 6;
	var l4 = 6;
	
	this.synaptic_weights1 = Matrix.minus(Matrix.time(Matrix.rand(3,  l2), 2), Matrix.numbers(3,  l2, 1));
	this.synaptic_weights2 = Matrix.minus(Matrix.time(Matrix.rand(l2, l3), 2), Matrix.numbers(l2, l3, 1));
	this.synaptic_weights3 = Matrix.minus(Matrix.time(Matrix.rand(l3, l4), 2), Matrix.numbers(l3, l4, 1));
	this.synaptic_weights4 = Matrix.minus(Matrix.time(Matrix.rand(l4,  1), 2), Matrix.numbers(l4,  1, 1));
	
	this.feedforward = function(){		
		this.layer1 = Matrix.sigmoid(Matrix.dot(this.inputs, this.synaptic_weights1));
		this.layer2 = Matrix.sigmoid(Matrix.dot(this.layer1, this.synaptic_weights2));
		this.layer3 = Matrix.sigmoid(Matrix.dot(this.layer2, this.synaptic_weights3));
		this.layer4 = Matrix.sigmoid(Matrix.dot(this.layer3, this.synaptic_weights4));
        return this.layer4;
    }
	
	this.backprop = function(){
		var del4 = Matrix.multiply(Matrix.minus(this.y, this.layer4), (Matrix.sigmoid_derivative(this.layer4)));
		var del3 = Matrix.multiply(Matrix.dot(this.synaptic_weights4, Matrix.T(del4)),(Matrix.T(Matrix.sigmoid_derivative(this.layer3))));
		var del2 = Matrix.multiply(Matrix.dot(this.synaptic_weights3, (del3)),        (Matrix.T(Matrix.sigmoid_derivative(this.layer2))));
		var del1 = Matrix.multiply(Matrix.dot(this.synaptic_weights2, (del2)),        (Matrix.T(Matrix.sigmoid_derivative(this.layer1))));
			
		var adjustment4 = Matrix.dot(Matrix.T(this.layer3), del4);
		var adjustment3 = Matrix.dot(Matrix.T(this.layer2), del3);
		var adjustment2 = Matrix.dot(Matrix.T(this.layer1), del2);
		var adjustment1 = Matrix.dot(Matrix.T(this.inputs), Matrix.T(del1));
			
		this.synaptic_weights1 = Matrix.plus(this.synaptic_weights1, adjustment1);
		this.synaptic_weights2 = Matrix.plus(this.synaptic_weights2, adjustment2);
		this.synaptic_weights3 = Matrix.plus(this.synaptic_weights3, adjustment3);
		this.synaptic_weights4 = Matrix.plus(this.synaptic_weights4, adjustment4);
	}
	
	this.train = function(number_of_training){
		for (k = 0; k < number_of_training; k++){
			this.feedforward();
			this.backprop();
		}
	}
	
	this.forward_pass = function(inputs){
		var layer1 = Matrix.sigmoid(Matrix.dot(inputs, this.synaptic_weights1));
		var layer2 = Matrix.sigmoid(Matrix.dot((layer1), Matrix.T(this.synaptic_weights2)));
		var layer3 = Matrix.sigmoid(Matrix.dot(layer2, this.synaptic_weights3));
		var layer4 = Matrix.sigmoid(Matrix.dot(layer3, this.synaptic_weights4));
		console.info(layer1,layer2,layer3,layer4);
		return layer4;
	}
}

training_set_inputs = [[0,0,1],[1,1,1],[1,0,1],[0,1,1]];
training_set_outputs = Matrix.T([[0,1,1,0]]);
var neural_network = new NeuralNetwork4Layer(training_set_inputs,training_set_outputs);

neural_network.train(1);
neural_network.forward_pass([[1,0,0]]);*/