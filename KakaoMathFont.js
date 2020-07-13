
const doubleStruck = {
    "lower": [
        "𝕒", "𝕓", "𝕔", "𝕕", "𝕖", "𝕗", "𝕘", "𝕙", "𝕚", "𝕛",
        "𝕜", "𝕝", "𝕟", "𝕞", "𝕠", "𝕡", "𝕢", "𝕣", "𝕤", "𝕥",
        "𝕦", "𝕧", "𝕨", "𝕩", "𝕪", "𝕫"
    ],
    "upper": [
        "𝔸", "𝔹", "ℂ", "𝔻", "𝔼", "𝔽", "𝔾", "ℍ", "𝕀", "𝕁", 
        "𝕂", "𝕃", "𝕄", "ℕ", "𝕆", "ℙ", "ℚ", "ℝ", "𝕊", "𝕋", 
        "𝕌", "𝕍", "𝕎", "𝕏", "𝕐", "ℤ"
    ]
}

const fraktur = {
    "upper": "𝔄 𝔅 ℭ 𝔇 𝔈 𝔉 𝔊 ℌ ℑ 𝔍 𝔎 𝔏 𝔐 𝔑 𝔒 𝔓 𝔔 ℜ 𝔖 𝔗 𝔘 𝔙 𝔚 𝔛 𝔜 ℨ".split(" "),
    "lower": "𝔞 𝔟 𝔠 𝔡 𝔢 𝔣 𝔤 𝔥 𝔦 𝔧 𝔨 𝔩 𝔪 𝔫 𝔬 𝔭 𝔮 𝔯 𝔰 𝔱 𝔲 𝔳 𝔴 𝔵 𝔶 𝔷".split(" ")
}



String.prototype.toDoubleStruck = function(){
    var result = "";
    for (var i = 0; i < this.length; i++) {
        if (this[i] >= 'a' && this[i] <= 'z') {
            result += doubleStruck.lower[this.charCodeAt(i)-'a'.charCodeAt(0)];
        }else if(this[i] >= 'A' && this[i] <= 'Z'){
            result += doubleStruck.upper[this.charCodeAt(i)-'A'.charCodeAt(0)];
        }else{
            result += this[i];
        }
    }
    return result;
}

String.prototype.toFraktur = function(){
    var result = "";
    for (var i = 0; i < this.length; i++) {
        if (this[i] >= 'a' && this[i] <= 'z') {
            result += fraktur.lower[this.charCodeAt(i)-'a'.charCodeAt(0)];
        }else if(this[i] >= 'A' && this[i] <= 'Z'){
            result += fraktur.upper[this.charCodeAt(i)-'A'.charCodeAt(0)];
        }else{
            result += this[i];
        }
    }
    return result;
}
