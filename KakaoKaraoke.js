Utils.getWebJson = function (url) {
    try {
        var url = new java.net.URL(url);
        var con = url.openConnection();
        con.setRequestProperty("User-Agent", "Mozilla/5.0");
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
        var result = str + "";
        return JSON.parse(result);
    } catch (e) {
        Log.debug(e);
    }
}

function loadSongData() {
    this.baseUrl = "https://api.manana.kr/karaoke";
    this.withTitle = function (title) {
        return Utils.getWebJson(this.baseUrl + "/song/" + title + ".json");
    }
    this.withNumber = function (number) {
        return Utils.getWebJson(this.baseUrl + "/no/" + number + ".json");
    }
    this.withTitleAndBrand = function (title, brand) {
        return Utils.getWebJson(this.baseUrl + "/song/" + title + "/" + brand + ".json");
    }
}

const getter = new loadSongData();
data=[
	{
		"brand": "tj",
		"no": "27848",
		"title": "Daydream Cafe(ご注文はうさぎですか? OP)",
		"singer": "Petit Rabbit's",
		"composer": "大久保薫",
		"lyricist": "畑亜貴",
		"release": "2016-04-01"
	}
]
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var args = msg.split(" ");
    if (args[0].toLowerCase() == "search") {
        if (args[1].toLowerCase() == "from") {
            if (args[2] == "tj") {
                if (args[3].toLowerCase() == "select") {
                    var title = msg.substring((args[0] + ' ' + args[1] + ' ' + args[2] + ' ' + args[3] + ' ').length, msg.length);
                    var res = getter.withTitleAndBrand(title, "tj");
                    var res_send = '\u200b'.repeat(500) + '\n\n';
                    for (var i = 0; i<res.length;i++){
                        if(i==res.length-1){
                            res_send+="title:\n"+res[i].title+"\n";
                            res_send+="singer:\n"+res[i].singer+"\n";
                            res_send+="number:\n"+res[i].no
                        }else{
                            res_send+="title:\n"+res[i].title+"\n";
                            res_send+="singer:\n"+res[i].singer+"\n";
                            res_send+="number:\n"+res[i].no+"\n\n";
                        }
                    }
                    replier.reply(res_send);
                }
            }
            if (args[2] == "kumyoung") {
                if (args[3].toLowerCase() == "select") {
                    var title = msg.substring((args[0] + ' ' + args[1] + ' ' + args[2] + ' ' + args[3] + ' ').length, msg.length);
                    var res = getter.withTitleAndBrand(title, "kumyoung");
                    var res_send = '\u200b'.repeat(500) + '\n\n';
                    for (var i = 0; i<res.length;i++){
                        if(i==res.length-1){
                            res_send+="title:\n"+res[i].title+"\n";
                            res_send+="singer:\n"+res[i].singer+"\n";
                            res_send+="number:\n"+res[i].no
                        }else{
                            res_send+="title:\n"+res[i].title+"\n";
                            res_send+="singer:\n"+res[i].singer+"\n";
                            res_send+="number:\n"+res[i].no+"\n\n";
                        }
                    }
                    replier.reply(res_send);
                }
            }
        }
    }
}
