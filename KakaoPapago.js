papago = function(source, target, text) {
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
