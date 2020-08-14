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
        input = input.replaceAll('η', 'eta');
        input = input.replaceAll('Γ', 'gamma');
        input = input.replaceAll('ζ', 'zeta');
        input = input.replaceAll('÷', '/');
        var test = input;
        var i = 0;
        test = test.replace(/ /gi, "");
        test = test.replace(/[0-9]/g, "");
        i = 0;
        var WhiteList = ["sin", "cos", "exp", "eta", "zeta", "factorial", "\(", "\)", "+", "-", "*", "/"];
        for (var i=0; i<WhiteList.length; i++)
            test = test.replaceAll(WhiteList[i], '');
        if (test==""){
            replier.reply(eval(input));
        }
    }
}
