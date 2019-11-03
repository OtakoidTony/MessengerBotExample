
sigma = function(inf, sup, expression){
    var temp=inf;
    var output=0;
    while (temp<=sup){
        output=output+expression;
        temp=temp+1;
    }
    return output;
}
