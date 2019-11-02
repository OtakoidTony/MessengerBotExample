String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

factorial = function(input) {
    var temp = 1;
    var output = 1;
    while (temp <= input) {
        output = output * temp;
        temp = temp + 1;
    }
    return output;
}

exp = function(input) {
    var temp = 0;
    var output = 0;
    while (temp <= 20) {
        output = (java.lang.Math.pow(input, temp) / factorial(temp)) + output;
        temp = temp + 1;
    }
    return output;
}

cos = function(input){
    var temp = 0;
    var output = 0;
    while (temp <= 20) {
        output = (java.lang.Math.pow(-1, temp)*java.lang.Math.pow(input, 2*temp) / factorial(2*temp)) + output;
        temp = temp + 1;
    }
    return output;
}

sin = function(input){
    var temp = 0;
    var output = 0;
    while (temp <= 20) {
        output = (java.lang.Math.pow(-1, temp)*java.lang.Math.pow(input, 2*temp+1) / factorial(2*temp+1)) + output;
        temp = temp + 1;
    }
    return output;
}

eta = function(input){
    var temp = 1;
    var output = 0;
    while (temp <= 20) {
        output = output + java.lang.Math.pow(-1, temp-1)/java.lang.Math.pow(temp, input);
        temp = temp + 1;
    }
    return output
}

zeta = function(input){
    return eta(input)/(1-java.lang.Math.pow(2, 1-input));
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg.charAt(0) == "계" && msg.charAt(1) == "산") {
        var calc = 0;
        var input = msg;
        input = input.split(" ", 2)[1];
        input = input.replace('η', 'eta');
        input = input.replace('Γ', 'gamma');
        input = input.replace('ζ', 'zeta');
        var test = input;
        var i = 0;
        while (i<10){
            test = test.replaceAll(i.ToString(10),"");
            test = test.replaceAll(" ","");
            i=i+1;
        }
        i = 0;
        var WhiteList = new Array("sin", "cos", "exp", "eta", "zeta", "factorial", "\(", "\)");
        while (i<=WhiteList.length){
            test = test.replaceAll(WhiteList[i], '');
            i = i+1;
        }
        if (test==""){
            replier.reply(eval(input));
        }
    }
}
