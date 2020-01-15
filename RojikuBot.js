var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

function save(folderName, fileName, str) {
    var c = new java.io.File(sdcard + "/" + folderName + "/" + fileName);
    var d = new java.io.FileOutputStream(c);
    var e = new java.lang.String(str);
    d.write(e.getBytes());
    d.close();
}

function read(folderName, fileName) {
    var b = new java.io.File(sdcard + "/" + folderName + "/" + fileName);
    if (!(b.exists())) return null;
    var c = new java.io.FileInputStream(b);
    var d = new java.io.InputStreamReader(c);
    var e = new java.io.BufferedReader(d);
    var f = e.readLine();
    var g = "";
    while ((g = e.readLine()) != null) {
        f += "\n" + g;
    }
    c.close();
    d.close();
    e.close();
    return f.toString();
}

function hangang() {
    return Utils.getWebText("https://www.wpws.kr/hangang/").split("</i>")[1].split("도")[0] * 1;
}

/**
 * Hitomi.la Crawling Object
 * 
 * This object includes only string datas because there
 * is no function about crawling gallery images because
 * KakaoTalk does not support sending images API that
 * can use in open chat service.
 * 
 * @param {string} gallery_id
 */
function Hitomi(gallery_id) {
    var input_url = 'https://hitomi.la/galleries/' + gallery_id + ".html";
    var data = Utils.getWebText(input_url);
    /* --[ hitomi.la href patch ]------------------------------- */
    input_url = data.split("a href=\"")[1].split("\">link")[0];
    data = Utils.getWebText(input_url);
    /* --------------------------------------------------------- */
    this.artist = data.split("<ul class=\"comma-list\">")[1]
        .replace('\n', "").split("</li>")[0]
        .replace(/(<([^>]+)>)/g, "")
        .replaceAll('\n', "")
        .replaceAll('  ', " ");
    this.title = data.split("<h1><a href=\"/reader/" + gallery_id + ".html\">")[1]
        .split("</a></h1>")[0];
    var TagsHtml = data.split("<td>Tags</td>")[1]
        .split("<ul class=\"tags\">")[1]
        .split("</ul>")[0]
        .split("<li><a href=\"");
    var tags = "";
    for (var j in TagsHtml) {
        if (j != 0) {
            if (j != TagsHtml.length - 1) {
                tags = tags + TagsHtml[j].split(">")[1].split("<")[0]; + "\n";
            } else {
                tags = tags + TagsHtml[j].split(">")[1].split("<")[0];
            }
        }
    }
    this.tags = tags;
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg == ":한강온도") {
        replier.reply("지금, 한강 온도는 " + hangang() + "°C 이라꾸~!");
    }
}