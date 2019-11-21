/*문장 내 띄어쓰기를 기준으로한 단어별 갯수 */
function numberOf(sentence){
    var wordList = sentence.split(" ");
    var numberList = {};
    for (var i in wordList){
        numberList[wordList[i]] = 0;
    }
    var j = 0;
    while (j < wordList.length){
        numberList[wordList[j]]=numberList[wordList[j]]+1;
        j=j+1;
    }
    return numberList;
}

/* sentence에서 word가 출현되는 횟수 */
function inSentence(sentence, word){
    var wordList = sentence.split(word);
    return wordList.length-1;
}

/* 단어 뭉치 */
var wordKind = ["로리", "수학", "공학", "논리", "법령", "근거", "조사", ,,, ];

function extractSize(sentence){
    var number = {};
    for ( var i in wordKind ){
        number[wordKind[i]]=inSentence(sentence, wordKind[i]);
    }
    return number;
}
        
