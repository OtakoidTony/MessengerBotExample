# MessengerBotExample
Examples based on AutoReplyBot including extra programming.
## License
```
MIT License

Copyright (c) 2019 Rojiku, OtakoidTony, Park Hyun

이 소프트웨어의 복제본과 관련된 문서화 파일(“소프트웨어”)을 획득하는 사람은 누구라도 
소프트웨어를 별다른 제한 없이 무상으로 사용할 수 있는 권한을 부여 받는다. 여기에는 
소프트웨어의 복제본을 무제한으로 사용, 복제, 수정, 병합, 공표, 배포, 서브라이선스 설정 
및 판매할 수 있는 권리와 이상의 행위를 소프트웨어를 제공받은 다른 수취인들에게 허용할 
수 있는 권리가 포함되며, 다음과 같은 조건을 충족시키는 것을 전제로 한다.

위와 같은 저작권 안내 문구와 본 허용 문구가 소프트웨어의 모든 복제본 및 중요 부분에 
포함되어야 한다.

이 소프트웨어는 상품성, 특정 목적 적합성, 그리고 비침해에 대한 보증을 포함한 어떠한 
형태의 보증도 명시적이나 묵시적으로 설정되지 않은 “있는 그대로의” 상태로 제공된다.
소프트웨어를 개발한 프로그래머나 저작권자는 어떠한 경우에도 소프트웨어나 소프트웨어의 
사용 등의 행위와 관련하여 일어나는 어떤 요구사항이나 손해 및 기타 책임에 대해 계약상, 
불법행위 또는 기타 이유로 인한 책임을 지지 않는다.
```
## Specific Copyright
> **Excluding listed elements this array, Copyright of scripts uploaded on this repository is on OtakoidTony, Rojiku, Park Hyun. And sometimes when I used others function, I evinced their Copyright. If there is some omissions then please let me know. Thanks.** 
### KakaoImageBraille.js
**jeongyeon13751** 191016. 17:40  
https://m.blog.naver.com/jeongyeon13751/221679655789

## User-Agent Modification
```javascript
Utils.getWithUAfromWeb = function(url) {
    try {
        var url = new java.net.URL(url);
        var con = url.openConnection();
        con.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36");
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
```
### Mobile User-Agent
```
Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Mobile Safari/537.36
```
### Computer User-Agent
```
Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36
```
## POST Request
```javascript
Utils.getPostFromWeb = function(url, parameters) {
    try {
        var url = new java.net.URL(url);
        var con = url.openConnection();
        
        con.setRequestMethod("POST");
        con.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36");
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
    } catch (e) {
        //Log.debug(e);
    }
}
```
