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