function command(cmd) {
    var cmd_str = cmd.split(' ')[0];
    var param = cmd.substring(cmd_str.length + 1, cmd.length);
    return [cmd_str, param];
}

var mail = {};
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (command(msg)[0] == "/메일쓰기") {
        var receiver = command(msg)[1].split(':')[0];
        var contents = command(msg)[1].split(':')[1];
        if (!(receiver in mail)) {
            mail[receiver] = [];
        }
        mail[receiver].push(sender + "보냄\n\n" + contents);
    }
    if (sender in mail) {
        replier.reply(mail[sender]);
        delete(mail[sender]);
    }
}

