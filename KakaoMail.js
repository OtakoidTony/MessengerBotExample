function command(cmd) {
    var cmd_str = cmd.split(' ')[0];
    var param = cmd.substring(cmd_str.length + 1, cmd.length);
    return [cmd_str, param];
}

var allsee = new Array(1000).join(String.fromCharCode(847));
var mail = {};

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (command(msg)[0] == "/메일쓰기") {
        var receiver = command(msg)[1].split(':')[0];
        var contents = command(msg)[1].split(':')[1];
        if (!(receiver in mail)) { mail[receiver] = [receiver + "님에게 메일이 도착했습니다.\n" + allsee];}
        mail[receiver].push("\n\n" + sender + "가 보낸 메일\n" + contents);
        replier.reply(receiver + "님에게\n" + sender + "님이\n메일을 보냈습니다.");
    }
    if (sender in mail) {
        var send_mail = "";
        for (var i in mail[sender]) {
            send_mail = send_mail + mail[sender][i];
        }
        replier.reply(send_mail);
        delete (mail[sender]);
    }
}