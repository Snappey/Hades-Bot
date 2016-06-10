var path = require('path');
var appDir = path.dirname(require.main.filename);
var http = require("http");
var request= require("sync-request");
var parseString = require("xml2js").parseString;

var chat = require( appDir + "/plugins/chat/main.js");

var WFAPIKEY = "API-KEY";

chat.Add("wf", 1, function(str) {
	strE = encodeURIComponent(str);
	if (strE == null || strE == "") { return "Statement not valid!"; }
	var res = request("GET", "http://api.wolframalpha.com/v2/query?appid=" + WFAPIKEY + "&input=" + strE + "&format=image,plaintext").getBody().toString();
	var xml = parseString(res, {trim: true}, function(err, res) {
		if (!err) {
			var msg = "";
			var res = JSON.parse(JSON.stringify(res));
			msg += "https://www.wolframalpha.com/input/?i=" + strE + "\n";
			msg += "**Input**: " + str + "\n";
			msg += "**Output**: " + res.queryresult["pod"][1]['subpod'][0]["plaintext"];
			bot.sendMessage(bot.channels[0], msg)
		}
	});
})