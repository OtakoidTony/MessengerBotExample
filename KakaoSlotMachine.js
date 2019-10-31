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

function randomItem(a) {
    return a[java.lang.Math.floor(java.lang.Math.random() * a.length)];
}

var folder = new java.io.File(sdcard + "/GambleBotDB/");
folder.mkdirs(); //풀더를 sdcard에 생성

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg == "join!") {
        save("GambleBotDB", sender + ".txt", "1000000");
        replier.reply(sender + "님이 갬블에 참가하셨습니다.");
    }
    if (msg == "wallet!") {
        var point = read("GambleBotDB", sender + ".txt");
        if (point !== null) {
            replier.reply(sender + "님의 보유액: " + point);
        } else {
            replier.reply(sender + "님께서는 아직 갬블에 참가하시지 않으셨습니다.\n참가하시려면, join! 을 입력해주시기 바랍니다.")
        }
    }
    if (msg.substring(0, 5) == "slot!") {
        var point = parseInt(read("GambleBotDB", sender + ".txt"));
        if (point !== null) {
            var SlotIconLeft = new Array("7️⃣", "🍇", "🍒", "🍈", "🍑");
            var SlotIconMiddle = new Array("7️⃣", "🍇", "🍒", "🍈", "🍑");
            var SlotIconRight = new Array("7️⃣", "🍇", "🍒", "🍈", "🍑");
            var playerSlot = new Array();
            var left = "";
            var middle = "";
            var right = "";
            var i = 1;
            while (i < 4) {
                left = randomItem(SlotIconLeft)
                middle = randomItem(SlotIconMiddle)
                right = randomItem(SlotIconRight)
                playerSlot.push(left);
                playerSlot.push(middle);
                playerSlot.push(right);
                
                /* ====[ 중복 방지 ]====================================== */
                SlotIconLeft.splice(SlotIconLeft.indexOf(left), 1)
                SlotIconMiddle.splice(SlotIconMiddle.indexOf(middle), 1)
                SlotIconRight.splice(SlotIconRight.indexOf(right), 1)
                /* ====================================================== */
                
                i = i + 1;
            }
            var player = playerSlot[0] + playerSlot[1] + playerSlot[2] + '\n';
            player = player + playerSlot[3] + playerSlot[4] + playerSlot[5] + '\n';
            player = player + playerSlot[6] + playerSlot[7] + playerSlot[8];
            var score = 0;
            
            // 대각선 음의 방향
            if (playerSlot[0] == playerSlot[4] && playerSlot[4] == playerSlot[8]) {
                score = score + 1;
            }
            // 대각선 양의 방향
            if (playerSlot[2] == playerSlot[4] && playerSlot[4] == playerSlot[6]) {
                score = score + 1;
            }
            // 위에서 첫번째 줄
            if (playerSlot[0] == playerSlot[1] && playerSlot[1] == playerSlot[2]) {
                score = score + 1;
            }
            // 위에서 두번째 줄
            if (playerSlot[3] == playerSlot[4] && playerSlot[4] == playerSlot[5]) {
                if (playerSlot[3] == "7️⃣") {
                    score = score + 100; // 777 뜨면 고득점.
                } else {
                    score = score + 1;
                }
            }
            // 위에서 세번째 줄
            if (playerSlot[6] == playerSlot[7] && playerSlot[7] == playerSlot[8]) {
                score = score + 1;
            }
            replier.reply(player);
            var oldPoint = point;
            point = point * (0.5 + score);
            replier.reply(sender+"님의 이전 보유액: "+oldPoint.toString()+"\n현재 보유액: "+point)
            save("GambleBotDB", sender + ".txt", point.toString());
        }
    }
}
