
var SlotIcon = new Array("7️⃣","🍇","🍒","🍈","🍑");

function randomItem(a) {
  return a[java.lang.Math.floor(java.lang.Math.random() * a.length)];
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg.substring(0, 5) == "slot!") {
        var playerSlot = new Array();
        var i = 1;
        while (i<=9){
            playerSlot.push(randomItem(SlotIcon));
            i=i+1;
        }
        var player = playerSlot[0]+playerSlot[1]+playerSlot[2]+'\n';
        player = player + playerSlot[3]+playerSlot[4]+playerSlot[5]+'\n';
        player = player + playerSlot[6]+playerSlot[7]+playerSlot[8];
        var score=0;
        if (playerSlot[0]==playerSlot[4] && playerSlot[4]==playerSlot[8]){
            score=score+1;
        }
        if (playerSlot[1]==playerSlot[4] && playerSlot[4]==playerSlot[7]){
            score=score+1;
        }
        if (playerSlot[2]==playerSlot[4] && playerSlot[4]==playerSlot[6]){
            score=score+1;
        }
        if (playerSlot[0]==playerSlot[1] && playerSlot[1]==playerSlot[2]){
            score=score+1;
        }
        if (playerSlot[3]==playerSlot[4] && playerSlot[4]==playerSlot[5]){
            score=score+1;
        }
        if (playerSlot[6]==playerSlot[7] && playerSlot[7]==playerSlot[8]){
            score=score+1;
        }
        if (playerSlot[0]==playerSlot[3] && playerSlot[3]==playerSlot[6]){
            score=score+1;
        }
        if (playerSlot[2]==playerSlot[5] && playerSlot[5]==playerSlot[8]){
            score=score+1;
        }
        replier.reply(player);
        replier.reply(score);
    }
}
