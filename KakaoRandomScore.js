/*************************************************
 * 개발자: Rojiku
 * 요청자: rustic606
 * 요청글: https://cafe.naver.com/nameyee/20742
 *************************************************/

/**
 * name을 기준으로 객체배열을 정렬하는 함수
 * @param name 정렬할 기준이 되는 key
 * @param ascending 오름차순 여부
 */
Array.prototype.sort_by = function (name, ascending) {
    if (ascending) {
        return this.sort(function (a, b) {
            if (a[name] > b[name]) {
                return 1;
            }
            if (a[name] < b[name]) {
                return -1;
            }
            return 0;
        });
    } else {
        return this.sort(function (a, b) {
            if (a[name] > b[name]) {
                return -1;
            }
            if (a[name] < b[name]) {
                return 1;
            }
            return 0;
        });
    }
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

var senderData = FileStream.read("sdcard/Kakao_senderData/senderData.json");
if (senderData == null) senderData = {};
else senderData = JSON.parse(senderData);

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (!(room in senderData)) {
        senderData[room] = [];
    }

    if (msg == "!출석") {
        if (senderData[room].findObjectIndex('name', sender) == -1) {
            senderData[room].push({
                'name': sender,
                'score': parseInt(Math.random() * 10) + 1
            });
        } else {
            senderData[room].findObject('name', sender).score += parseInt(Math.random() * 10) + 1;
        }
        replier.reply("출석되었습니다.");
        FileStream.write("sdcard/Kakao_senderData/senderData.json", JSON.stringify(senderData, null, '\t'));
    }

    if (msg == "!출석통계") {
        senderData[room].sort_by('score', ascending = false);
        var output = '\u200b'.repeat(500) + '\n\n';
        for (var i = 0; i < senderData[room].length; i++) {
            if (i == senderData[room].length - 1) {
                output += "이름: " + senderData[room][i].name + "\n";
                output += "순위: " + (i + 1) + "\n";
                output += "점수: " + senderData[room][i].score;
            } else {
                output += "이름: " + senderData[room][i].name + "\n";
                output += "순위: " + (i + 1) + "\n";
                output += "점수: " + senderData[room][i].score + "\n\n";
            }
        }
        replier.reply(output);
    }
}