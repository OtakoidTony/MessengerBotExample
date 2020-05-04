function randomItem(a) {
    return a[Math.floor(Math.random() * a.length)];
}

var msgDict = {
    '안녕하세요': [
        "안녕하세여~!",
        "ㅎㅇㅎㅇ~!",
        "어서와여~!",
        "ㅎㅇ에여~!"
    ],
    '냥!': [
        "냐아앙~!",
        "냥~! 냥~!",
        "냐아~!"
    ],
    '박제': [
        "ㅋㅋㅋㅋㅋㅋ",
        "증! 거! 확! 보!"
    ],
    'ㅋㅋㅋㅋㅋㅋㅋㅋ': [
        "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
        "ㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎ"
    ]
};

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    var probability = java.lang.Math.random() * 100;
    if (probability >= 70){
        if (msg in msgDict){
            replier.reply(randomItem(msgDict[msg]));
        }
    }
}
