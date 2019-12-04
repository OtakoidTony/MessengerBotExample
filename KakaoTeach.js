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

var folder = new java.io.File(sdcard + "/Teach/");
folder.mkdirs();

function command(cmd) {
    var cmd_str = cmd.split(' ')[0];
    var param = cmd.substring(cmd_str.length + 1, cmd.length);
    return [cmd_str, param];
}

var learned_data = {};
var learned_data_json = read("Teach", "learned_data.json");
if (learned_data_json == null) {
    learned_data = {};
} else {
    learned_data = JSON.parse(learned_data_json);
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (command(msg)[0] == "@조교하기") {
        var teach_left = command(msg)[1].split("|")[0];
        var teach_right = command(msg)[1].split("|")[1];
        learned_data[teach_left] = {};
        learned_data[teach_left]["trainer"] = sender;
        learned_data[teach_left]["returns"] = teach_right;

        save("Teach", "learned_data.json", JSON.stringify(learned_data, null, '\t'));
        replier.reply("새로운 말을 배웠습니다.");
    }
    if (msg in learned_data) {
        replier.reply(learned_data[msg]["returns"]);
    }
    if (msg == "@배운말") {
        replier.reply(Object.keys(learned_data));
    }
}

