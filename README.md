# MessengerBotExample
Examples based on AutoReplyBot including extra programming.
## License
```
MIT License

Copyright (c) 2019 Rojiku, OtakoidTony, Park Hyun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
    } catch (e) {
        //Log.debug(e);
    }
}
```
