var File = java.io.File;

function listFiles(path){
    let file = new File(path);
    if (file.isDirectory()) {
        let f_list = file.list();
        var result = [];
        for (let i = 0; i < f_list.length; i++) {
            result.push(f_list[i]);
        }
        return result;
    } else {
        return null;
    }
}


dfs = (path, filetype, number, depth, last, old) => {
    let chars = "━┏┣┗┃".split("");
    let file = new File(path);
    var name = file.getName();
    var result = 0;
    var temp = chars[4].repeat(depth) + (last ? chars[3] : chars[2]) + name + "\n";
    var number_temp = number;
    if (file.isDirectory()) {
        var temp_b = listFiles(path).filter(word => word.slice(word.length - 3, word.length) == filetype);
    }
    if (name.slice(name.length - 3, name.length) == filetype || (file.isDirectory() && (temp_b.length != 0) && (typeof temp !== 'undefined'))) {
        if (file.isDirectory()) {
            result = temp;
            number = 1;
        }else{
            result = chars[4].repeat(depth) + (last ? chars[3] : chars[2]) + number.toString() + " : " + name + "\n";
            var number_temp = number + 1;
        }
    } else {
        result = old;
        if (typeof old == 'undefined') {
            result = "";
        }
    }
    if (file.isDirectory()) {
        let list = file.listFiles();
        for (let i = 0; i < list.length; i++) {
            var result_old = old;
            result += dfs(list[i].getAbsolutePath(), filetype, number_temp, depth + 1, i == list.length - 1, result_old);
        }
    }
    if (typeof result == 'undefined') {
        return old;
    } else {
        return result;
    }
}
dfs("sdcard", "mp3", 1, 0);



