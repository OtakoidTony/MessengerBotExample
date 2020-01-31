String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest);
}

Utils.getHanimeJSON = function (url) {
    try {
        var url = new java.net.URL(url);
        var con = url.openConnection();
        con.setRequestProperty("User-Agent", "Mozilla/5.0");
        con.setRequestProperty('X-Directive', 'api');

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
        return JSON.parse(str + "");
    } catch (e) {
        //Log.debug(e);
        return "error";
    }
}


function Hanime(title) {
    var input_url = 'https://members.hanime.tv/api/v5/hentai-videos/' + title.replaceAll(' ', '-');
    var result = Utils.getHanimeJSON(input_url);
    this.debug = result;
    if (result != "error") {
        var video = result.hentai_video;
        this.title = video.name;
        this.release = video.released_at.split("T")[0];
        this.description = video.description.replace(/(<([^>]+)>)/g, "");
        var tags = [];
        for (var i in video.hentai_tags) {
            tags.push(video.hentai_tags[i].text);
        }
        this.tags = tags;
        this.brand = video.brand;
    }
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var BlackList = new Array("사용 금지할 채팅방");
    if (BlackList.indexOf(room) == -1) {
        if (msg.startsWith("hanime:")) {
            try {
                msg = msg.toLowerCase();
                var title = msg.split(":")[1];
                var res = new Hanime(title);
                var tag = "";
                for (i in res.tags) {
                    if(i==res.tags.length-1){
                        tag += res.tags[i];
                    }else{
                        tag += res.tags[i] + ', ';
                    }
                }
                replier.reply(res.title + "\n\n발매일: " + res.release + "\n줄거리: " + res.description + "태그: " + tag);
            } catch (e) {
                Log.debug(e + ", " + e.lineNumber);
                replier.reply(res.debug);
            }
        }
    }
}