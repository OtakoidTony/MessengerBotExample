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

function inSentence(sentence, word){
    var wordList = sentence.split(word);
    return wordList.length-1
}

