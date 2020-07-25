/**
 * Papago의 번역기능을 이용해 텍스트를 번역한 문자열을 반환하는 함수
 * @param {String} source 번역될 텍스트의 언어코드
 * @param {String} target 번역할 언어코드
 * @param {String} text 번역할 텍스트
 * @returns {String} 번역 결과
 */
function papago(source, target, text) {
    return JSON.parse(org.jsoup.Jsoup.connect("https://papago.naver.com/apis/n2mt/translate")
        .requestBody('data=' + encodeURIComponent(JSON.stringify({
            "source": source,
            "target": target,
            "text": text
        })))
        .ignoreContentType(true)
        .post()
        .text()
    ).translatedText;
}
