Utils.getPubg = function() {
    try {
        var url = new java.net.URL("https://pubg.op.gg/api/leaderboard/ranked-users?platform=steam&queue_size=1&mode=tpp&limit=10");
        var con = url.openConnection();
        con.setRequestProperty("User-Agent", "\'User-Agent\': \'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36\'");
        con.setRequestProperty("Server", "nginx");
        con.setRequestProperty("X-Powered-By", "PHP/7.2.24");
        con.setRequestProperty("Cache-Control", "no-cache, private");
        con.setRequestProperty("Content-Encoding", "gzip");
        con.setRequestProperty("X-Amz-Cf-Pop", "ICN55-C1");
        con.setRequestProperty("X-Amz-Cf-Id", "oTcEQQRf8_FPqw8tTiXU7mE-pE-4d3YF9TIu-i_xo4wwEf5bkNm2_A==");
        con.setRequestProperty("Content-Length", "1346");
        con.setRequestProperty("Date", "Wed, 27 Nov 2019 15:40:07 GMT");
        con.setRequestProperty("Connection", "keep-alive");
        con.setRequestProperty("Vary", "Accept-Encoding");
        con.setRequestProperty("Set-Cookie", "ak_bmsc=7D6A39897F0C7AA1D0B7EF4FF4716410ADDFE39547050000D798DE5D87EA0045~plZyjN0kjuea8DEJ+Mp/DWM6E97JF37Sl5RFIwMPo1jAvG9IdwDqj2VfbnmsrJtnMzfLXWcxiBRRkFIFO1cDVRtEp6LazxbVSirWNgxJgA8k1biOFDnLghX7FeFYkd1uXtnjz1RpbN19Zg7B+Mp0r7LfjsAAxNDQtRVgpa3TFuphd70JWs9rWfoSVYxa0Q3970UtyDvKK/TmN06gL/fcCsVsq5/RC2zGDUpnC2dqi+BtU=; expires=Wed, 27 Nov 2019 17:40:07 GMT; max-age=7200; path=/; domain=.pubg.op.gg; HttpOnly");
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
