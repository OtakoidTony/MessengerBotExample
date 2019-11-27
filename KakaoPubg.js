function sendGet(targetUrl, parameters){
    try {
        var url = new java.net.URL("https://pubg.op.gg/api/leaderboard/ranked-users?platform=steam&queue_size=1&mode=tpp&limit=10");
        var con = url.openConnection();
        con.setRequestMethod("Get");
        con.setRequestProperty("User-Agent",
            "\'User-Agent\': \'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36\'");
        con.setRequestProperty("Content-Type", "multipart/form-data; boundary=----WebKitFormBoundaryB4yoMQALFribuPdn");
        con.setRequestProperty("x-requested-with", "XMLHttpRequest");
        if (con != null) {
            con.setConnectTimeout(5000);
            con.setUseCaches(false);
            con.setDoOutput(true); /* POST 파라미터 전달을 위한 설정 */
            var wr = new java.io.DataOutputStream(con.getOutputStream());
            wr.writeBytes(parameters);
            wr.flush();
            wr.close();
            
            var responseCode = con.getResponseCode();
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
