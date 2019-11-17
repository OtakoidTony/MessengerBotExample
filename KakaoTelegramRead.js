var last_message="";
var last_read_code=0;

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    var data = Utils.getWebText("https://api.telegram.org/bot"+token+"/getUpdates");
    data=data.split("<body>\n")[1];
    data=data.split("</body>")[0];
    data = JSON.parse(data);
    data = data.result;
    data = data[data.length-1];
    message=data.message;
    replier.reply(data.update_id);
    if(last_read_code<data.update_id){
        last_read_code=data.update_id;
        replier.reply("카톡 방 제목", message.text);
    }
}
