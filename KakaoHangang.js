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
    if (msg == ":한강온도") {
        var data = Utils.getWebText("https://www.wpws.kr/hangang/");
        data = data.split("</i>")[1].split("</p>")[0];
        replier.reply("현재 한강 온도는 " + data + "°C 입니다.");
    }
}
