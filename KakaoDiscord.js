function Discord(isBot, token) {
    this.BaseURL = "https://discordapp.com/api";
    this.token = token;
    this.isBot = isBot;

    /**
     * 클라이언트가 접속시 사용할 단일 유효 WSS URL이
     * 담긴 오브젝트를 반환합니다.
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
     * 봇에 관련된 Get Gateway 기반의 함수입니다.
     * 몇 함수는 이 함수로부터 쿠키를 얻어 사용합니다.
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
     * 디스코드로 메시지를 전송합니다.
     * @param {any} sender 발신자 이름
     * @param {any} message 디스코드로 전송할 메시지 내용
     * 주의: 2000자까지 발송 가능.
     * @param {any} room 보낸 카카오톡 채팅방 이름
     * @param {any} channel_id 디스코드 채널 ID
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
     * 채널 혹은 개인 채팅에서의 메시지를 수신합니다.
     * 만약 길드채널인 경우 이 함수는 VIEW_CHANNEL 권한이 요구됩니다.
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
     * 채널 객체를 반환하는 함수입니다.
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