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

/**
 * 입력받은 Date객체에 대하여 같은 날짜인지 아닌지를 반환하는 함수
 * @param targetDate 비교할 Date 객체
 */
Date.prototype.isSameDate = function (targetDate) {
    return (
        /* 일(Day)이 같은지 판별 */
        this.getDate() == targetDate.getDate() &&

        /* 월(Month)이 같은지 판별 */
        this.getMonth() == targetDate.getMonth() &&

        /* 년도(Year)가 같은지 판별 */
        this.getFullYear() == targetDate.getFullYear()
    );
}

const fileUrl = "sdcard/Kakao_senderData/senderData.json";

var senderData = JSON.parse(FileStream.read(fileUrl));
if (senderData == null) senderData = {};

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (!(room in senderData)) {
        senderData[room] = [];
    }

    if (msg == "!방초기화") {
        senderData[room] = [];
        FileStream.write(fileUrl, JSON.stringify(senderData, null, '\t'));
    }

    if (msg == "!전체초기화") {
        senderData = {};
        FileStream.write(fileUrl, JSON.stringify(senderData, null, '\t'));
    }

    if (msg == "!출석") {
        if (senderData[room].findObjectIndex('name', sender) == -1) {
            var score = parseInt(Math.random() * 10) + 1;
            senderData[room].push({
                'name': sender,
                'score': score,
                'date': (new Date()).toString()
            });
            replier.reply(score + "점 출석되었습니다.");
            FileStream.write(fileUrl, JSON.stringify(senderData, null, '\t'));
        } else {
            var targetDate = new Date(senderData[room].findObject('name', sender).date);
            if (targetDate.isSameDate(new Date())) {
                replier.reply("이미 출석하였습니다.");
            } else {
                var score = parseInt(Math.random() * 10) + 1;
                senderData[room].findObject('name', sender).score += score;
                senderData[room].findObject('name', sender).date = (new Date()).toString();
                replier.reply(score + "점 출석되었습니다.");
                FileStream.write(fileUrl, JSON.stringify(senderData, null, '\t'));
            }
        }
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
