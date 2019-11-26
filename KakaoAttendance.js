var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

function save(folderName, fileName, str) {
    var c = new java.io.File(sdcard + "/" + folderName + "/" + fileName);
    var d = new java.io.FileOutputStream(c);
    var e = new java.lang.String(str);
    d.write(e.getBytes());
    d.close();
}

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

var folder = new java.io.File(sdcard + "/RoomAttendance/");
folder.mkdirs();

var Attendance = load(folder, "Attendance.json"); // 출석부 객체
if (Attendance == null) {
    Attendance = {};
} else {
    Attendance = JSON.parse(Attendance);
}

function date() {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var d = d.getDate();
    var str = y.toString() + '.' + m.toString() + '.' + d.toString();
    return str;
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    try {
        if (isGroupChat) {
            if (!(room in Attendance)) {
                Attendance[room] = {}; /* 출석부에 없는 채팅방이면 빈 객체를 생성 */
            }
            if (Attendance[room][sender] != date()) {
                Attendance[room][sender] = date();
                save(folder, "Attendance.json", JSON.stringify(Attendance, null, '\t'));
            }
            if (msg == ":attendance") {
                var str = '';
                var today = date();
                for (var i in Attendance[room]) {
                    if (Attendance[room][i] == today) {
                        str = str + i + ': ' + today + '\n';
                    }
                }
                replier.reply(str);
            }
        }
    } catch (e) {
        save(folder, "Attendance.json", JSON.stringify(Attendance, null, '\t'));
        Log.debug(e);
    }
}

function onStartCompile() {
    save(folder, "Attendance.json", JSON.stringify(Attendance, null, '\t'));
}
