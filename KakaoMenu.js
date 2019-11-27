function command(cmd) {
    var cmd_str = cmd.split(' ')[0];
    var param = cmd.substring(cmd_str.length + 1, cmd.length);
    return [cmd_str, param];
}

var client = [];

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg == ":menu") {
        if (!(sender in client)) {
            client.push(sender);
        }
        replier.reply("[1] Menu 1");
        replier.reply("[2] Menu 2");
        replier.reply("[3] Menu 3");
    }
    if (command(msg)[0] == ":choice") {
        if (sender in client) {
            client.splice(client.indexOf(sender), 1);
            switch (command(msg)[1]) {
                case '1':
                    replier.reply("1을 선택하였습니다.");
                    break;
                case '2':
                    replier.reply("2을 선택하였습니다.");
                    break;
                case '3':
                    replier.reply("3을 선택하였습니다.");
                    break;
                default:
                    replier.reply("다시 선택해 주십시오.");
            }
        }
    }
}
