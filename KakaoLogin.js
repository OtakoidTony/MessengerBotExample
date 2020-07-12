var database = JSON.parse(FileStream.read("sdcard/Kakao_loginSystem/database.json"));
if (database == null) database = [];

/**
 * 객체 배열 중에 key에 해당하는 값이 value인 객체의 인덱스를 반환하는 함수
 * @param key 찾을 값에 대한 key
 * @param value key에 해당하는 값
 */
Array.prototype.findObjectIndex = function (key, value) {
    for (var i = 0; i < this.length; i++)
        if (this[i][key] == value) return i;
    return -1;
};

/**
 * 객체 배열 중에 key에 해당하는 값이 value인 객체를 반환하는 함수  
 * 해당하는 객체가 없을 경우 null을 반환.
 * @param key 찾을 값에 대한 key
 * @param value key에 해당하는 값
 */
Array.prototype.findObject = function (key, value) {
    if (this.findObjectIndex(key, value) != -1) return this[this.findObjectIndex(key, value)];
    else return null;
};

function makeRandomPassword(size) {
    var result = "";
    for (var i = 0; i < size; i++)
        result += parseInt(Math.random() * 10);
    return result;
}

const allowMultiAccount = false;

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var msg_args = msg.split(' ');

    if (msg_args[0] == "!회원가입") {
        if (isGroupChat) {
            replier.reply("현재 그룹채팅 중입니다. 1:1 채팅으로 진행해주시기 바랍니다.");
        } else {
            if (allowMultiAccount) {
                if (database.findObjectIndex('id', msg_args[1]) == -1) {
                    database.push({
                        "id": msg_args[1],
                        "pw": msg_args[2],
                        "temp": null,
                        "owner": sender
                    })
                } else {
                    replier.reply("이미 있는 id입니다. 탈퇴하려면,\n!탈퇴 [id] [pw]\n을 입력해주십시오.");
                }
            } else {
                if (database.findObjectIndex('owner', sender) == -1) {
                    if (database.findObjectIndex('id', msg_args[1]) == -1) {
                        database.push({
                            "id": msg_args[1],
                            "pw": msg_args[2],
                            "temp": null,
                            "owner": sender
                        });
                    } else {
                        replier.reply("이미 있는 id입니다. 탈퇴하려면,\n!탈퇴 [id] [pw]\n을 입력해주십시오.");
                    }
                } else {
                    replier.reply("이미 가입하신 계정입니다. id를 찾으시려면,\n!id찾기\n을 입력해주십시오.");
                }
            }
        }
    }

    if (msg_args[0] == "!탈퇴") {
        if (database.findObjectIndex('id', msg_args[1]) == -1) {
            replier.reply("없는 id입니다. 가입하려면,\n!회원가입 [id] [pw]\n을 입력해주십시오.");
        } else {
            var targetAccount = database.findObject('id', msg_args[1]);
            if (targetAccount.pw == msg_args[2]) database.splice(database.findObjectIndex('id', msg_args[1]), 1);
            else replier.reply("pw가 잘못되었습니다. 계정 패스워드를 초기화하려면 개발자한테 연락주십시오.");
        }
    }

    if (msg_args[0] == "!1회용패스워드생성") {
        if (database.findObjectIndex('id', msg_args[1]) == -1) {
            replier.reply("없는 id입니다. 가입하려면,\n!회원가입 [id] [pw]\n을 입력해주십시오.");
        } else {
            if (msg_args[2] == database.findObject('id', msg_args[1]).pw) {
                var tempPassword = makeRandomPassword(10);
                database.findObject('id', msg_args[1]).temp = tempPassword;
            }
        }
    }

    if (msg_args[0] == "!로그인") {
        if (database.findObjectIndex('id', msg_args[1]) == -1) {
            replier.reply("없는 id입니다. 가입하려면,\n!회원가입 [id] [pw]\n을 입력해주십시오.");
        } else {
            if (database.findObject('id', msg_args[1]).temp == msg_args[2] && database.findObject('id', msg_args[1]).temp != null) {
                replier.reply("로그인되었습니다.");
                database.findObject('id', msg_args[1]).temp = null;
            } else {
                replier.reply("pw가 잘못되었습니다. 계정 패스워드를 초기화하려면 개발자한테 연락주십시오.");
            }
        }
    }
}
