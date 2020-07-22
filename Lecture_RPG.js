/***********************************************************
 * File Name   : Lecture_RPG.js
 * Author      : Rojiku
 * Description : 
 *     RPG 개발 강좌에 사용될 RPG 챗봇 소스코드.
 ***********************************************************/


/**
 * 매개변수를 기준으로 앞에서부터 두 원소로 쪼갠 결과값을 내보내는 함수
 * @param chr 구분할 문자열
 */
String.prototype.splitInto2Parts = function (chr) {
    var cmd_str = this.split(chr)[0];
    return [cmd_str, this.substring(cmd_str.length + 1, this.length)];
};

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

/* 데이터가 저장될 경로를 지정해줍니다. */
const fileUrl = "sdcard/MsgBot_RPG/database.json"

/* 데이터가 저장된 파일을 읽어서 객체로 변환해줍니다. */
var gameDatabase = JSON.parse(FileStream.read(fileUrl));

/* 만약 파일이 없어서 객체로 변환한 결과 null값인 경우에 데이터가 담길 변수를 빈 배열로 초기화 해줍니다. */
if (gameDatabase == null) gameDatabase = [];


function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    /* 우선은 가입한 유저에 한하여 서비스를 제공할 것이므로 가입 커맨드를 정의해줍니다. */
    if (msg == "!가입") {
        /* 위에서 정의한 함수를 이용해 이미 가입되어있는지를 확인합니다. */
        if (gameDatabase.findObjectIndex('name', sender) == -1) {
            /* 가입되지 않은 유저의 경우, 해당 유저에 대한 새로운 데이터를 추가합니다. */
            gameDatabase.push({
                /* name 속성을 넣어서 유저를 구분하는 방식은 랭킹 시스템을 구현하기에 적절한 방식입니다. */
                "name": sender,
                /* 상점 시스템을 위해서는 gold 속성을 넣어 주는게 적절합니다. */
                "gold": 0,
                /* exp 속성을 이용해 level을 계산할 것이므로 level 속성은 정의하지 않아도 됩니다. */
                "exp": 0
            });
            /* 가입이 성공적으로 된 경우에 가입되었음을 알려줘야 유저가 혼란해 하지 않습니다. */
            replier.reply("가입되었습니다!");
            /* 가입이 된 다음에는 반드시 데이터를 파일로 저장해야 합니다. */
            FileStream.write(fileUrl, JSON.stringify(gameDatabase, null, '\t'));
        } else {
            replier.reply("이미 가입되어 있습니다.");
        }
    }

    /* 던전에서 유저들이 경험치를 쌓을 수 있게 구현할 것 입니다. */
    if (msg == "!던전") {
        /* 만약, 가입되지 않은 유저인 경우에 가입을 하도록 유도합니다. */
        if (gameDatabase.findObjectIndex('name', sender) == -1) {
            replier.reply("가입되지 않은 유저입니다.\n!가입 을 입력하여 가입해주세요.");
        } else {
            /* 이 변수가 유저한테 토벌시 얼마의 경험치를 지급할지 결정합니다 */
            var receivedExp = parseInt(Math.random() * 15 + 15);
            /* 이 변수가 유저한테 토벌시 얼마의 골드를 지급할지 결정합니다 */
            var receivedGold = parseInt(Math.random() * 50 + 150);
            /* 이 변수는 유저가 토벌할 확률을 제어합니다. */
            var successRate = Math.random();

            /* 본 코드는 70% 확률로 토벌에 성공하는 것으로 설정했습니다. */
            if (successRate < 0.7) {
                var res = "토벌에 성공하였습니다.\n\n";
                res += "경험치: +"+receivedExp+"\n";
                res += "골드: +"+receivedGold;

                /* 위에서 정의한 함수를 이용하여 유저의 데이터를 변경해줍니다. */
                gameDatabase.findObject('name', sender).exp += receivedExp;
                gameDatabase.findObject('name', sender).gold += receivedGold;

                /* 변경사항이 생기면 반드시 저장해줍니다. */
                FileStream.write(fileUrl, JSON.stringify(gameDatabase, null, '\t'));
                replier.reply(res);
            }else{
                replier.reply("토벌에 실패하였습니다.");
            }
        }
    }

}
