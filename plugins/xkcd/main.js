var path = require('path');
var appDir = path.dirname(require.main.filename);
var http = require("http");
var request= require("sync-request");

var chat = require( appDir + "/plugins/chat/main.js");

chat.Add("xkcd", 1, function(num) {
	if (/^\d+$/.test(num)) {
		return "http://xkcd.com/" + num;
	}
})