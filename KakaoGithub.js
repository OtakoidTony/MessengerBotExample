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
    replier.reply(Object.getOwnPropertyNames(github);
}
