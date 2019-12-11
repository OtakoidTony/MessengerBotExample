function Discord(isBot, token) {
    this.BaseURL = "https://discordapp.com/api";
    this.token = token;
    this.isBot = isBot;

    /**
     * Returns an object with a single valid WSS URL, 
     * which the client can use for Connecting.
     * */
    this.getGateway = function () {
        try {
            var result = org.jsoup.Jsoup.connect(this.BaseURL + "/v6/gateway")
                .timeout(5000)
                .ignoreContentType(true)
                .header("Host", "discordapp.com")
                .header("User-Agent", "Mozilla/5.0")
                .header("Cache-Control", "no-cache")
                .header("Accept-Encoding", "gzip, deflate")
                .header("Connection", "keep-alive")
                .method(org.jsoup.Connection.Method.GET)
                .execute();
            return result;
        } catch (e) {
            Log.debug(e);
        }
    }

    /**
     * Returns an object based on the information in Get Gateway, 
     * plus additional metadata that can help during the operation 
     * of large or sharded bots.
     * */
    this.getGatewayBot = function () {
        try {
            var result = org.jsoup.Jsoup.connect(this.BaseURL + "/v6/gateway/bot")
                .timeout(5000)
                .ignoreContentType(true)
                .header("Host", "discordapp.com")
                .header("Authorization", "Bot " + this.token)
                .header("User-Agent", "Mozilla/5.0")
                .header("Cache-Control", "no-cache")
                .header("Accept-Encoding", "gzip, deflate")
                .header("Connection", "keep-alive")
                .method(org.jsoup.Connection.Method.GET)
                .execute();
            return result;
        } catch (e) {
            Log.debug(e);
        }
    }

    /**
     * Post a message to a guild text or DM channel.
     * @param {any} sender
     * @param {any} message
     * @param {any} room
     * @param {any} channel_id
     */
    this.sendMessage = function (sender, message, room, channel_id) {
        try {
            var message_json = {
                "tts": false,
                "embed": {
                    "title": sender,
                    "description": message,
                    "author": {
                        "name": room,
                        "icon_url": "https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium_ov.png"
                    },
                    "image": {
                        "url": "https://developers.kakao.com/assets/img/kakao.png"
                    }
                }
            };
            var result = org.jsoup.Jsoup.connect(this.BaseURL + "/v6/channels/" + channel_id + "/messages")
                .timeout(5000)
                .ignoreContentType(true)
                .header("Host", "discordapp.com")
                .header("Authorization", "Bot " + this.token)
                .header("User-Agent", "Mozilla/5.0")
                .header("Cache-Control", "no-cache")
                .header("Accept-Encoding", "gzip, deflate")
                .header("Connection", "keep-alive")
                .header("Cache-Control", "no-cache")
                .header("Accept", "*/*")
                .cookies(this.getGatewayBot().cookies())
                .requestBody(JSON.stringify(message_json))
                .header("Content-Type", "application/json")
                .post();
            return result;
        } catch (e) {
            Log.debug(e);
        }
    }

    /**
     * Returns the messages for a channel. If operating on a guild channel, 
     * this function requires the VIEW_CHANNEL permission to be present 
     * on the current user.
     * @param {string} channel_id
     */
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
            return JSON.parse(result);
        } catch (e) {
            Log.debug(e);
        }
    }

    /**
     * Get a channel by ID. Returns a channel object.
     * @param {string} channel_id
     */
    this.getChannel = function (channel_id) {
        try {
            var url = new java.net.URL(this.BaseURL + "/v6/channels/" + channel_id);
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
            return JSON.parse(result);
        } catch (e) {
            Log.debug(e);
        }
    }
}