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

var folder = new java.io.File(sdcard + "/RoomPoint/");
folder.mkdirs();

var Point = load(folder, "Point.json"); // 출석부 객체
if (Point == null) {
    Point = {};
} else {
    Point = JSON.parse(Point);
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    try {
        if (isGroupChat) {
            if (!(room in Point)) {
                Attendance[room] = {}; /* Point에 없는 채팅방이면 빈 객체를 생성 */
            }
            
        }
    } catch (e) {
        save(folder, "Point.json", JSON.stringify(Attendance, null, '\t'));
        Log.debug(e);
    }
}

function onStartCompile() {
    save(folder, "Point.json", JSON.stringify(Attendance, null, '\t'));
}
