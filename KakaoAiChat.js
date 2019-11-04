function randomItem(a) {
    return a[java.lang.Math.floor(java.lang.Math.random() * a.length)];
}

const msgDict = {
    'Hello': "Hello World!",
    'loli is': "LIFE!!!",
    'XD': "lol"
};

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    var probability = java.lang.Math.random() * 100;
    if (probability >=70){
        if (msg in msgDict){
            replier.reply(msgDict[msg]);
        }
    }
}
