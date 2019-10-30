/* 
input : String
output: Array

stringToUnicode("문자열 string")
bb38,c790,c5f4,20,73,74,72,69,6e,67
*/
stringToUnicode = function(str) {
    if (!str) return false; // Escaping if not exist
    var unicode = '';
    test = new Array;
    var ascii='';
    for (var i = 0, l = str.length; i < l; i++) {
        ascii = str[i].charCodeAt(0).toString(16);
        if (ascii.length==2){
            test.push("00"+ascii);
        }else{
            test.push(ascii);
        }
    };
    return test;
}

/* 
input : UnicodeArray
output: BrailleString

unicodeArrayToBrailleString(stringToUnicode("문자열 string"))
⢻⠸⣇⢐⣅⣴​⠠​⡳​⡴​⡲​⡩​⡮​⡧
*/
unicodeArrayToBrailleString = function(str) {
    if (!str) return false; // Escaping if not exist
    var unicode = '';
    var i = 0;
    while(i<str.length){
        unicode=unicode+hexToBraille(str[i]);
        i = i + 1;
    }
    return unicode;
}


/* 
input : Braille
output: Array

brailleToHex(unicodeArrayToBrailleString(stringToUnicode("문자열 string")))
bb38,c790,c5f4,20,73,74,72,69,6e,67
*/
brailleToHex = function(str) {
    if (!str) return false; // Escaping if not exist
    var unicode = '';
    test = new Array;

    var i = 0;
    var first = '';
    var second = '';
    while (i<str.length) {
        Log.info(str[i]);
        first  = str[i].charCodeAt(0).toString(16)[2]+str[i].charCodeAt(0).toString(16)[3];
        second = str[i+1].charCodeAt(0).toString(16)[2]+str[i+1].charCodeAt(0).toString(16)[3];
        if (str[i].charCodeAt(0).toString(16)=='200b'){
            test.push(second);
        } else {
            test.push(first+second);
        }
        i = i + 2;
    };
    return test;
}

/*
input : Array
output: String

unicodeArrayToString(brailleToHex(unicodeArrayToBrailleString(stringToUnicode("문자열 string"))))
문자열 string
*/
unicodeArrayToString = function(str) {
    if (!str) return false; // Escaping if not exist
    var unicode = '';
    var i = 0;
    while(i<str.length){
        unicode=unicode+unicodeToChar(str[i]);
        i = i + 1;
    }
    return unicode;
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

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if(msg.substring(0,3)=="enc!"){
        var input=msg.substring(4,msg.length-1);
    }
    replier.reply(eval(msg));
}

/*
stringToUnicode("문자열 string")
bb38,c790,c5f4,20,73,74,72,69,6e,67

unicodeArrayToBrailleString(stringToUnicode("문자열 string"))
⢻⠸⣇⢐⣅⣴​⠠​⡳​⡴​⡲​⡩​⡮​⡧

brailleToHex(unicodeArrayToBrailleString(stringToUnicode("문자열 string")))
bb38,c790,c5f4,20,73,74,72,69,6e,67

unicodeArrayToString(brailleToHex(unicodeArrayToBrailleString(stringToUnicode("문자열 string"))))
문자열 string
*/
