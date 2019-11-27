function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    try {
        if (isGroupChat) {
            if (!(room in Attendance)) {
                Attendance[room] = {}; /* 출석부에 없는 채팅방이면 빈 객체를 생성 */
            }
            if (Attendance[room][sender] != date()) {
