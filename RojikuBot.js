Array.prototype.sort_by = function (name, ascending) {
    if (ascending) {
        return this.sort(function (a, b) {
            if (a[name] > b[name]) {
                return 1;
            }
            if (a[name] < b[name]) {
                return -1;
            }
            return 0;
        });
    } else {
        return this.sort(function (a, b) {
            if (a[name] > b[name]) {
                return -1;
            }
            if (a[name] < b[name]) {
                return 1;
            }
            return 0;
        });
    }
};

Array.prototype.findObjectIndex = function (label, value) {
    for (var i = 0; i < this.length; i++)
        if (this[i][label] == value) return i;
    return -1;
};

Array.prototype.findObject = function (label, value) {
    if (this.findObjectIndex(label, value) != -1) return this[this.findObjectIndex(label, value)];
    else return null;
};


var senderData = FileStream.read("sdcard/Kakao_senderData/senderData.json");
if (senderData == null) {
    senderData = {};
} else {
    senderData = JSON.parse(senderData);
}

var learned_data = {};
var learned_data_json = FileStream.read("sdcard/Kakao_Teach/learned_data.json");
if (learned_data_json == null) {
    learned_data = {};
} else {
    learned_data = JSON.parse(learned_data_json);
}

function hangang() {
    return Utils.getWebText("https://www.wpws.kr/hangang/").split("</i>")[1].split("<")[0] * 1;
}

String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest);
}


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

const teach_filter = ["凸", " 갈보", "갈보년", "강아지", "같은년", "같은뇬", "개같은", "개구라", "개년", "개놈", "개뇬", "개대중", "개독", "개돼중", "개랄", "개보지", "개뻥", "개뿔", "개새", "개새기", "개새끼", "개새키", "개색기", "개색끼", "개색키", "개색히", "개섀끼", "개세", "개세끼", "개세이", "개소리", "개쑈", " 개쇳기", "개수작", "개쉐", "개쉐리", "개쉐이", "개쉑", "개쉽", "개스끼", "개시키", "개십새기", " 개십새끼", "개쐑", "개씹", "개아들", "개자슥", "개자지", "개접", "개좆", "개좌식", "개허접", "걔새", "걔수작", "걔시끼", "걔시키", "걔썌", "걸레", "게색기", "게색끼", "광뇬", "구녕", "구라", "구멍", "그년", "그새끼", "냄비", "놈현", "뇬", "눈깔", "뉘미럴", "니귀미", "니기미", "니미", "니미랄", "니미럴", "니미씹", "니아배", "니아베", "니아비", "니어매", "니어메", "니어미", "닝기리", "닝기미", "대가리", "뎡신", "도라이", "돈놈", "돌아이", "돌은놈", "되질래", "뒈져", "뒈져라", "뒈진", "뒈진다", "뒈질", " 뒤질래", "등신", "디져라", "디진다", "디질래", "딩시", "따식", "때놈", "또라이", "똘아이", "똘아이", "뙈놈", "뙤놈", "뙨넘", "뙨놈", "뚜쟁", "띠바", "띠발", "띠불", "띠팔", "메친넘", "메친놈", "미췬", " 미췬", "미친", "미친넘", "미친년", "미친놈", "미친새끼", "미친스까이", "미틴", "미틴넘", "미틴년", " 미틴놈", "바랄년", "병자", "뱅마", "뱅신", "벼엉신", "병쉰", "병신", "부랄", "부럴", "불알", "불할", "붕가", "붙어먹", "뷰웅", "븅", "븅신", "빌어먹", "빙시", "빙신", "빠가", "빠구리", "빠굴", "빠큐", "뻐큐", "뻑큐", "뽁큐", "상넘이", "상놈을", "상놈의", "상놈이", "새갸", "새꺄", "새끼", "새새끼", "새키", "색끼", "생쑈", "세갸", "세꺄", "세끼", "섹스", "쇼하네", "쉐", "쉐기", "쉐끼", "쉐리", "쉐에기", "쉐키", "쉑", "쉣", "쉨", "쉬발", "쉬밸", "쉬벌", "쉬뻘", "쉬펄", "쉽알", "스패킹", "스팽", "시궁창", "시끼", "시댕", "시뎅", "시랄", "시발", "시벌", "시부랄", "시부럴", "시부리", "시불", "시브랄", "시팍", "시팔", "시펄", "신발끈", "심발끈", "심탱", "십8", "십라", "십새", "십새끼", "십세", "십쉐", "십쉐이", "십스키", "십쌔", "십창", "십탱", "싶알", "싸가지", "싹아지", "쌉년", "쌍넘", "쌍년", "쌍놈", "쌍뇬", "쌔끼", " 쌕", "쌩쑈", "쌴년", "썅", "썅년", "썅놈", "썡쇼", "써벌", "썩을년", "썩을놈", "쎄꺄", "쎄엑", " 쒸벌", "쒸뻘", "쒸팔", "쒸펄", "쓰바", "쓰박", "쓰발", "쓰벌", "쓰팔", "씁새", "씁얼", "씌파", "씨8", " 씨끼", "씨댕", "씨뎅", "씨바", "씨바랄", "씨박", "씨발", "씨방", "씨방새", "씨방세", "씨밸", "씨뱅", "씨벌", "씨벨", "씨봉", "씨봉알", "씨부랄", "씨부럴", "씨부렁", "씨부리", "씨불", "씨붕", "씨브랄", " 씨빠", "씨빨", "씨뽀랄", "씨앙", "씨파", "씨팍", "씨팔", "씨펄", "씸년", "씸뇬", "씸새끼", "씹같", "씹년", "씹뇬", "씹보지", "씹새", "씹새기", "씹새끼", "씹새리", "씹세", "씹쉐", "씹스키", "씹쌔", "씹이", "씹자지", "씹질", "씹창", "씹탱", "씹퇭", "씹팔", "씹할", "씹헐", "아가리", "아갈", "아갈이", "아갈통", "아구창", "아구통", "아굴", "얌마", "양넘", "양년", "양놈", "엄창", "엠병", "여물통", "염병", "엿같", "옘병", "옘빙", "오입", "왜년", "왜놈", "욤병", "육갑", "은년", "을년", "이년", "이새끼", "이새키", "이스끼", "이스키", "임마", "자슥", "잡넘", "잡년", "잡놈", "저년", "저새끼", "접년", "젖밥", "조까", "조까치", "조낸", "조또", "조랭", "조빠", "조쟁이", "조지냐", "조진다", "조찐", "  조질래", "존나", "존나게", "존니", "존만", " 존만한", "좀물", "좁년", "좆", "좁밥", "좃까", "좃또", "좃만", "좃밥", "좃이", "좃찐", "좆같", "좆까", "좆나", "좆또", "좆만", "좆밥", "좆이", "좆찐", "좇같", "좇이", "좌식", "주글", "주글래", "주데이", "주뎅", "주뎅이", "주둥아리", "주둥이", "주접", "주접떨", "죽고잡", "죽을래", "죽통", "쥐랄", "쥐롤", "쥬디", "지랄", "지럴", "지롤", "지미랄", "짜식", "짜아식", "쪼다", "쫍빱", "찌랄", "창녀", "캐년", "캐놈", "캐스끼", "캐스키", "캐시키", "탱구", "팔럼", "퍽큐", "호로", "호로놈", "호로새끼", "호로색", "호로쉑", "호로스까이", "호로스키", "후라들", "후래자식", "후레", "후뢰", "씨ㅋ발", "ㅆ1발", "씌발", "띠발", "띄발", "뛰발", "띠ㅋ발", "뉘뮈", "씹뜨억", "씹떡", "씹덕", "페도"];

var vb = Api.getContext().getSystemService(android.content.Context.VIBRATOR_SERVICE);

var isOn = {
    'teach': true,
    'vibrate': true
};

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (!(room in senderData)) {
        senderData[room] = [];
    }
    if (senderData[room].findObjectIndex('name', sender) == -1) {
        senderData[room].push({
            'name': sender,
            'score': 1
        });
    } else {
        senderData[room].findObject('name', sender)['score'] += 1;
    }

    if (msg in learned_data && isOn.teach) {
        replier.reply(learned_data[msg]["returns"]);
    }

    var msg_arg = msg.split(' ');
    if (msg_arg[0] == "call" || msg_arg[0] == "Call") {
        if (msg_arg[1] == "rojiku") {
            if (msg_arg[2] == "connect" && msg_arg[3] == "console") {
                if (msg_arg[4] == "switch") {
                    if (msg_arg[5] == "teach") {
                        if (sender.indexOf("로지꾸") != -1) {
                            if (msg_arg[6] == "off") {
                                isOn.teach = false;
                                replier.reply("Teaching System Value is set to false.");
                            } else if (msg_arg[6] == "on") {
                                isOn.teach = true;
                                replier.reply("Teaching System Value is set to true.");
                            } else {
                                replier.reply("SYSTEM ALERT:\nIllegal Argument Exception");
                            }
                        }
                    }

                    if (msg_arg[5] == "vibrate") {
                        if (sender.indexOf("로지꾸") != -1) {
                            if (msg_arg[6] == "off") {
                                isOn.vibrate = false;
                                replier.reply("Vibrate System Value is set to false.");
                            } else if (msg_arg[6] == "on") {
                                isOn.vibrate = true;
                                replier.reply("Vibrate System Value is set to true.");
                            } else {
                                replier.reply("SYSTEM ALERT:\nIllegal Argument Exception");
                            }
                        }
                    }
                }
            }
            if (msg_arg[2] == "teach" && isOn.teach) {
                teach_content = msg.substring((msg_arg[0] + ' ' + msg_arg[1] + ' ' + msg_arg[2] + ' ').length, msg.length);
                var test = teach_content;
                for (var i in teach_filter)
                    test = test.replace(teach_filter[i], '');
                if (test == teach_content) {
                    learned_data[command(msg)[1].split("=")[0]] = {
                        "trainer": sender,
                        "returns": command(msg)[1].split("=")[1]
                    };
                    FileStream.write("sdcard/Kakao_Teach/learned_data.json", JSON.stringify(learned_data, null, '\t'));
                    replier.reply("A new word has been successfully registered in the Rojiku database.");
                }
            }
            if (msg_arg[2] == "search") {
                if (msg_arg[3] == "hangang" && msg_arg[4] == "temperature") {
                    replier.reply(hangang() + "°C");
                }
                if (msg_arg[3] == "hitomi") {
                    if (!isNaN(msg_arg[4])) {
                        try {
                            var result = new Hitomi(msg_arg[4]);
                            replier.reply(result.title);
                            replier.reply(result.artist);
                            replier.reply(result.tags);
                        } catch (e) {
                            replier.reply("SYSTEM ALERT:\nCannot Connect To Hitomi")
                        }
                    } else {
                        replier.reply("SYSTEM ALERT:\nIllegal Argument Exception");
                    }
                }
            }
            if (msg_arg[2] == "inspect") {
                if (msg_arg[3] == "battery") {
                    var res = "Current remaining battery level:\n" + Device.getBatteryLevel() + "%\n\n";
                    res += "Current battery temperature:\n" + Device.getBatteryTemperature() / 10 + "°C\n\n";
                    res += "Current battery Voltage:\n" + Device.getBatteryVoltage() + "mV";
                    replier.reply(res);
                }
                if (msg_arg[3] == "ranking") {
                    if (msg_arg[4] == "system") {
                        if (msg_arg[5] == "select") {
                            var user_name = msg.substring((msg_arg[0] + ' ' + msg_arg[1] + ' ' + msg_arg[2] + ' ' + msg_arg[3] + ' ' + msg_arg[4] + ' ' + msg_arg[5] + ' ').length, msg.length);
                            senderData[room].sort_by('score', ascending = false);
                            var user_index = senderData[room].findObjectIndex('name', user_name);
                            if (user_index == -1) {
                                replier.reply("SYSTEM ALERT:\nIndex Out Of Bounds Exception")
                            } else {
                                var output = ''
                                output += 'Name: ' + senderData[room][user_index].name + '\n';
                                output += 'Time: ' + senderData[room][user_index].score + '\n';
                                output += 'Rank: ' + (user_index + 1);
                                replier.reply(output);
                            }
                        }

                    }
                }
            }
            if (msg_arg[2] == "vibrate"&&isOn.vibrate) {
                if (msg_arg.length == 3) {
                    vb.vibrate(1000);
                } else {
                    if (msg_arg.length == 4) {
                        if (!isNaN(msg_arg[3])) {
                            if (msg_arg[3] > 5) {
                                replier.reply("SYSTEM ALERT:\nIllegal Argument Exception");
                            } else {
                                vb.vibrate(1000 * msg_arg[3]);
                            }
                        } else {
                            replier.reply("SYSTEM ALERT:\nIllegal Argument Exception");
                        }
                    }
                }
            }
            if (msg_arg[2] == "display") {

                if (msg_arg[3] == "ranking" && msg_arg[4] == "system") {
                    if (msg_arg.length == 5) {
                        senderData[room].sort_by('score', ascending = false);
                        var output = '';
                        for (var i = 0; i < senderData[room].length; i++) {
                            output += 'Name: ' + senderData[room][i].name + '\n';
                            if (i == senderData[room].length - 1) {
                                output += 'Time: ' + senderData[room][i].score;
                            } else {
                                output += 'Time: ' + senderData[room][i].score + '\n\n';
                            }
                        }
                        replier.reply(output);
                    } else {
                        if (msg_arg[5] == "head" && msg_arg.length == 7) {
                            if (!isNaN(msg_arg[6])) {
                                senderData[room].sort_by('score', ascending = false);
                                var head = senderData[room].slice(0, parseInt(msg_arg[6]));
                                var output = '';
                                for (var i = 0; i < head.length; i++) {
                                    output += 'Name: ' + head[i].name + '\n';
                                    if (i == head.length - 1) {
                                        output += 'Time: ' + head[i].score;
                                    } else {
                                        output += 'Time: ' + head[i].score + '\n\n';
                                    }
                                }
                                replier.reply(output);
                            } else {
                                replier.reply("SYSTEM ALERT:\nIllegal Argument Exception");
                            }
                        }
                    }
                }

                if ((msg_arg[3] == "author" || msg_arg[3] == "developer") && msg_arg.length == 4) {
                    replier.reply("This Bot is developed by Rojiku.");
                }

            }
        }
    }
    FileStream.write("sdcard/Kakao_senderData/senderData.json", JSON.stringify(senderData, null, '\t'));
}
