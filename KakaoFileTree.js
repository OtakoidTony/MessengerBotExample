var File = java.io.File;

dfs = (path, depth, last, old, filetype) => {
let chars = "━┏┣┗┃".split("");
   let file = new File(path);
   var name = file.getName();
   var result = 0;
   var temp = chars[4].repeat(depth) + (last ? chars[3] : chars[2]) + name + "\n";
   if (name.slice(name.length-3,name.length)=="mp3"||(file.isDirectory()&&(typeof temp !== 'undefined'))){
      result = temp;
   } else {
      result = old;
      if (typeof old == 'undefined'){
         result = "";
      }
   }
   if (file.isDirectory()) {
      let list = file.listFiles();
      for (let i = 0; i < list.length; i ++){
         var result_old = old;
         result += dfs(list[i].getAbsolutePath(), depth + 1, i == list.length - 1, result_old, filetype);
      }
   }
   if (typeof result == 'undefined'){
      return old;
   }else{
      return result;
   }
}

listFiles = (path)=> {
   let file = new File(path);
   if (file.isDirectory()) {
      let f_list = file.list();
      var result = [];
      var i = 0;
      whlie (i<f_list.length){
         result.push(f_list[i]);
         i=i+1;
      }
      return result;
   }else{
      return null;
   }
}
   
