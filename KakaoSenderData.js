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

Array.prototype.findObjectIndex = function (label, value) {
    for (var i = 0; i < this.length; i++)
        if (this[i][label] == value) return i;
    return -1;
};

Array.prototype.findObject = function (label, value) {
    if (this.findObjectIndex(label, value) != -1) return this[this.findObjectIndex(label, value)];
    else return null;
};

var senderData = FileStream.read("sdcard/Kakao_senderData/senderData.json");
if (senderData == null) {
    senderData = {};
} else {
    senderData = JSON.parse(senderData);
}

var vb = Api.getContext().getSystemService(android.content.Context.VIBRATOR_SERVICE);

const Mee6LevelSystem = {
    'requireXP': function (lvl) {
        return 5 * (lvl ** 2) + 50 * lvl + 100;
    },
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
        if (!(sender in wipeClient)) {
            wipeClient.push(sender);
        }
        var res = "정말로 초기화하시겠습니까?\n\n";
        res += "[y] Yes, [n] No";
        replier.reply(res);
    }

    if (sender in wipeClient) {
        if (msg == 'y') {
            wipeClient.splice(wipeClient.indexOf(sender), 1);
            if (!(sender in allWipeClient)) {
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

    if (sender in allWipeClient) {
        if (msg == 'a') {
            allWipeClient.splice(allWipeClient.indexOf(sender), 1);
            senderData = {};
            FileStream.write("sdcard/Kakao_senderData/senderData.json", JSON.stringify(senderData, null, '\t'));
            replier.reply("모든 방에 대한 데이터가 말소되었습니다.");
        }
        if (msg == 't') {
            allWipeClient.splice(allWipeClient.indexOf(sender), 1);
            senderData[room] = [];
            FileStream.write("sdcard/Kakao_senderData/senderData.json", JSON.stringify(senderData, null, '\t'));
            replier.reply("이 채팅방에 대한 데이터가 말소되었습니다.");
        }
    }

    if (msg_arg[0] == "!테스트") {
        replier.reply(senderData[room].findObject('name', sender)['time'].toString());
    }

    // 당일 출석한 회원 목록 표시
    if (msg_arg[0] == "!출석부") {
        senderData[room].sort_by('score', ascending = false);
        var output = '\u200b'.repeat(500) + '\n\n';
        var today = new Date();
        for (var i = 0; i < senderData[room].length; i++) {
            user_time = new Date(senderData[room][i].time);
            if (user_time.getFullYear() == today.getFullYear() && user_time.getMonth() == today.getMonth() && user_time.getDate() == today.getDate()) {
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

        // 모든 회원에 대한 랭킹 표시
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

            // 닉네임 검색 기능.
            // !랭킹 검색 <닉네임의 일부>
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
