var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
var game_map = "\
┏━━━━┓\n\
┃１　　　┃　┏━━━━┓\n\
┃　　　　┃　┃２　　　┃\n\
┗━━┓┏┛　┃　　　　┃\n\
　　　┃┗━━┛　　　　┃\n\
　　　┃┏━━┓　　　　┃\n\
　　　┃┃　　┗━━━━┛\n\
　　┏┛┗━━━━┓\n\
　　┃３　　　　　┃\n\
　　┃　　　　　　┃\n\
　　┃　　　　　▤┃\n\
　　┗━━━━━━┛";
var game_map_1 = "\
┏━━━━┓\n\
┃１👧　   ┃　┏━━━━┓\n\
┃　　　　┃　┃２　　　┃\n\
┗━━┓┏┛　┃　　　　┃\n\
　　　┃┗━━┛　　　　┃\n\
　　　┃┏━━┓　　　　┃\n\
　　　┃┃　　┗━━━━┛\n\
　　┏┛┗━━━━┓\n\
　　┃３　　　　　┃\n\
　　┃　　　　　　┃\n\
　　┃　　　　　▤┃\n\
　　┗━━━━━━┛";
var game_map_2 = "\
┏━━━━┓\n\
┃１　　　┃　┏━━━━┓\n\
┃　　　　┃　┃２👧 　  ┃\n\
┗━━┓┏┛　┃　　　　┃\n\
　　　┃┗━━┛　　　　┃\n\
　　　┃┏━━┓　　　　┃\n\
　　　┃┃　　┗━━━━┛\n\
　　┏┛┗━━━━┓\n\
　　┃３　　　　　┃\n\
　　┃　　　　　　┃\n\
　　┃　　　　　▤┃\n\
　　┗━━━━━━┛";
var game_map_3 = "\
┏━━━━┓\n\
┃１　　　┃　┏━━━━┓\n\
┃　　　　┃　┃２　　　┃\n\
┗━━┓┏┛　┃　　　　┃\n\
　　　┃┗━━┛　　　　┃\n\
　　　┃┏━━┓　　　　┃\n\
　　　┃┃　　┗━━━━┛\n\
　　┏┛┗━━━━┓\n\
　　┃３👧　   　　┃\n\
　　┃　　　　　　┃\n\
　　┃　　　　　▤┃\n\
　　┗━━━━━━┛";

function randomItem(a) {
    return a[Math.floor(Math.random() * a.length)];
}

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
/**
 * 게임 아이템 목록
 * */
const GameItem = [{
    '지도': "🗺 이게 있으면 이곳이 어디인지 알 수 있을 것 같다.",
    '진통제': "💊 아플 때 먹으면 괜찮아 진다.",
    '손전등': "🔦 배터리가 있으면 어두운 곳을 볼 수 있다."
},
{
    '진통제': "💊 아플 때 먹으면 괜찮아 진다.",
    '배터리': "🔋 전자기기를 사용할 수 있다.",
    '가위': "✁ 문방구에서 살 수 있는 흔한 가위다."
},
{
    '진통제': "💊 아플 때 먹으면 괜찮아 진다.",
    '열쇠뭉치': "🔑 엄청나게 많은 열쇠가 있다.",
    '신분증': "모르는 사람의 신분증이다.",
    '칼': "🔪 잘못 사용하면 큰일나는 무시무시한 칼이다."
}]
var folder = new java.io.File(sdcard + "/" + game_data_folder + "/");
folder.mkdirs(); /* 풀더를 sdcard에 생성 */
var first_money = 5000;
var first_hp = 300;

function UserData(Data) {
    this.data = {};
    /**
     * Initialize userdata.
     * @param {string} user user is the name in [ :start <name> ]
     */
    this.init = function(user) {
        if (Data != null) {
            /* Parameters가 Null이 아닌 경우에 UserData.data으로 할당. */
            this.data = Data;
        } else {
            /* Parameters가 Null인 경우에 UserData.data를 초기값으로 할당. */
            this.data["name"] = user;
            this.data["money"] = first_money;
            this.data["hp"] = first_hp;
            this.data["item"] = {};
            this.data["level"] = 1;
            this.data["room"] = "1";
            this.data["can_move"] = false;
            this.data["friends"] = {};
            this.data["flags"] = {};
            /* UserData.data.flags */
            this.data.flags["after_rescued_child"] = false;
        }
    }
    /**
     * Save UserData.data object as json file.
     * @param {any} sender
     */
    this.save = function(sender) {
        save(game_data_folder, sender + ".json", JSON.stringify(this.data, null, '\t'));
    }
}
/**
 * Load a json file named [sender] in game_data_folder
 * and then return a UserData.data object.
 * @param {string} sender
 */
function load_data(sender) {
    var data = read(game_data_folder, sender + ".json");
    data = JSON.parse(data);
    return data;
}
/**
 * 
 * @param {string} cmd
 */
function command(cmd) {
    var cmd_str = cmd.split(' ')[0];
    var param = cmd.substring(cmd_str.length + 1, cmd.length);
    return [cmd_str, param];
}

function wait(second) {
    java.lang.Thread.sleep(1000 * second);
}

var Game = {};
Game.Ending = {};
const wait_term = 0.9;

Game.search = function(sender, replier) {
    /* 플레이어 데이터 로드 */
    var sender_data = new UserData(load_data(sender));
    sender_data.init(sender);
    var sender_message_name = "[" + sender_data.data.name + "] ";
    replier.reply(sender_message_name + "이건 뭘까...?");
    wait(wait_term);
    var probability = Math.random() * 100;
    if (temp_child_makers.indexOf(sender) == -1 && sender_data.data.level == 2 && sender_data.data.room == "1" &&
        sender_data.data.can_move && Object.keys(sender_data.data.friends).length == 0) {
        var scripts_child_rescue = [
            "부우우우움. 부우우우움.",
            "어디선가 휴대폰 진동 소리가 들린다.",
            sender_message_name + "어디서 휴대폰 진동이...",
            "진동이 울리는 곳으로 가보았더니 내 또래의 여자아이가 실오라기 하나 걸치지 않으며 겁에 질린 체로 휴대폰을 손에 쥔 체 웅크려 있었다.",
            sender_message_name + "너는 누구야? 왜 옷을 안입고 있어?",
            "[여자아이] ....",
            sender_message_name + "내 옷이라도 입고 있어.",
            "어차피 나는 속에 옷을 여러장 입고 있던터라 겉옷이라도 벗어 입혀주었다.",
            sender_message_name + "(내 냄새는 안나겠지...? >_<)",
            "[여자아이] ....",
            "[SYS] 동료가 추가되었습니다.",
            "[SYS] 동료의 이름을 지어주십시오."
        ];
        for (var i in scripts_child_rescue) {
            replier.reply(scripts_child_rescue[i]);
            wait(wait_term);
        }
        temp_child_makers.push(sender);
    } else {
        /* 확률 = 60 - ( level * 10 ) */
        if (probability >= (40 + (sender_data.data.level * 10))) {
            var get_item = randomItem(Object.keys(GameItem[sender_data.data.level - 1]));
            if ((parseInt(get_item[get_item.length - 1].charCodeAt(0).toString(16), 16) - parseInt("AC00", 16)) % 28 == 0) {
                replier.reply(get_item + "가 떨어져있다.");
            } else {
                replier.reply(get_item + "이 떨어져있다.");
            }
            wait(wait_term);
            if (get_item in sender_data.data.item) {
                replier.reply("이미 있는 거다.");
                sender_data.data.item[get_item] = sender_data.data.item[get_item] + 1;
            } else {
                /* 발견한 아이템이 처음 발견한 아이템일 때 이벤트 */
                sender_data.data.item[get_item] = 1;
                replier.reply(GameItem[sender_data.data.level - 1][get_item]);
            }
            if ((sender_data.data.level == 1) && (Object.keys(sender_data.data.item).length == Object.keys(GameItem[sender_data.data.level - 1]).length)) {
                replier.reply("터벅. 터벅. 터벅. 터벅.");
                wait(wait_term);
                replier.reply(sender_message_name + "누... 누구지...?");
                wait(wait_term);
                replier.reply("끼이익...");
                wait(wait_term);
                replier.reply("덜컹.");
                wait(wait_term);
                replier.reply(sender_message_name + "누가 문을...");
                replier.reply(Game.Sys.Script.Commands.New.room);
                replier.reply(Game.Sys.Script.Commands.New.map);
                sender_data.data.can_move = true;
                sender_data.data.level = 2;
            }
            /* json 파일로 저장 */
            sender_data.save(sender);
        } else {
            replier.reply("아무것도 없다.");
            wait(wait_term);
            replier.reply(sender_message_name + "내가 잘못봤나보다...");
        }
    }
}

function view_status(sender_data) {
    var result = "";
    result = result + "현재 아이의 상태는 다음과 같습니다.\n\n";
    result = result + "소지품: " + Object.keys(sender_data.data.item) + "\n";
    return result;
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var WhiteList = new Array("사용할 단톡방");
    if (WhiteList.indexOf(room) != -1 || isGroupChat == false) {
        if (msg == ":view") {
            /* 플레이어 데이터 로드 */
            var sender_data = new UserData(load_data(sender));
            sender_data.init(sender);
            replier.reply(view_status(sender_data));
        }
        if (temp_child_makers.indexOf(sender) != -1) {
            /* 플레이어 데이터 로드 */
            var sender_data = new UserData(load_data(sender));
            sender_data.init(sender);
            var sender_message_name = "[" + sender_data.data.name + "] ";
            sender_data.data.friends[msg] = {};
            sender_data.data.flags.after_rescued_child = true;
            sender_data.save(sender);
            replier.reply("[SYS] 동료의 이름을 설정하였습니다.");
            temp_child_makers.splice(temp_child_makers.indexOf(sender), 1);
            var friend_message_name = "[" + msg + "] ";
            var scripts_cb3e6f66f9be29a494397b5b153ab6ff = [
                friend_message_name + "도, 도와줘...",
                sender_message_name + "에...?",
                "그 아이는 울먹이며 부들부들 떨고 있었다.",
                "[???] 무슨 일이야?!",
                friend_message_name + "히이이이익!!!!!",
                sender_message_name + "...!",
                "[???] 우히히히히, 귀여운 것들...!",
                friend_message_name + "도망쳐!!!",
                "그 아이는 갑자기 일어서더니 나의 손목을 잡고 달렸다. 표정을 자세히는 보지 못했지만 달리면서도 많이 떠는 것만 같았다.",
                "[???] 어차피 여기서 나갈 수 없다고~?",
                "그 이상한 아저씨를 뒤로한체 나와 " + msg + "는 3번방에 가게 되었다.",
                game_map_3
            ];
            for (var i in scripts_cb3e6f66f9be29a494397b5b153ab6ff) {
                replier.reply(scripts_cb3e6f66f9be29a494397b5b153ab6ff[i]);
                wait(wait_term);
            }
        }
        if (command(msg)[0] == ":start") {
            replier.reply("🔞 경고! 이 게임은 미성년자 혹은 심약자분들께는 다소 유해할 수 있으므로 플레이에 유의해주시기 바랍니다.");
            wait(wait_term);
            var sender_data = new UserData();
            sender_data.init(command(msg)[1]);
            sender_data.save(sender);
            replier.reply("[SYS] 게임데이터가 생성되었습니다.");
            wait(wait_term);
            var sender_message_name = "[" + sender_data.data.name + "] ";
            replier.reply(sender_message_name + "어... 여기는... 어디지?");
            wait(wait_term);
            replier.reply(sender_message_name + "여기 누구 없어요???");
            wait(wait_term);
            replier.reply("주위를 둘러보았지만, 아무도 없었다.");
            wait(wait_term);
            replier.reply(sender_message_name + "어흐흐흐흫ㅎ흫흟 ㅠㅠ");
            wait(wait_term);
            if ((parseInt(sender_data.data.name[sender_data.data.name.length - 1].charCodeAt(0).toString(16), 16) - parseInt("AC00", 16)) % 28 == 0) {
                replier.reply("[SYS] " + sender_data.data.name + "는 지금 밀폐된 공간에 갇혀있습니다. 어서 탈출하십시오!");
                wait(wait_term);
            } else {
                replier.reply("[SYS] " + sender_data.data.name + "은 지금 밀폐된 공간에 갇혀있습니다. 어서 탈출하십시오!");
                wait(wait_term);
            }
            replier.reply("[SYS] :help를 입력하면 명령어 목록을 확인할 수 있습니다.");
        }
        if (msg == ":help") {
            replier.reply(commands_help);
        }
        if (msg == ":items") {
            replier.reply(load_data(sender).name);
            var sender_data = new UserData(load_data(sender));
            sender_data.init(sender);
            replier.reply(Object.keys(sender_data.data.item));
        }
        if (msg == ":map") {
            /* 플레이어 데이터 로드 */
            var sender_data = new UserData(load_data(sender));
            sender_data.init(sender);
            var sender_message_name = "[" + sender_data.data.name + "] ";
            if ('지도' in sender_data.data.item) {
                if (sender_data.data.room == "1") {
                    replier.reply(game_map_1);
                }
                if (sender_data.data.room == "2") {
                    replier.reply(game_map_2);
                }
                if (sender_data.data.room == "3") {
                    replier.reply(game_map_3);
                }
            } else {
                replier.reply(sender_message_name + "지도가 없어...")
            }
        }
        if (command(msg)[0] == ":room") {
            /* 플레이어 데이터 로드 */
            var sender_data = new UserData(load_data(sender));
            sender_data.init(sender);
            var sender_message_name = "[" + sender_data.data.name + "] ";
            if (sender_data.data.can_move) {
                if (sender_data.data.level == 2 && Object.keys(sender_data.data.friends).length == 0) {
                    Game.Ending.no_friends(sender_data, replier, sender);
                } else {
                    if (command(msg)[1] == sender_data.data.room) {
                        replier.reply(sender_message_name + "으아아, 침착하자! 침착! 지금 있는 곳이 " + sender_data.data.room + "번방이야!");
                    } else {
                        if (command(msg)[1] == "1") {
                            sender_data.data.room = "1";
                            replier.reply("1번방에 들어왔다.");
                        }
                        if (command(msg)[1] == "2") {
                            sender_data.data.room = "2";
                            replier.reply("2번방에 들어왔다.");
                        }
                        if (command(msg)[1] == "3") {
                            sender_data.data.room = "3";
                            replier.reply("3번방에 들어왔다.");
                        }
                        sender_data.save(sender);
                    }
                }
            }
        }
        if (msg == ":search") {
            Game.search(sender, replier);
        }
    }
}