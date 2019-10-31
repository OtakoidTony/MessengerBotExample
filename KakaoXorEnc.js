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

stringXor = function(str, password){
    output = new Array;
    for (var i = 0, l = str.length; i < l; i++) {
        ascii = str[i];
        output.push(ascii^password[i%password.length]);
    }
    return output;
}

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

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg.substring(0, 4) == "enc!") {
        var input = msg.substring(4, msg.length);
        var encoded = xorConvert(input, "test");
        replier.reply(encoded);
    }
    if (msg.substring(0, 4) == "dec!") {
        var input = msg.substring(4, msg.length);
        var decoded = xorConvert(input, "test");
        replier.reply(decoded);
    }
}
