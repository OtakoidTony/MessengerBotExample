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

const game_data_folder = "Game_Data";

function randomItem(a) {
    return a[java.lang.Math.floor(java.lang.Math.random() * a.length)];
}

var folder = new java.io.File(sdcard + "/" + game_data_folder + "/");
folder.mkdirs(); //풀더를 sdcard에 생성



function UserData(Data) {
    this.data = {};
    this.json = '';
    this.init = function(Data, user) {
        if (Data != null) {
            this.data["name"] = Data.name;
            this.data["money"] = Data.money;
            this.data["hp"] = Data.hp;
            this.data["item"] = Data.item;
            this.data["level"] = Data.level;
        } else {
            this.data["name"] = user;
            this.data["money"] = 50000;
            this.data["hp"] = 300;
            this.data["item"] = [];
            this.data["level"] = 1;
            this.json = JSON.stringify(this.data, null, '\t');
        }
    }
    this.save = function(sender){
        save(game_data_folder, sender + ".json", this.json);
    }
}


function Game(){
    this.load = function(sender){
        var data = read(game_data_folder, sender + ".json");
        data = JSON.parse(data);
        var user = new UserData(data);
        user.init(data, sender);
        return user;
    }
    this.save = function(sender, obj){
        save(game_data_folder, sender + ".json", obj.json);
    }
}

function load_data(sender) {
    var data = read(game_data_folder, sender + ".json");
    data = JSON.parse(data);
    var user = new UserData(data);
    user.init(data, sender);
    return user;
}

function command(cmd){
    var cmd_str = cmd.split(' ')[0];
    var param = cmd.substring(cmd_str.length+1, cmd.length);
    return [cmd_str,param];
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var WhiteList = new Array("사용할 단톡방");
    if (WhiteList.indexOf(room) != -1 || isGroupChat == false) {
        if (command(msg)[0] == ":start"){
            var sender_data = new UserData();
            sender_data.init(null, command(msg)[1]);
            sender_data.save(sender);
            replier.reply("게임데이터가 생성되었습니다.");
            replier.reply("["+sender_data.data.name+"] 어... 여기는... 어디지?");
            replier.reply("["+sender_data.data.name+"] 여기 누구 없어요???");
            replier.reply("주위를 둘러보았지만, 아무도 없었다.");
            replier.reply("어흐흐흐흫ㅎ흫흙 ㅠㅠ");
            replier.reply("[SYS] "+sender_data.data.name+"는 지금 밀폐된 공간에 갇혀있습니다. 어서 탈출하세요!");
            replier.reply("[SYS] :items 을 입력하면 소지품을 확인 할 수 있습니다.");
            replier.reply("[SYS] 또한 :search 를 입력하면 일정확률로 아이템을 얻을 수 있습니다.");
        }
        if (msg == ":items"){
            var sender_data = load_data(sender);
            replier.reply(sender_data.item);
        }
    }
}
