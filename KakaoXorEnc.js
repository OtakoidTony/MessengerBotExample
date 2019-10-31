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
