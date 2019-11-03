
sigma = function(inf, sup, expression){
    var temp=inf;
    var output=0;
    while (temp<=sup){
        output=output+expression;
        temp=temp+1;
    }
    return output;
}

quadEqation = function(a, b, c){
    var output="";
    var D=0;
    D=(b*b)-(4*a*c);
    var i=2;
    var Dsqare=1;
    while (i<=Math.Pow(D,0.5)){
        if(D%(i*i)==0){
            D=D/(i*i);
            Dsqare=Dsqare*i;
        }
        i=i+1;
    }
    Log.info(D);
    Log.info(Dsqare);
}

