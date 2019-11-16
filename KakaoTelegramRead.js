function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    if(msg.substring(0, 5) == "send!"){
        var message = msg.substring(6, msg.length);
        var data = Utils.getWebText("https://api.telegram.org/bot"+ token +"/sendMessage?chat_id="+ chat_id +"&text="+sender+": "+message);
    }
}
