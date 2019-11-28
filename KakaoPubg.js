Utils.getPubg = function() {
    doc = org.jsoup.Jsoup.connect("https://pubg.op.gg/api/leaderboard/ranked-users?platform=steam&queue_size=1&mode=tpp&limit=10")
        .userAgent("Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36")
        .header("content-encoding", "gzip")
        .header("content-length", "1351")
        .header("date", "Wed, 27 Nov 2019 15:54:49 GMT")
        .header("content-encoding", "gzip")


        .header("accept-language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5")
        .header("cache-control", "max-age=0")
        .header("dnt", "1")
        .header("upgrade-insecure-requests", "1")
        .header("authority", "pubg.op.gg")
        .header("path", "/api/leaderboard/ranked-users?platform=steam&queue_size=1&mode=tpp&limit=10")
        .header("scheme", "https")
        .header("Connection", "keep-alive")
        .header("sec-fetch-mode", "navigate")
        .header("sec-fetch-site", "none")
        .header("sec-fetch-user", "?1")
        .header("upgrade-insecure-requests", "1")

        .ignoreContentType(true)
        .get();
    return doc;
}

doc = org.jsoup.Jsoup.connect("https://pubg.op.gg/api/leaderboard/ranked-users?platform=steam&queue_size=1&mode=tpp&limit=10")
    .userAgent("Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36")
    .header("content-encoding", "gzip")
    .header("content-length", "1351")
    .header("date", "Wed, 27 Nov 2019 15:54:49 GMT")
    .header("content-encoding", "gzip")


    .header("accept-language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5")
    .header("cache-control", "max-age=0")
    .header("dnt", "1")
    .header("upgrade-insecure-requests", "1")
    .header("authority", "pubg.op.gg")
    .header("path", "/api/leaderboard/ranked-users?platform=steam&queue_size=1&mode=tpp&limit=10")
    .header("scheme", "https")
    .header("Connection", "keep-alive")
    .header("sec-fetch-mode", "navigate")
    .header("sec-fetch-site", "none")
    .header("sec-fetch-user", "?1")
    .header("upgrade-insecure-requests", "1")

    .ignoreContentType(true)
    .get();
