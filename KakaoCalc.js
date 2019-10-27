String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

factorial = function(input) {
    var temp  =1;
    var output=1;
    while(temp<=input){
        output = output*temp;
        temp   = temp+1;
    }
    return output;
}

exp = function(input) {
    var temp=0;
    var output=0;
    while (temp<=20){
        output=((input**temp)/factorial(temp))+output;
        temp=temp+1;
    }
    return output;
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg.charAt(0) == "계" && msg.charAt(1) == "산") {
        var calc = 0;
        if(msg.indexOf("\'")    ==-1 && msg.indexOf("\"")     ==-1&&
           msg.indexOf("Api")   ==-1 && msg.indexOf("Utils")  ==-1&&
           msg.indexOf("Log")   ==-1 && msg.indexOf("Appdata")==-1&&
           msg.indexOf("Data")  ==-1 && msg.indexOf("Bridge") ==-1&&
           msg.indexOf("Device")==-1 && msg.indexOf("File")   ==-1&&
           msg.indexOf("var")   ==-1 && msg.indexOf("?")      ==-1){
            replier.reply(eval(msg.split(" ", 2)[1]));
        }else{
            replier.reply("Exploit Detect");
        }
    }
}
