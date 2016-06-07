var fs = require("fs");
var path = require('path');
var appDir = path.dirname(require.main.filename);
var http = require("http");
var request= require("sync-request");

var chat = require( appDir + "/plugins/chat/main.js");

var yt_opts = {
	host: "https://www.googleapis.com",
	path: "/youtube/v3/search?part=snippet&maxResults=10&key=<your api key>&q="
}

function Search(str) {
	var res = request("GET", yt_opts["host"] + yt_opts["path"] + str);
	var body = JSON.parse(res.getBody().toString());

	var video;
	for(var i=0; i < 10; i++) { // Max results are hardcoded to 10
		if (body["items"][i]["id"]["kind"] == "youtube#video") {
			video = body["items"][i]["id"]["videoId"];
			break;
		}
	}
	if (video == null) { return "";}
	return "https://www.youtube.com/watch?v=" + video;
}

chat.Add("yt", 1, function(str) {
	return Search(str);
});

chat.Add("youtube", 1, function(str) {
	return Search(str);
});
