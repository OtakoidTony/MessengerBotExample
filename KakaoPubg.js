Utils.getPubg = function() {
    try {
        var url = new java.net.URL("https://pubg.op.gg/api/leaderboard/ranked-users?platform=steam&queue_size=1&mode=tpp&limit=10");
        var con = url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");
        con.setRequestProperty("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3");
        con.setRequestProperty("Cache-Control", "no-cache");
        con.setRequestProperty("Host", "pubg.op.gg");
        con.setRequestProperty("Accept-Encoding", "gzip, deflate");
        con.setRequestProperty("accept-language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5");
        con.setRequestProperty("Connection", "keep-alive");
        con.setRequestProperty("sec-fetch-mode", "sec-fetch-mode");
        con.setRequestProperty("dnt", "1");
        con.setRequestProperty("sec-fetch-site", "none");
        con.setRequestProperty("sec-fetch-user", "?1");
        con.setRequestProperty("upgrade-insecure-requests", "1");
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

doc = Jsoup.connect("https://pubg.op.gg/api/leaderboard/ranked-users?platform=steam&queue_size=1&mode=tpp&limit=10")
            .userAgent("Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36")
            .header("scheme", "https")
            .header("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3")
            .header("accept-encoding", "gzip, deflate, br")
            .header("accept-language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6")
            .header("cache-control", "no-cache")
            .header("pragma", "no-cache")
            .header("upgrade-insecure-requests", "1")
            .get();
