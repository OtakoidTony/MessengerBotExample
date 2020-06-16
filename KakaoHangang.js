function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg == ":한강온도") replier.reply("현재 한강 온도는 " + Utils.getWebText("https://hangang.winsub.kr").split("\'})\">")[1].split("<")[0] + " 입니다.");
}
