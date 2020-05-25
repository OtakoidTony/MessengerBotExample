function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg == ":한강온도") replier.reply("현재 한강 온도는 " + Utils.getWebText("https://www.wpws.kr/hangang/").split("</i>")[1].split("<s")[0] + "°C 입니다.");
}
