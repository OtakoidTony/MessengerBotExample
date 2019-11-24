function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    var data = Utils.getWebText("https://api.github.com/repos/OtakoidTony/MessengerBotExample/contents/");
    data = data.split("<body>\n")[1];
    data = data.split("</body>")[0];
    data = JSON.parse(data);
    var github = {};
    var i = 0;
    while (i<data.length){
        github[data[i].name]=data[i].download_url;
        i = i + 1;
    }
    i = 0;
    var str = "";
    while (i<Object.getOwnPropertyNames(github).length){
        if (i != length-1) {
            str = str + Object.getOwnPropertyNames(github)[i]+": "+github[Object.getOwnPropertyNames(github)[i]]+"\n";
        } else {
            str = str + Object.getOwnPropertyNames(github)[i]+": "+github[Object.getOwnPropertyNames(github)[i]];
        }
        i = i + 1;
    }
    replier.reply(str);
}
