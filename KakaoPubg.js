Utils.getPubg = function() {
    try {
        var url = new java.net.URL("https://pubg.op.gg/api/leaderboard/ranked-users?platform=steam&queue_size=1&mode=tpp&limit=10");
        var con = url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("User-Agent", "PostmanRuntime/7.20.1");
        con.setRequestProperty("Accept", "*/*");
        con.setRequestProperty("Cache-Control", "no-cache");
        con.setRequestProperty("Host", "pubg.op.gg");
        con.setRequestProperty("Accept-Encoding", "gzip, deflate");
        con.setRequestProperty("Connection", "keep-alive");
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
