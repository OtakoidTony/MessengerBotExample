Utils.getShortUrlJson = function(url) {
    try {
        var url = new java.net.URL("https://vivoldi.com/guest/write?url=" + url + "&typeIdx=103&customLinkId");
        var con = url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("User-Agent",
            "\'User-Agent\': \'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36\'");
        con.setRequestProperty("Content-Type", "multipart/form-data; boundary=----WebKitFormBoundaryB4yoMQALFribuPdn");
        con.setRequestProperty("x-requested-with", "XMLHttpRequest");
        if (con != null) {
            con.setConnectTimeout(5000);
            con.setUseCaches(false);
            var isr = new java.io.InputStreamReader(con.getInputStream());
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while ((line = br.readLine()) != null) {
                str += "\n" + line;
            }
            isr.close();
            br.close();
            con.disconnect();
        }
        return str + "";
    } catch (e) {
        Log.debug(e);
    }
}

Utils.getShortUrl = function(url) {
    return JSON.parse(Utils.getShortUrlJson(url)).result;
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    var data = Utils.getWebText("https://api.github.com/repos/OtakoidTony/MessengerBotExample/contents/");
    data = data.split("<body>\n")[1];
    data = data.split("</body>")[0];
    data = JSON.parse(data);
    var github = {};
    var i = 0;
    while (i<data.length){
        github[data[i].name]=data[i].download_url;
        i = i + 1;
    }
    i = 0;
    var str = "";
    while (i < Object.getOwnPropertyNames(github).length){
        if (i != Object.getOwnPropertyNames(github).length-1) {
            str = str + Object.getOwnPropertyNames(github)[i]+": "+Utils.getShortUrl(github[Object.getOwnPropertyNames(github)[i]])+"\n";
        } else {
            str = str + Object.getOwnPropertyNames(github)[i]+": "+Utils.getShortUrl(github[Object.getOwnPropertyNames(github)[i]]);
        }
        i = i + 1;
    }
    replier.reply(str);
}
