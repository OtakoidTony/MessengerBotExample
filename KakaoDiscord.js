function Discord(isBot, token) {
    this.BaseURL = "https://discordapp.com/api";
    this.token = token;
    this.isBot = isBot;

    this.sendMessage = function (sender, message, channel_id) {
        try {
            var url = new java.net.URL(this.BaseURL + "/v6/channels/" + channel_id + "/messages");
            var con = url.openConnection();
            con.setDoOutput(true);
            con.setRequestProperty("User-Agent", "Mozilla/5.0");

            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setRequestMethod("POST");

            var message_json = {
                "content": message,
                "tts": false,
                "embed": {
                    "title": sender,
                    "description": "카카오톡에서 보낸 메시지입니다."
                }
            };
            if (this.isBot) {
                con.setRequestProperty("Authorization", "Bot " + this.token);
            } else {
                con.setRequestProperty("Authorization", "Bearer " + this.token);
            }
            if (con != null) {
                con.setConnectTimeout(5000);
                con.setUseCaches(false);
                var wr = new java.io.OutputStreamWriter(con.getOutputStream());
                var isr = new java.io.InputStreamReader(con.getInputStream());
                var br = new java.io.BufferedReader(isr);
                var str = br.readLine();
                var line = "";
                while ((line = br.readLine()) != null) {
                    str += "\n" + line;
                }
                wr.write(JSON.stringify(message_json));
                wr.close();
                isr.close();
                br.close();
                con.disconnect();
            }
            var result = str + "";
            return result;
        } catch (e) {
            Log.debug(e);
        }
    }
    this.getMessage = function (channel_id) {
        try {
            var url = new java.net.URL(this.BaseURL + "/v6/channels/" + channel_id + "/messages");
            var con = url.openConnection();
            con.setRequestProperty("User-Agent", "Mozilla/5.0");
            if (this.isBot) {
                con.setRequestProperty("Authorization", "Bot " + this.token);
            } else {
                con.setRequestProperty("Authorization", "Bearer " + this.token);
            }
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
            return JSON.parse(result).items;
        } catch (e) {
            Log.debug(e);
        }
    }
}
