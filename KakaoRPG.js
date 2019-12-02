var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

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

/* 게임 아이템 목록 */
const GameItem = [
    {
        '진통제': "아플 때 먹으면 괜찮아 진다.",
        '밧줄': "무언가를 묶을 때 사용할 수 있다.",
        '손전등': "배터리가 있으면 어두운 곳을 볼 수 있다."
    },
    {
        '진통제': "아플 때 먹으면 괜찮아 진다.",
        '배터리': "전자기기를 사용할 수 있다.",
        '유리조각': "날카로워서 잘못 만지면 다칠 수 있다.",
        '가위': "문방구에서 살 수 있는 흔한 가위다."
    },
    {
        '진통제': "아플 때 먹으면 괜찮아 진다.",
        '톱': "실과시간에 쓰던거랑 비슷하게 생긴 톱이다.",
        '열쇠뭉치': "엄청나게 많은 열쇠가 있다.",
        '신분증': "모르는 사람의 신분증이다."
    }
]


var folder = new java.io.File(sdcard + "/" + game_data_folder + "/");
folder.mkdirs(); /* 풀더를 sdcard에 생성 */


/* UserData.data 초기값 관련 */
var first_money = 5000;
var first_hp = 300;

/* UserData Object */
function UserData(Data) {
    /*
    >> Name     | UserData
    >> Param    | Data : Object or Null
    */
    this.data = {};
    this.init = function(user) {
        if (Data != null) {
            /* Parameters가 Null이 아닌 경우에 UserData.data으로 할당. */
            this.data = Data;
        } else {
            /* Parameters가 Null인 경우에 UserData.data를 초기값으로 할당. */
            this.data["name"]   = user;
            this.data["money"]  = first_money;
            this.data["hp"]     = first_hp;
            this.data["item"]   = {};
            this.data["level"]  = 1;
            this.data["room"]   = "회색 벽으로 이루어져 있는 외딴 방";
            this.data["status"] = {};
            
            /* UserData.data.status */
            this.data.status["see_child_corpse"] = false;
            this.data.status["friends"] = {};
            this.data.status["no_friends"] = false;
            this.data.status["can_move"] = false;
        }
    }
    this.save = function(sender) {
        save(game_data_folder, sender + ".json", JSON.stringify(this.data, null, '\t'));
    }
}

function load_data(sender) {
    var data = read(game_data_folder, sender + ".json");
    data = JSON.parse(data);
    return data;
}

function command(cmd) {
    var cmd_str = cmd.split(' ')[0];
    var param = cmd.substring(cmd_str.length + 1, cmd.length);
    return [cmd_str, param];
}

var commands_help = "[Command]\n\
:start <Nickname>\n\
Nickname이라는 이름으로 게임을 시작합니다.\n\
:view\n\
현재 아이의 상태를 확인합니다.\n\
:items\n\
소지하고 있는 아이템의 목록을 확인합니다.\n\
:search\n\
근처에 떨어져 있는 물건이 있는지 찾아봅니다.\n\
:map\n\
지도를 소지하고 있는 경우 현재 방 위치를 확인합니다.\n\
:room <Room>\n\
Room이라는 방으로 이동합니다.\n\
\
";

/*
황인 여자아이
┏━━━━━┓
┃　　　　　┃
┃　　👧　   ┃
┃　　　　　┃
┗━━━━━┛
백인 여자아이
┏━━━━━┓
┃　　　　　┃
┃　　👧🏻　   ┃
┃　　　　　┃
┗━━━━━┛

┗┓╋┗┛┣┓　┏
*/

function probablity(x, minimum, maximum){
    if (x>minimum && x<maximum){
        return true;
    } else {
        return false;
    }
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var WhiteList = new Array("사용할 단톡방");
    if (WhiteList.indexOf(room) != -1 || isGroupChat == false) {

        if (command(msg)[0] == ":start") {

            /* <--------[게임 데이터 생성 시작]--------> */
            var sender_data = new UserData();
            sender_data.init(command(msg)[1]);
            sender_data.save(sender);
            /* <--------[게임 데이터 생성 완료]--------> */

            replier.reply("게임데이터가 생성되었습니다.");
            var sender_meessage_name = "[" + sender_data.data.name + "] ";

            /* <--------[게임 여는 스토리 실행]--------> */
            replier.reply(sender_meessage_name + "어... 여기는... 어디지?");
            replier.reply(sender_meessage_name + "여기 누구 없어요???");
            replier.reply("주위를 둘러보았지만, 아무도 없었다.");
            replier.reply(sender_meessage_name + "어흐흐흐흫ㅎ흫흟 ㅠㅠ");
            replier.reply("[SYS] " + sender_data.data.name + "는 지금 밀폐된 공간에 갇혀있습니다. 어서 탈출하십시오!");
            replier.reply("[SYS] :help를 입력하면 명령어 목록을 확인할 수 있습니다.");
            /* <--------[게임 여는 스토리 종료]--------> */
        }
        if (msg == ":help") {
            replier.reply(commands_help);
        }
        if (msg == ":items") {
            replier.reply(load_data(sender).name);
            var sender_data = new UserData(load_data(sender));
            sender_data.init(sender);
            replier.reply(sender_data.data.item);
        }

        /* 아이템 탐색 */
        if (msg == ":search") {
            /* 플레이어 데이터 로드 */
            var sender_data = new UserData(load_data(sender));
            sender_data.init(sender);

            /* 이벤트 진입 */
            var sender_message_name = "[" + sender_data.data.name + "] ";
            replier.reply(sender_meessage_name + "이건 뭘까...?");

            var probability = Math.random() * 100;


            /* 확률 = 60 - ( level * 10 ) */
            if ( probability >= (40 + ( sender_data.data.level * 10 ) ) ) {

                /*
                >> Date     | 2019.11.27. PM 6:48
                >> Note     | Level에 따른 분기별 조건문을 통합.
                >> Modified | GameItem : Object -> Array
                */
                var get_item = randomItem(Object.keys(GameItem[sender_data.data.level - 1]));
                replier.reply(get_item + "이 떨어져있다.");
                if (get_item in sender_data.data.item){
                    replier.reply("이미 있는 물건이다.");
                    sender_data.data.item[get_item] = sender_data.data.item[get_item] + 1;
                } else {
                    /* 발견한 아이템이 처음 발견한 아이템일 때 이벤트 */
                    sender_data.data.item[get_item] = 1;


                    if (sender_data.data.level == 1 && sender_data.data.item.length == GameItem[sender_data.data.level - 1].length) {
                        replier.reply("터벅. 터벅. 터벅. 터벅.");
                        replier.reply(sender_meessage_name + "누... 누구지...?");
                        replier.reply("끼이익...");
                        replier.reply("덜컹.");
                        replier.reply(sender_meessage_name + "누가 문을...");


                        replier.reply("[SYS] 방을 이동할 수 있게 되었습니다.");
                        replier.reply("[SYS] 명령어: :room <Room>");
                        sender_data.data.status.can_move = true;
                        /*
                         * 분기는 friends.length=0이고 level=1일 때,
                         * 방을 이동하면 여아 시체 분기로 할당.
                         */
                    }
                    
                }

                /* json 파일로 저장 */
                sender_data.save(sender);
            } else {
                if ( probability <= 10 ) {
                    /* HP 감소 분기 */
                    if ((!sender_data.data.status.see_child_corpse) && (sender_data.data.status.friends.length==0)) {
                        /*
                        >> Date | 2019.11.30. PM 10:03
                        >> Note | 여아 시체 분기 추가.
                                  여아 시체를 보게 되면 게임 진행에서 동료를
                                  구할 수 없음. 플레이어의 HP 변화량은 -10.
                        >> TODO | 튜토리얼 완료 후 분기를 나눠서 방을 이동한
                                  경우에만 이 분기가 발현될 수 있도록 조정.
                        */
                        replier.reply("누군가가 있는 것 같다.");
                        replier.reply(sender_message_name + "누... 누구세요...?");
                        replier.reply("조심스럽게 다가간다.");
                        replier.reply(sender_message_name + "...!");
                        replier.reply(sender_message_name + "싫어어어어어어!!!!!!");
                    
                        replier.reply(sender_message_name + "(내 또래인 것 같이 보이는 여자아이가 나체로 칼에 난도질되어 있다.)");
                        replier.reply("[SYS] "+sender_message_name+"의 체력이 10 감소하였습니다.");
                        if(sender_data.data.hp==first_hp){
                            replier.reply("[SYS] 만약에 HP가 0이하로 떨어지면 게임오버하게 됩니다.");
                        }
                        sender_data.data.see_child_corpse = true;
                        sender_data.data.hp = sender_data.data.hp - 10;
                    }
                    
                    /* json 파일로 저장 */
                    sender_data.save(sender);
                } else {
                    replier.reply("아무것도 없다.");
                    replier.reply(sender_message_name+"내가 잘못봤나보다...");
                }
            }
        }
    }
}
