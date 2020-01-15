
const spade = { 1: '🂡', 2: '🂢', 3: '🂣', 4: '🂤', 5: '🂥', 6: '🂦', 7: '🂧', 8: '🂨', 9: '🂩', 10: '🂪', 11: '🂫', 12: '🂭', 13: '🂮' };
var gamble_data = {};
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
var folder = new java.io.File(sdcard + "/" + game_data_folder + "/");
folder.mkdirs();

var database = JSON.parse(read(game_data_folder, database + ".json"));
if (database == null) {
    database = {};
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    rev = msg.split('$');
    if (rev[0] == "poker") {
        
        if (rev[1] == "join") {
            database[sender] = 100000;
            save(game_data_folder, "database.json", JSON.stringify(database, null, '\t'));
        }
        if (rev[1] == "wallet") {
            if (sender in Object.keys(database)) {
                replier.reply(sender + "님의 현재 소지금은\n" + database[sender] + "BT 입니다.");
            } else {
                replier.reply("Database에 등록되지 않은 사용자입니다.\n가입하시려면 poker.join을 입력해주시기 바랍니다.");
            }
        }
        if (rev[1] == "init") {
            if (sender in Object.keys(database)) {
                var USER = Math.floor(Math.random() * 13) + 1;
                var CPU = Math.floor(Math.random() * 13) + 1;
                while (CPU == USER) {
                    CPU = Math.floor(Math.random() * 13) + 1;
                }
                gamble_data[sender] = { 'USER': USER, 'CPU': CPU };
                replier.reply("CPU의 카드는 " + spade[CPU] + "입니다.");
            } else {
                replier.reply("Database에 등록되지 않은 사용자입니다.");
            }
        }
        if (rev[1] == "bet") {
            if (rev.length == 3) {
                if (sender in Object.keys(gamble_data)) {
                    user_bet = parseFloat(rev[2]);
                    if (user_bet < 0) {
                        replier.reply("빚을 내걸면 안되죠, 손님.");
                    } else {
                        if (user_bet <= database[sender]) {
                            cpu_bet = user_bet * Math.random()
                            if (gamble_data[sender][CPU] < gamble_data[sender][USER]) {
                                replier.reply("인디안 게임에서 승리하셨습니다.\n플레이어님께서는 " + cpu_bet + "BT를 얻게 됩니다.");
                                database[sender] += cpu_bet;
                            } else {
                                replier.reply("인디안 게임에서 패배하셨습니다.\n플레이어님께서는 " + user_bet + "BT를 잃게 됩니다.");
                                database[sender] -= user_bet;
                            }
                            save(game_data_folder, "database.json", JSON.stringify(database, null, '\t'));
                            delete gamble_data[sender];
                        } else {
                            replier.reply("손님께서 걸 수 있을 만한 금액이 아닙니다.");
                        }
                    }
                }
            } else {
                replier.reply("베팅하실 금액을 입력해주십시오.")
            }
        }
    }
}