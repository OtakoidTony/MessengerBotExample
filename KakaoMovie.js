String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest);
}

function Movie(title){
	var input_url = "https://movie.naver.com/movie/search/result.nhn?query="+title+"&section=all&ie=utf8";
	var result = Utils.getWebText(input_url);
	result = result.split("/movie/bi/mi/basic.nhn?code=")[1].split("\"")[0];
	input_url = "https://movie.naver.com/movie/bi/mi/basic.nhn?code="+result;
	result = Utils.getWebText(input_url);

	this.subtitle = result.split("<h5 class=\"h_tx_story\">")[1].split("</p>")[0].replace(/(<([^>]+)>)/g,"").replaceAll("&nbsp;", "");
	this.story = result.split("<p class=\"con_tx\">")[1].split("</p>")[0].replace(/(<([^>]+)>)/g,"").replaceAll("&nbsp;", "");
}