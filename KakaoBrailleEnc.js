/* ===============[ http://evalonlabs.com/2015/12/10/Simple-XOR-Encryption-in-JS/ ]=============== */
function xorConvert (text, key) {
    var kL = key.length;
    return Array.prototype
        .slice.call(text)
        .map(function (c, index) {
            return String.fromCharCode(c.charCodeAt(0) ^ key[index % kL].charCodeAt(0));
        }).join('');
}
/* =============================================================================================== */

stringToUnicode = function(str) {
    if (!str) return false; // Escaping if not exist
    var unicode = '';
    test = new Array;
    var ascii = '';
    for (var i = 0, l = str.length; i < l; i++) {
        ascii = str[i].charCodeAt(0).toString(16);
        if (ascii.length == 2) {
            test.push("00" + ascii);
        } else {
            test.push(ascii);
        }
    };
    return test;
}

unicodeArrayToBrailleString = function(str) {
    if (!str) return false; // Escaping if not exist
    var unicode = '';
    var i = 0;
    while (i < str.length) {
        unicode = unicode + hexToBraille(str[i]);
        i = i + 1;
    }
    return unicode;
}

brailleToHex = function(str) {
    if (!str) return false; // Escaping if not exist
    var unicode = '';
    test = new Array;

    var i = 0;
    var first = '';
    var second = '';
    while (i < str.length) {
        Log.info(str[i]);
        first = str[i].charCodeAt(0).toString(16)[2] + str[i].charCodeAt(0).toString(16)[3];
        second = str[i + 1].charCodeAt(0).toString(16)[2] + str[i + 1].charCodeAt(0).toString(16)[3];
        if (str[i].charCodeAt(0).toString(16) == '200b') {
            test.push(second);
        } else {
            test.push(first + second);
        }
        i = i + 2;
    };
    return test;
}

unicodeArrayToString = function(str) {
    if (!str) return false; // Escaping if not exist
    var unicode = '';
    var i = 0;
    while (i < str.length) {
        unicode = unicode + unicodeToChar(str[i]);
        i = i + 1;
    }
    return unicode;
}

unicodeToChar = function(str) {
    return String.fromCharCode(parseInt(str, 16));
}

hexToBraille = function(str) {
    if (str.substring(0, 2) == '00') {
        return String.fromCharCode(parseInt('200B', 16)) + String.fromCharCode(parseInt('28' + str[2] + str[3], 16));
    } else {
        return String.fromCharCode(parseInt('28' + str[0] + str[1], 16)) + String.fromCharCode(parseInt('28' + str[2] + str[3], 16));
    }
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg.substring(0, 4) == "enc!") {
        var input = msg.substring(4, msg.length);
        input = xorConvert(input, "test");
        var encoded = unicodeArrayToBrailleString(stringToUnicode(input));
        replier.reply(encoded);
    }
    if (msg.substring(0, 4) == "dec!") {
        var input = msg.substring(4, msg.length);
        var decoded = unicodeArrayToString(brailleToHex(input));
        decoded = xorConvert(decoded, "test");
        replier.reply(decoded);
    }
}
