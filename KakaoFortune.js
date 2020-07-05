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

/**
 * 성별과 생년월일를 입력받아 운세에 대한 정보를 담은 객체를 내보내는 함수
 * @param gender 'f' or 'm'
 * @param birth ex) 19990101
 * @deprecated JSON.parse()의 매개가 JSON형식을 따르지 않음.
 */
function fortune(gender, birth) {
    return JSON.parse(Utils.getWebText("https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver?_callback=window.__jindo2_callback._fortune_my_0&gender=" + gender + "&birth=" + birth + "&solarCal=solar&time=").split("window.__jindo2_callback._fortune_my_0(")[1].split(");")[0]);
}

/**
 * 성별과 생년월일를 입력받아 총운에 대한 정보를 담은 객체를 내보내는 함수
 * @param gender 'f' or 'm'
 * @param birth ex) 19990101
 */
function totalFortune(gender, birth) {
    return JSON.parse('['+Utils.getWebText("https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver?_callback=window.__jindo2_callback._fortune_my_0&gender=" + gender + "&birth=" + birth + "&solarCal=solar&time=").split("[")[1].split("]")[0]+']')[0];
}

/**
 * 유효한 날짜인지 검사하는 함수
 * 참고 사이트: https://aljjabaegi.tistory.com/160
 * @param dateStr 날짜 문자열 (YYYYMMDD)
 */
function isValidDate(dateStr) {
    var year = Number(dateStr.substr(0, 4));
    var month = Number(dateStr.substr(4, 2));
    var day = Number(dateStr.substr(6, 2));

    if (year < 1900) {
        return false;
    }
    if (month < 1 || month > 12) {
        return false;
    }
    if (day < 1 || day > 31) {
        return false;
    }
    if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
        return false;
    }
    if (month == 2) {
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day == 29 && !isleap)) {
            return false;
        }
    }
    return true;
}



function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var args = msg.split(' ');
    if (args[0] == "!운세") {
        if (args.length == 3) {
            if (Number(args[2]) == args[2]) {
                if (isValidDate(args[2])) {
                    if (args[1] == "남자" || args[1] == "남성") {
                        var resultObject = totalFortune('m', args[2]);
                        var result = resultObject.keyword +'\u200b'.repeat(500) + '\n\n' +resultObject.desc;
                        replier.reply(result);
                    } else if (args[1] == "여자" || args[1] == "여성") {
                        var resultObject = totalFortune('f', args[2]);
                        var result = resultObject.keyword +'\u200b'.repeat(500) + '\n\n' +resultObject.desc;
                        replier.reply(result);
                    } else {
                        replier.reply("지원하지 않는 성별입니다.");
                    }
                }else{
                    replier.reply("존재하지 않는 날짜입니다.");
                }
            } else {
                replier.reply("날짜에 숫자가 아닌 문자열이 포함되어 있습니다.");
            }
        }
    }
}
