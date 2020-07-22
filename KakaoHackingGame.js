/***********************************************************
 * File Name   : KakaoHackingGame.js
 * Author      : Rojiku
 * Description : 
 *     해킹을 주제로한 자동응답 RPG 게임 챗봇.
 ***********************************************************/

String.prototype.splitInto2Parts = function (chr) {
    var cmd_str = this.split(chr)[0];
    return [cmd_str, this.substring(cmd_str.length + 1, this.length)];
}

/**
 * 객체 배열 중에 key에 해당하는 값이 value인 객체의 인덱스를 반환하는 함수
 * @param key 찾을 값에 대한 key
 * @param value key에 해당하는 값
 */
Array.prototype.findObjectIndex = function (key, value) {
    for (var i = 0; i < this.length; i++)
        if (this[i][key] == value) return i;
    return -1;
};

/**
 * 객체 배열 중에 key에 해당하는 값이 value인 객체를 반환하는 함수  
 * 해당하는 객체가 없을 경우 null을 반환.
 * @param key 찾을 값에 대한 key
 * @param value key에 해당하는 값
 */
Array.prototype.findObject = function (key, value) {
    if (this.findObjectIndex(key, value) != -1) return this[this.findObjectIndex(key, value)];
    else return null;
};

var gameDatabase = JSON.parse(FileStream.read("sdcard/Kakao_HackingGame/database.json"));
if (gameDatabase == null) gameDatabase = [];

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg == "!게임도움말") {
        var res = "";
        replier.reply(res);
    }

    if (msg == "!가입") {
        gameDatabase.push({
            "name": sender,
            "job": "Student",
            "nick": "Player",
            "level": 1,
            "arrested": 0,
            "successed": 0,
            "tried": 0
        });
    }

    if (msg.splitInto2Parts(' ')[0] == "!해킹") {
        if(gameDatabase.findObjectIndex('name', sender)==-1){
            replier.reply("가입되지 않은 유저입니다.\n!가입 을 입력하여 가입해주세요.");
        }else{
            const target = msg.splitInto2Parts(' ')[1]
            var successRate = Math.random();
            if (successRate > 0.5) {
                replier.reply(target + " 해킹에 성공하였습니다.");
    
            } else if (successRate < 0.3) {
                replier.reply(target + "을 해킹하다가 들통났습니다!");
                successRate = Math.random();
                if (successRate < 0.05) {
                    replier.reply("당신은 수사기관을 해킹하는데 성공하여 모든 증거를 인멸하였습니다.");
                }
            } else {
                replier.reply(target + "을 해킹하는 데 실패하였습니다.");
            }
        }
    }
}
