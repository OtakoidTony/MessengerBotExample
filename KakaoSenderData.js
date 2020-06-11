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
                output += 'Time: ' + user_time.getFullYear() + "년 " + (user_time.getMonth() + 1) + "월" + user_time.getDate() + "일";
                if (i == senderData[room].length - 1) {
                    output += 'Score: ' + senderData[room][i].score;
                } else {
                    output += 'Score: ' + senderData[room][i].score + '\n\n';
                }
            }
            replier.reply(output);
        }


        if (msg_arg.length == 3) {

            // 닉네임 검색 기능.
            // !랭킹 검색 <닉네임의 일부>
            if (msg_arg[1] == "검색") {
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
                    output += 'Rank: ' + (i + 1) + "등" + '\n';
                    output += 'Time: ' + user_time.getFullYear() + "년 " + (user_time.getMonth() + 1) + "월" + user_time.getDate() + "일";
                    if (i == resultData.length - 1) {
                        output += 'Score: ' + resultData[i].score;
                    } else {
                        output += 'Score: ' + resultData[i].score + '\n\n';
                    }
                }
                replier.reply(output);
            }
        }
    }
    FileStream.write("sdcard/Kakao_senderData/senderData.json", JSON.stringify(senderData, null, '\t'));
}
