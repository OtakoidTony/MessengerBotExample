var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath(); //변수 생성
// Output: Null
function save(folderName, fileName, str) { //파일 생성 및 쓰기 함수 제작
    var c = new java.io.File(sdcard + "/" + folderName + "/" + fileName);
    var d = new java.io.FileOutputStream(c);
    var e = new java.lang.String(str);
    d.write(e.getBytes());
    d.close();
}
// Output: str
function read(folderName, fileName) { //파일 읽기 함수 제작
    var b = new java.io.File(sdcard + "/" + folderName + "/" + fileName);
    if (!(b.exists())) return null; //만약 읽을 파일이 없다면 null 변환
    var c = new java.io.FileInputStream(b);
    var d = new java.io.InputStreamReader(c);
    var e = new java.io.BufferedReader(d);
    var f = e.readLine();
    var g = "";
    while ((g = e.readLine()) != null) {
        f += "\n" + g; //\ = 역슬래쉬 → 줄바꿈 표시
    }
    c.close();
    d.close();
    e.close();
    return f.toString(); //읽은 파일 내용을 반환
}

const game_data_folder = "Game Data";

function randomItem(a) {
    return a[java.lang.Math.floor(java.lang.Math.random() * a.length)];
}
var folder = new java.io.File(sdcard + "/"+game_data_folder+"/");
folder.mkdirs(); //풀더를 sdcard에 생성
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var WhiteList = new Array("사용할 단톡방");
    if (WhiteList.indexOf(room) != -1 || isGroupChat == false) {
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
