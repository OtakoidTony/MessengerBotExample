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

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (!(room in senderData)) {
        senderData[room] = [];
        replier.reply('rojiku created senderData[room] data');
    }
    if (senderData[room].findObjectIndex('name', sender) == -1) {
        senderData[room].push({
            'name': sender,
            'score': 1
        });
    } else {
        senderData[room].findObject('name', sender)['score'] += 1;
    }
    if (msg == "call rojiku display ranking system") {
        senderData[room].sort_by('score', ascending = false)
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

    }
    FileStream.write("sdcard/Kakao_senderData/senderData.json", JSON.stringify(senderData, null, '\t'));
}
