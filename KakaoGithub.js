function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    var data = Utils.getWebText("https://api.github.com/repos/OtakoidTony/MessengerBotExample/contents/");
    data = data.split("<body>\n")[1];
    data = data.split("</body>")[0];
    data = JSON.parse(data);
    var APIs = {};
    var i;
    for (i in data){
        
}
