String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

Utils.getWithUAfromWeb = function(url) {
    try {
        var url = new java.net.URL(url);
        var con = url.openConnection();
        con.setRequestProperty("User-Agent", "\'User-Agent\': \'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36\'");
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
        //Log.debug(e);
    }
}


function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var BlackList = new Array("사용 금지할 채팅방");
    if (BlackList.indexOf(room)==-1) {
        if (msg.charAt(0) == "h" && msg.charAt(1) == "!") {
            try {
                var title = msg.split("!")[1];
                var UrlTitle=title.replaceAll(' ', '-');
                var Url = "https://hanime.tv/videos/hentai/"+UrlTitle;
                var data = Utils.getWithUAfromWeb(Url);
                
                // Title
                var Title = data.split("tv-title")[1];
                Title = Title.split("<")[0];
                Title = Title.split(">")[1];
                
                // Brand
                var Brand = data.split("/browse/brands/")[1];
                Brand = Brand.split("<")[0];
                Brand = Brand.split(">")[1];
                
                // Release Date
                var ReleaseDate = data.split("Release Date")[1];
                ReleaseDate = ReleaseDate.split("hvpimbc-text grey--text")[1];
                ReleaseDate = ReleaseDate.split("<")[0];
                ReleaseDate = ReleaseDate.split(">")[1];
                
                // Description
                var Description = data.split("mt-3 mb-0 hvpist-description")[1];                
                Description = Description.replace(/<p>/gi, "");
                Description = Description.replace(/<\/p>/gi, "");
                Description = Description.split("</div>")[0];
                Description = Description.split(">")[1]; 
                
                
                replier.reply("작품명: "+Title);
                replier.reply("그룹명: "+Brand);
                replier.reply("발매일: "+ReleaseDate);
                replier.reply("줄거리: "+Description);
            } catch (e) {
                Log.debug(e + ", " + e.lineNumber);
                replier.reply("에러가 발생했습니다.");
            }
        }
    }
}
