
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
    var isComp='';
    if (D<0){
        D=-D;
        isComp='i';
    }
    while (i<=java.lang.Math.pow(D,0.5)){
        if(D%(i*i)==0){
            D=D/(i*i);
            Dsqare=Dsqare*i;
        }
        i=i+1;
    }
    Log.info(D);
    Log.info(Dsqare);
    // (-b±√b²-4ac)/2a
    var output1=0;
    return (-b).toString(10)+'±'+Dsqare.toString(10)+'√'+D.toString(10)+isComp+'/'+(2*a).toString(10);
}


makeQuadEqation = function(a,b){
    var A=-(a+b);
    var B=a*b;
    var Astr="";
    var Bstr="";
    if (A>0){
        Astr="+"+A.toString(10)+"𝒙";
    }
    if (A<0){
        Astr=A.toString(10)+"𝒙";
    }
    if (B>0){
        Bstr="+"+B.toString(10);
    }
    if (B<0){
        Bstr=B.toString(10);
    }
    return "𝒙²"+Astr.replace('-','–')+Bstr;
}
    
