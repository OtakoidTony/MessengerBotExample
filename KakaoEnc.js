charToCode = function(str) {
  if (!str) return false; // Escaping if not exist
  var unicode = '';
  for (var i = 0, l = str.length; i < l; i++) {
    unicode += '\\' + str[i].charCodeAt(0).toString(2);
  };
  return unicode;
}

charToCode = function(str) {
  if (!str) return false; // Escaping if not exist
  var unicode = '';
  for (var i = 0, l = str.length; i < l; i++) {
    unicode += str[i].charCodeAt(0).toString(2);
  };
  return unicode;
}

charToUnicode = function(str) {
  if (!str) return false; // Escaping if not exist
  var unicode = '';
  for (var i = 0, l = str.length; i < l; i++) {
    unicode += str[i].charCodeAt(0).toString(16);
  };
  return unicode;
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if(msg.substring(0,3)=="enc!"){
        var input=msg.substring(4,msg.length-1);
        
