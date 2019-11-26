const numbers = ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "십"];
const gwa_han = ["삼팔광땡", "일팔광땡", "일삼광땡"];
const spe_han = ["암행어사", "땡잡이", "사구"];
const mid_han = ["알리", "독사", "구삥", "장삥", "장사", "세륙"];
const gwang_tenn = [
    [3, 8], /* 삼팔광땡 */
    [1, 8], /* 일팔광땡 */
    [1, 3]  /* 일삼광땡 */
];
const special = [
    [4, 7], /* 암행어사 */
    [3, 7], /*  땡잡이  */
    [4, 9]  /*   사구   */
];
const middle = [
    [1, 02], /*  알리   */
    [1, 04], /*  독사   */
    [1, 09], /*  구삥   */
    [1, 10], /*  장삥   */
    [4, 10], /*  장사   */
    [4, 06]  /*  세륙   */
];


function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (msg == "섯다") {
        var dices1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var dices2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var str = "패를 쪼읍니다...\n" + sender + "님의 패는\n🎴" + dice[0] + "🎴" + dice[1] + "\n";
        var dice = [dices1[Math.floor(Math.random() * dices1.length)], dices2[Math.floor(Math.random() * dices2.length)]];
        var dice_sort = dice;
        dice_sort.sort();
        if (dice_sort in gwang_tenn || dice_sort in special || dice_sort in middle) {
            if (dice_sort in gwang_tenn) {
                replier.reply(str + gwa_han[gwang_tenn.indexOf(dice_sort)] + "입니다.");
            }
            if (dice_sort in special) {
                replier.reply(str + spe_han[special.indexOf(dice_sort)] + "입니다.");
            }
            if (dice_sort in middle) {
                replier.reply(str + mid_han[middle.indexOf(dice_sort)] + "입니다.");
            }
        } else {
            var dice_kkut = (dice[0] + dice[1]) % 10;
            replier.reply(str + numbers[dice_kkut] + "입니다.");
        }
    }
}
