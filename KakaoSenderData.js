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
            'score': 1
        });
    } else {
        senderData[room].findObject('name', sender)['score'] += 1;
    }
    var msg_arg = msg.split(' ');
    if (msg_arg[0] == "call" || msg_arg[0] == "Call") {
        if (msg_arg[1] == "rojiku") {
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
                        var output = '';
                        for (var i = 0; i < senderData[room].length; i++) {
                            output += 'Name: ' + senderData[room][i].name + '\n';
                            if (i == senderData[room].length - 1) {
                                output += 'Time: ' + senderData[room][i].score;
                            } else {
                                output += 'Time: ' + senderData[room][i].score + '\n\n';
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
                                        output += 'Time: ' + head[i].score;
                                    } else {
                                        output += 'Time: ' + head[i].score + '\n\n';
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
