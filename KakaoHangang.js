function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg == ":한강온도") {
        var data = Utils.getWebText("https://www.wpws.kr/hangang/");
        data = data.split("</i>")[1].split("</p>")[0].split("도")[0];
        replier.reply("현재 한강 온도는 " + data + "°C 입니다.");
    }
}
