String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest);
}

/**
 * 
 * @param {string} cmd
 */
function command(cmd) {
    var cmd_str = cmd.split(' ')[0];
    var param = cmd.substring(cmd_str.length + 1, cmd.length);
    return [cmd_str, param];
}

/**
 * Hitomi.la Crawling Object
 * 
 * This object includes only string datas because there
 * is no function about crawling gallery images because
 * KakaoTalk does not support sending images API that
 * can use in open chat service.
 * 
 * @param {string} gallery_id
 */
function Hitomi(gallery_id) {
    var input_url = 'https://hitomi.la/galleries/' + gallery_id + ".html";
    var data = Utils.getWebText(input_url);
    /* --[ hitomi.la href patch ]------------------------------- */
    input_url = data.split("a href=\"")[1].split("\">link")[0];
    data = Utils.getWebText(input_url);
    /* --------------------------------------------------------- */
    this.artist = data.split("<ul class=\"comma-list\">")[1]
        .replace('\n', "").split("</li>")[0]
        .replace(/(<([^>]+)>)/g, "")
        .replaceAll('\n', "")
        .replaceAll('  ', " ");
    this.title = data.split("<h1><a href=\"/reader/" + gallery_id + ".html\">")[1]
        .split("</a></h1>")[0];
    var TagsHtml = data.split("<td>Tags</td>")[1]
        .split("<ul class=\"tags\">")[1]
        .split("</ul>")[0]
        .split("<li><a href=\"");
    var tags = "";
    for (var j in TagsHtml) {
        if (j != 0) {
            if (j != TagsHtml.length - 1) {
                tags = tags + TagsHtml[j].split(">")[1].split("<")[0]; + "\n";
            } else {
                tags = tags + TagsHtml[j].split(">")[1].split("<")[0];
            }
        }
    }
    this.tags = tags;
}

/**
 * Main function including almost of routines.
 * @param {string} room 메시지를 받은 방 이름
 * @param {string} msg 메시지 내용
 * @param {string} sender 전송자 닉네임
 * @param {boolean} isGroupChat 단체/오픈채팅 여부
 * @param {any} replier 응답용 객체. replier.reply("메시지") 또는
 * replier.reply("방이름","메시지")으로 전송
 * @param {any} ImageDB ImageDB.getProfileImage(): 전송자의 프로필 이미지를 Base64로 인코딩하여 반환
 * @param {string} packageName 메시지를 받은 메신저의 패키지 이름
 * @param {number} threadId 현재 쓰레드의 순번(스크립트별로 따로 매김)
 * Api,Utils객체에 대해서는 설정의 도움말 참조
 */
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var BlackList = new Array("사용 금지할 채팅방");
    if (BlackList.indexOf(room) == -1 || isGroupChat == false) {
        if (command(msg)[0] in ["hitomi", "Hitomi", "히토미"]) {
            var result = new Hitomi(command(msg)[1]);
            replier.reply(result.title);
            replier.reply(result.artist);
            replier.reply(result.tags);
        }
    }
}
