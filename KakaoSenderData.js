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
            'time': new Date.now()
        });
    } else {
        senderData[room].findObject('name', sender)['score'] += 1;
    }
    var msg_arg = msg.split(' ');

    // 당일 출석한 회원 목록 표시
    if (msg_arg[0] == "!출석부") {
        senderData[room].sort_by('score', ascending = false);
        var output = '\u200b'.repeat(500) + '\n\n';
        var today = new Date();
        for (var i = 0; i < senderData[room].length; i++) {
            user_time = senderData[i].time;
            if (user_time.getFullYear() == today.getFullYear() && user_time.getMonth() == today.getMonth() && user_time.getDay == today.getDay()) {
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
                user_time = senderData[i].time;
                output += 'Name: ' + senderData[room][i].name + '\n';
                output += 'Rank: ' + (i + 1) + "등" + '\n';
                output += 'Time: ' + user_time.getFullYear() + "년 " + user_time.getMonth() + "월" + user_time.getDay() + "일";
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
                    user_time = resultData[i].time;
                    output += 'Name: ' + resultData[i].name + '\n';
                    output += 'Rank: ' + (i + 1) + "등" + '\n';
                    output += 'Time: ' + user_time.getFullYear() + "년 " + user_time.getMonth() + "월" + user_time.getDay() + "일";
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

    if (msg_arg[0] == "call" || msg_arg[0] == "Call") {
        if (msg_arg[1] == "rojiku") {
            if (msg_arg[2] == "inspect") {
                if (msg_arg[3] == "battery") {
                    var res = "Current remaining battery level:\n" + Device.getBatteryLevel() + "%\n\n";
                    res += "Current battery temperature:\n" + Device.getBatteryTemperature() / 10 + "°C\n\n";
                    res += "Current battery Voltage:\n" + Device.getBatteryVoltage() + "mV";
                    replier.reply(res);
                }
                if (msg_arg[3] == "ranking") {
                    if (msg_arg[4] == "system") {
                        if (msg_arg[5] == "select") {
                            var user_name = msg.substring((msg_arg[0] + ' ' + msg_arg[1] + ' ' + msg_arg[2] + ' ' + msg_arg[3] + ' ' + msg_arg[4] + ' ' + msg_arg[5] + ' ').length, msg.length);
                            senderData[room].sort_by('score', ascending = false);
                            var user_index = senderData[room].findObjectIndex('name', user_name);
                            if (user_index == -1) {
                                replier.reply("SYSTEM ALERT:\nIndex Out Of Bounds Exception")
                            } else {
                                var user_time = senderData[room][user_index].time;
                                var output = ''
                                output += 'Name: ' + senderData[room][user_index].name + '\n';
                                output += 'Rank: ' + (user_index + 1) + '\n';
                                output += 'Time: ' + user_time.getFullYear() + "년 " + user_time.getMonth() + "월" + user_time.getDay() + "일";
                                output += 'Score: ' + senderData[room][user_index].score;
                                replier.reply(output);
                            }
                        }
                        if (msg_arg[5] == "search") {
                            var target = msg.substring((msg_arg[0] + ' ' + msg_arg[1] + ' ' + msg_arg[2] + ' ' + msg_arg[3] + ' ' + msg_arg[4] + ' ' + msg_arg[5] + ' ').length, msg.length);
                            var resultData = [];
                            for (let index = 0; index < senderData[room].length; index++)
                                if (senderData[room][index].name.indexOf(target) != -1)
                                    resultData.push(senderData[room][index]);

                            resultData.sort_by('score', ascending = false);
                            var output = '\u200b'.repeat(500) + '\n\n';
                            for (var i = 0; i < resultData.length; i++) {
                                output += 'Name: ' + resultData[i].name + '\n';
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
            }
            if (msg_arg[2] == "vibrate") {
                if (msg_arg.length == 3) {
                    vb.vibrate(1000);
                } else {
                    if (msg_arg.length == 4) {
                        if (!isNaN(msg_arg[3])) {
                            if (msg_arg[3] > 5) {
                                replier.reply("SYSTEM ALERT:\nIllegal Argument Exception");
                            } else {
                                vb.vibrate(1000 * msg_arg[3]);
                            }
                        } else {
                            replier.reply("SYSTEM ALERT:\nIllegal Argument Exception");
                        }
                    }
                }
            }
            if (msg_arg[2] == "display") {

                if (msg_arg[3] == "ranking" && msg_arg[4] == "system") {
                    if (msg_arg.length == 5) {
                        senderData[room].sort_by('score', ascending = false);
                        var output = '\u200b'.repeat(500) + '\n\n';
                        for (var i = 0; i < senderData[room].length; i++) {
                            output += 'Name: ' + senderData[room][i].name + '\n';
                            if (i == senderData[room].length - 1) {
                                output += 'Score: ' + senderData[room][i].score;
                            } else {
                                output += 'Score: ' + senderData[room][i].score + '\n\n';
                            }
                        }
                        replier.reply(output);
                    } else {
                        if (msg_arg[5] == "head" && msg_arg.length == 7) {
                            if (!isNaN(msg_arg[6])) {
                                senderData[room].sort_by('score', ascending = false);
                                var head = senderData[room].slice(0, parseInt(msg_arg[6]));
                                var output = '';
                                for (var i = 0; i < head.length; i++) {
                                    output += 'Name: ' + head[i].name + '\n';
                                    if (i == head.length - 1) {
                                        output += 'Score: ' + head[i].score;
                                    } else {
                                        output += 'Score: ' + head[i].score + '\n\n';
                                    }
                                }
                                replier.reply(output);
                            } else {
                                replier.reply("SYSTEM ALERT:\nIllegal Argument Exception");
                            }
                        }
                    }
                }

                if ((msg_arg[3] == "author" || msg_arg[3] == "developer") && msg_arg.length == 4) {
                    replier.reply("This Bot is developed by Rojiku.");
                }

            }
        }
    }
    FileStream.write("sdcard/Kakao_senderData/senderData.json", JSON.stringify(senderData, null, '\t'));
}
