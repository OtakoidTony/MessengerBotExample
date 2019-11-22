// https://aljjabaegi.tistory.com/391
function sumMatrix(A,B){
    var answer = Array();
    for(var i=0; i<A.length; i++){
        answer[i] = [];
        for(var j=0; j<A[0].length; j++){
            answer[i][j] = A[i][j]+B[i][j];
        }
    }
    return answer;
}

const random={};

random.rand = function(a){
    var q=[];
    var i=0;
    while (i<a){
        q.push(Math.random());
        i=i+1;
    }
    return q;
}

function sigmoid(x){
    return 1 / (1 + Math.exp(-x));
}

function ReLU(x){
    if (x>=0){
        return x;
    }else{
        return 0;
    }
}
