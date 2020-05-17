var Attendance = FileStream.read("sdcard/RoomAttendance/Attendance.json"); // 출석부 객체
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
                FileStream.write("sdcard/RoomAttendance/Attendance.json", JSON.stringify(Attendance, null, '\t'));
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
        FileStream.write("sdcard/RoomAttendance/Attendance.json", JSON.stringify(Attendance, null, '\t'));
        Log.debug(e);
    }
}
