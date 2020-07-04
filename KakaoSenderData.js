/***********************************************************
 * File Name   : KakaoSenderData.js
 * Author      : Rojiku
 * Description : 
 *     채팅방에서 참가자가 발화한 횟수를 기록하고 등수를
 *     매기는 기능을 가진 챗봇. 출석부 기능 또한 구현되어
 *     있으며, 차후 관련 기능을 업데이트할 예정.
 ***********************************************************/

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

var senderData = FileStream.read("sdcard/Kakao_senderData/senderData.json");
if (senderData == null) senderData = {};
else senderData = JSON.parse(senderData);

const Mee6LevelSystem = {
    /**
     * 입력받은 레벨에 대하여 다음 레벨로 올라가기 위한 경험치를 반환하는 함수  
     *   
     * Mee6 Levels XP Document:  
     * https://github.com/Mee6/Mee6-documentation/blob/master/docs/levels_xp.md
     * @param lvl 레벨
     */
    'requireXP': function (lvl) {
        return 5 * (lvl * lvl) + 50 * lvl + 100;
    },
    /**
     * 경험치로부터 레벨을 계산하여 반환하는 함수
     * @param xp 경험치
     */
    'level': function (xp) {
        test = xp + 1
        level = -1
        while (true) {
            level += 1
            if (test <= 0) break;
            test -= Mee6LevelSystem.requireXP(level)
        }
        return level - 1
    }
}

var wipeClient = [];
var allWipeClient = [];

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (!(room in senderData)) {
        senderData[room] = [];
    }

    if (senderData[room].findObjectIndex('name', sender) == -1) {
        senderData[room].push({
            'name': sender,
            'score': 1,
            'time': (new Date()).toString()
        });
    } else {
        senderData[room].findObject('name', sender)['score'] += 1;
        senderData[room].findObject('name', sender)['time'] = (new Date()).toString();
    }

    var msg_arg = msg.split(' ');

    if (msg_arg[0] == "!json갱신") {
        /* senderData를 편집한 파일(patchData.json)을 불러와 patchData에 할당. */
        var patchData = FileStream.read("sdcard/Kakao_senderData/patchData.json");

        /* patchData가 null값인 경우, patchData에 기존의 senderData를 할당. */
        if (patchData == null) patchData = senderData;

        /* patchData가 null값이 아닌 경우, patchData를 객체로 변환. */
        else patchData = JSON.parse(patchData);

        /* senderData에 patchData를 덮어쓰기. */
        senderData = patchData;

        /* 변경된 사항을 저장. */
        FileStream.write("sdcard/Kakao_senderData/senderData.json", JSON.stringify(senderData, null, '\t'));

        replier.reply("Sender Data가 갱신되었습니다.");
    }

    if (msg_arg[0] == "!내정보") {
        senderData[room].sort_by('score', ascending = false);
        var resultIndex = senderData[room].findObjectIndex('name', sender);
        var result = senderData[room][resultIndex];
        var resText = "";
        resText += sender + "님의 정보\n\n";
        resText += "랭킹: " + (resultIndex + 1) + "\n";
        resText += "레벨: " + Mee6LevelSystem.level(result.score) + "\n";
        resText += "횟수: " + result.score;
        replier.reply(resText);
    }

    if (msg_arg[0] == "!초기화") {
        if (wipeClient.indexOf(sender) == -1) {
            wipeClient.push(sender);
        }
        var res = "정말로 초기화하시겠습니까?\n\n";
        res += "[y] Yes, [n] No";
        replier.reply(res);
    }

    if (wipeClient.indexOf(sender) != -1) {
        if (msg == 'y') {
            wipeClient.splice(wipeClient.indexOf(sender), 1);
            if (allWipeClient.indexOf(sender) == -1) {
                allWipeClient.push(sender);
            }
            var res = "[a] wipe all room data\n";
            res += "[t] wipe only this room data";
            replier.reply(res);
        }
        if (msg == 'n') {
            wipeClient.splice(wipeClient.indexOf(sender), 1);
            replier.reply("취소되었습니다.");
        }
    }

    if (allWipeClient.indexOf(sender) != -1) {
        if (msg == 'a') {
            allWipeClient.splice(allWipeClient.indexOf(sender), 1);
            senderData = {};
            FileStream.write("sdcard/Kakao_senderData/senderData.json", JSON.stringify(senderData, null, '\t'));
            replier.reply("모든 방에 대한 데이터가 초기화되었습니다.");
        }
        if (msg == 't') {
            allWipeClient.splice(allWipeClient.indexOf(sender), 1);
            senderData[room] = [];
            FileStream.write("sdcard/Kakao_senderData/senderData.json", JSON.stringify(senderData, null, '\t'));
            replier.reply("이 채팅방에 대한 데이터가 초기화되었습니다.");
        }
    }

    /* 당일 출석한 회원 목록 표시 */
    if (msg_arg[0] == "!출석부") {
        senderData[room].sort_by('score', ascending = false);
        var output = '\u200b'.repeat(500) + '\n\n';
        var today = new Date();
        for (var i = 0; i < senderData[room].length; i++) {
            user_time = new Date(senderData[room][i].time);
            if (user_time.isSameDate(today)) {
                if (i == senderData[room].length - 1) {
                    output += 'Name: ' + senderData[room][i].name;
                } else {
                    output += 'Name: ' + senderData[room][i].name + '\n\n';
                }
            }
        }
        replier.reply(output);
    }

    if (msg_arg[0] == "!랭킹") {

        /* 모든 회원에 대한 랭킹 표시 */
        if (msg_arg.length == 1) {
            senderData[room].sort_by('score', ascending = false);
            var output = '\u200b'.repeat(500) + '\n\n';
            for (var i = 0; i < senderData[room].length; i++) {
                user_time = new Date(senderData[room][i].time);
                output += 'Name: ' + senderData[room][i].name + '\n';
                output += 'Rank: ' + (i + 1) + "등" + '\n';
                output += 'Score: ' + senderData[room][i].score + '\n';
                if (i == senderData[room].length - 1) {
                    output += 'Time: ' + user_time.getFullYear() + "년 " + (user_time.getMonth() + 1) + "월 " + user_time.getDate() + "일";
                } else {
                    output += 'Time: ' + user_time.getFullYear() + "년 " + (user_time.getMonth() + 1) + "월 " + user_time.getDate() + "일" + '\n\n';
                }
            }
            replier.reply(output);
        }


        if (msg_arg.length == 3) {

            /* 닉네임 검색 기능. */
            /* !랭킹 검색 <닉네임의 일부> */
            if (msg_arg[1] == "검색") {
                senderData[room].sort_by('score', ascending = false);
                var target = msg.substring((msg_arg[0] + ' ' + msg_arg[1] + ' ').length, msg.length);
                var resultData = [];
                for (let index = 0; index < senderData[room].length; index++)
                    if (senderData[room][index].name.indexOf(target) != -1)
                        resultData.push(senderData[room][index]);

                resultData.sort_by('score', ascending = false);
                var output = '\u200b'.repeat(500) + '\n\n';
                for (var i = 0; i < resultData.length; i++) {
                    user_time = new Date(resultData[i].time);
                    output += 'Name: ' + resultData[i].name + '\n';
                    output += 'Rank: ' + (senderData[room].findObjectIndex('name', resultData[i].name) + 1) + "등" + '\n';
                    output += 'Score: ' + resultData[i].score + '\n';
                    if (i == resultData.length - 1) {
                        output += 'Time: ' + user_time.getFullYear() + "년 " + (user_time.getMonth() + 1) + "월 " + user_time.getDate() + "일";
                    } else {
                        output += 'Time: ' + user_time.getFullYear() + "년 " + (user_time.getMonth() + 1) + "월 " + user_time.getDate() + "일" + '\n\n';
                    }
                }
                replier.reply(output);
            }
        }
    }
    FileStream.write("sdcard/Kakao_senderData/senderData.json", JSON.stringify(senderData, null, '\t'));
}
