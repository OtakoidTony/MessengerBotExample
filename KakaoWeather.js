function getWeather() {
    var res = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨")
        .ignoreContentType(true).get()
        .select("div.lcl_lst")
        .select("span");
    var objs = [];
    var obj = null;
    for (var i = 0; i < res.size(); i++) {
        if (i % 5 == 0) {
            obj = {};
            Object.assign(obj, {
                "location": res.get(i).text()
            });
        }
        if (i % 5 == 1) {
            Object.assign(obj, {
                "temperature": Number(res.get(i).html().split("<")[0])
            });
        }
        if (i % 5 == 4) {
            Object.assign(obj, {
                "weather": res.get(i).text()
            });
            objs.push(obj);
        }
    }
    return objs;
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg == "$날씨") {
        var weather = getWeather();
        var result = "현재 지역별 날씨" + "\u200b".repeat(500) + "\n\n\n";
        for (var i = 0; i < weather.length; i++) {
            result += "지역: " + weather[i].location + "\n";
            result += "기온: " + weather[i].temperature + "\n";
            result += "날씨: " + weather[i].weather;
            if (i != weather.length - 1) result += "\n\n";
        }
        replier.reply(result);
    }
}
