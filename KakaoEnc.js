/* 
input : String
output: Array
*/
stringToUnicode = function(str) {
    if (!str) return false; // Escaping if not exist
    var unicode = '';
    test = new Array;
    for (var i = 0, l = str.length; i < l; i++) {
        test.push(str[i].charCodeAt(0).toString(16));
    };
    return test;
}


/* 
input : .toString(16)
output: Char
*/
unicodeToChar = function(str) {
    return String.fromCharCode(parseInt(str,16));
}


/* 
input : .toString(16)
output: Braille
*/
hexToBraille = function(str) {
    if (str.length == 2){
        return String.fromCharCode(parseInt('200B',16))+String.fromCharCode(parseInt('28'+str,16));
    }else{
        return String.fromCharCode(parseInt('28'+str[0]+str[1],16))+String.fromCharCode(parseInt('28'+str[2]+str[3],16));
    }
}


/* 
input : Braille
output: Array
*/
brailleToHex = function(str) {
    if (!str) return false; // Escaping if not exist
    var unicode = '';
    test = new Array;

    var i = 0;
    while (i<str.length) {
        test.push(str[i].charCodeAt(0).toString(16)[2]+str[i].charCodeAt(0).toString(16)[3]+str[i+1].charCodeAt(0).toString(16)[2]+str[i+1].charCodeAt(0).toString(16)[3]);
        i=i+2;
    };
    return test;
}


function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if(msg.substring(0,3)=="enc!"){
        var input=msg.substring(4,msg.length-1);
    }
    replier.reply(eval(msg));
}
