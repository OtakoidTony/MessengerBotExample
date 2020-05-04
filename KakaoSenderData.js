var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

/**
 * 문자열을 파일로 만들어 SD카드에 저장하는 함수
 * @param {string}folderName 저장할 위치
 * @param {string}fileName 저장할 파일의 이름
 * @param {string}str 저장할 문자열 
 */
function save(folderName, fileName, str) {
    var c = new java.io.File(sdcard + "/" + folderName + "/" + fileName);
    var d = new java.io.FileOutputStream(c);
    var e = new java.lang.String(str);
    d.write(e.getBytes());
    d.close();
}

/**
 * SD카드에 있는 특정 파일을 읽어 문자열로 내보내는 함수
 * @param {string}folderName 파일이 있는 경로명
 * @param {string}fileName 파일명
 */
function read(folderName, fileName) {
    var b = new java.io.File(sdcard + "/" + folderName + "/" + fileName);
    if (!(b.exists())) return null;
    var c = new java.io.FileInputStream(b);
    var d = new java.io.InputStreamReader(c);
    var e = new java.io.BufferedReader(d);
    var f = e.readLine();
    var g = "";
    while ((g = e.readLine()) != null) {
        f += "\n" + g;
    }
    c.close();
    d.close();
    e.close();
    return f.toString();
}

var folder = new java.io.File(sdcard + "/Kakao_senderData/");
folder.mkdirs();

var senderData = read(folder, "senderData.json");
if (senderData == null) {
    senderData = {};
} else {
    senderData = JSON.parse(senderData);
}


Array.prototype.sort_by = function (name, ascending = true) {
    if (ascending) {
        return this.sort(function (a, b) {
            if (a[name] > b[name]) {
                return 1;
            }
            if (a[name] < b[name]) {
                return -1;
            }
            return 0;
        })
    } else {
        return this.sort(function (a, b) {
            if (a[name] > b[name]) {
                return -1;
            }
            if (a[name] < b[name]) {
                return 1;
            }
            return 0;
        })
    }
}

Array.prototype.findObjectIndex = function (label, value) {
    for (var i = 0; i < this.length; i++)
        if (this[i][label] == value) return i;
    return -1;
}
Array.prototype.findObject = function (label, value) {
    if (this.findObjectIndex(label, value) != -1) return this[this.findObjectIndex(label, value)];
    else return null;
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (!room in senderData) senderData[room] = [];
    if (senderData[room].findObjectIndex('name', sender) == -1) {
        senderData[room].push({
            'name': sender,
            'score': 1
        })
    } else {
        senderData[room].findObject('name', sender)['score'] += 1;
    }
    if (msg == "call rojiku display ranking system") {
        replier.reply(JSON.stringify(senderData[room].sort_by('score', ascending = false), null, '\t'));
    }
    save(folder, "senderData.json", JSON.stringify(senderData, null, '\t'));
}
