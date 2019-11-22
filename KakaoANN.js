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

function 
