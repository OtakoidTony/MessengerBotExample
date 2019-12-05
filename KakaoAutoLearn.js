var say = false;
var room_chat = {};
var isSender = true;

function randomItem(a) {
    return a[java.lang.Math.floor(java.lang.Math.random() * a.length)];
}

var learn_room = "";
var learn_word = "";
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (!(room in room_chat)) {
        room_chat[room] = {};
    }
    if ((msg != "@말하기") && (msg != "@침묵하기") && isSender) {
        if (!(msg in room_chat[room])) {
            room_chat[room][msg] = [];
        }
        isSender = false;
        learn_word = msg;
        learn_room = room;
    } else {
        if (room == learn_room) {
            room_chat[room][learn_word].push(msg);
            isSender = true;
        }
    }
    if (say && (msg in room_chat[room])) {
        if (room_chat[room][msg] != []) {
            replier.reply(randomItem(room_chat[room][msg]));
        }
    }
    if (msg == "@말하기") {
        say = true;
    }
    if (msg == "@침묵하기") {
        say = false;
    }
}