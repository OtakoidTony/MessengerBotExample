# MessengerBotExample
Examples based on AutoReplyBot including extra programming.

## Special Copyright
### KakaoImageBraille.js
**jeongyeon13751** 191016. 17:40  
https://m.blog.naver.com/jeongyeon13751/221679655789

## User-Agent Modification
```javascript
Utils.getWithUAfromWeb = function(url) {
    try {
        var url = new java.net.URL(url);
        var con = url.openConnection();
        con.setRequestProperty("User-Agent", "\'User-Agent\': \'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36\'");
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
```
