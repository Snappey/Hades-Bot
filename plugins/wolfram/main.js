var path = require('path');
var appDir = path.dirname(require.main.filename);
var http = require("http");
var request= require("sync-request");
var parseString = require("xml2js").parseString;

var chat = require( appDir + "/plugins/chat/main.js");

var WFAPIKEY = "XKWPAE-Q7XXVQE4PT";


chat.Add("wf", 1, function(str) {
	if (str == null || str == "") { return "Statement not valid!"; }
	var res = request("GET", "http://api.wolframalpha.com/v2/query?appid=" + WFAPIKEY + "&input=" + str + "&format=image,plaintext").getBody().toString();
	var xml = parseString(res, {trim: true}, function(err, res) {
		if (!err) {
			var str = "";
			var res = JSON.parse(JSON.stringify(res));
			console.log(res.queryresult["pod"]);
		}
	});
})