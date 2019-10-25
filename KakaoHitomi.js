function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var BlackList = new Array("사용 금지할 채팅방");
    if (BlackList.indexOf(room)==-1) {
        if (msg.charAt(1) == "!" && msg.charAt(0) == "h") {
            try {
                var number = msg.split("!")[1];
                var input_url = 'https://hitomi.la/galleries/' + number + ".html";
                var data = Utils.getWebText(input_url);
                var title_before = "<h1><a href=\"/reader/" + number + ".html\">";
                var title_next = "</a></h1>";

                var artist = data.split("<ul class=\"comma-list\">")[1];
                artist = artist.replace('\n', "");
                artist = artist.split("</li>")[0].replace(/(<([^>]+)>)/g, "");
                var a = data.split(title_before)[1];
                a = a.split(title_next)[0];
                replier.reply(a);
                var i;
                while (i <= 5) {
                    artist = artist.replace('\n', "");
                    artist = artist.replace('  ', " ");
                    i = i + 1;
                }
                var tags = "";
                var TagsHtml = data.split("<td>Tags</td>")[1];
                Log.info(TagsHtml);
                TagsHtml = TagsHtml.split("<ul class=\"tags\">")[1];
                Log.info(TagsHtml);
                TagsHtml = TagsHtml.split("</ul>")[0];
                Log.info(TagsHtml);
                TagsHtml = TagsHtml.split("<li><a href=\"");

                replier.reply("작가:" + artist);
                var Tag;
                for (var j in TagsHtml) {
                    if (j != 0) {
                        if (j != TagsHtml.length - 1) {
                            Log.info(TagsHtml[j]);
                            Tag = TagsHtml[j].split(">")[1];
                            Tag = Tag.split("<")[0];
                            tags = tags + Tag + "\n";
                        } else {
                            Log.info(TagsHtml[j]);
                            Tag = TagsHtml[j].split(">")[1];
                            Tag = Tag.split("<")[0];
                            tags = tags + Tag;
                        }
                    }
                }
                replier.reply(tags);
            } catch (e) {
                Log.debug(e + ", " + e.lineNumber);
                replier.reply("없는 히토미 품번이라꾸~!");
            }
        }
    }
}
