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

var Point = load(folder, "Point.json");
if (Point == null) {
    Point = {};
} else {
    Point = JSON.parse(Point);
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    try {
        if (isGroupChat) {
            if (!(room in Point)) {
                Point[room] = {};
            }
            if (sender in Point[room]){
                Point[room][sender]=Point[room][sender]+1;
            }else{
                Point[room][sender]=1;
            }
            save(folder, "Point.json", JSON.stringify(Point, null, '\t'));
        }
    } catch (e) {
        save(folder, "Point.json", JSON.stringify(Point, null, '\t'));
        Log.debug(e);
    }
}
