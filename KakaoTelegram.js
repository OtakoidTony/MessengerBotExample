Utils.sendMessage = function(token, parameters) {
    try {
        var url = new java.net.URL("https://api.telegram.org/bot"+ token + "/getUpdates/");
        var con = url.openConnection();
        
        con.setRequestMethod("POST");
        con.setRequestProperty("User-Agent", "\'User-Agent\': \'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36\'");
        con.setDoOutput(true);
        if (con != null) {
            con.setConnectTimeout(5000);
            con.setUseCaches(false);
            var wr = new java.io.DataOutputStream(con.getOutputStream());
            wr.writeBytes(parameters);
            wr.flush();
            wr.close();
            var responseCode = con.getResponseCode();
            var isr = new java.io.InputStreamReader(con.getInputStream());
            var br = new java.io.BufferedReader(isr);
            var inputLine;
            var response = new java.lang.StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
            con.close();
            return response.toString();
        }
    }
}
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    if(msg.substring(0, 5) == "send!"){
        var message = msg.substring(6, msg.length);
        var data = Utils.sendMessage(token,"?chat_id="+ chat_id +"&text="+sender+": "+message);
    }
}
