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
        }
    }
    this.json = JSON.stringify(data);
        
    }
}
var DataBase = {};

function start(user) {
    var data = read(game_data_folder, sender + ".json");
    if (data !== null) {
        data = JSON.parse(data);
        DataBase[data.name] = data;
        return 1;
    } else {
        return 2;
    }
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var WhiteList = new Array("사용할 단톡방");
    if (WhiteList.indexOf(room) != -1 || isGroupChat == false) {
        if (msg == ":login"){
            var login_code=start(sender);
            if (login_code==1){
                replier.reply("ADD USER DT");
                replier.reply("...OK");
                var user = new UserData();
                save(game_data_folder, sender + ".json", user.json);
                replier.reply("Login Successed.");
            } else {
                replier.reply(sender + " : NOT FOUND 404");
                replier.reply("CREATE USER DATA");
                replier.reply("...OK");
                replier.reply("Please re-login.");
            }
        }


        if (msg == "join!") {
            save(game_data_folder, sender + ".txt", "1000000");
            replier.reply(sender + "님이 갬블에 참가하셨습니다.");
        }
        if (msg == "wallet!") {
            var point = read(game_data_folder, sender + ".txt");
            if (point !== null) {
                replier.reply(sender + "님의 보유액: " + point);
            } else {
                replier.reply(sender + "님께서는 아직 갬블에 참가하시지 않으셨습니다.\n참가하시려면, join! 을 입력해주시기 바랍니다.")
            }
        }
        if (msg.substring(0, 5) == "slot!") {
            var point = read(game_data_folder, sender + ".txt");
            if (point != null) {
                point = parseInt(point);

                var oldPoint = point;
                point = point * (0.5 + score);
                replier.reply(sender + "님의 이전 보유액: " + oldPoint.toString() + "\n현재 보유액: " + point)
                save("GambleBotDB", sender + ".txt", point.toString());
            }
        }
    }
}
