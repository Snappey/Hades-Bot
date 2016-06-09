// +441732601009
var fs = require("fs");
var path = require('path');
var appDir = path.dirname(require.main.filename);
var twilio = require("twilio")("ACe824aa0f225223dbac895b06182b8948", "d3a74cb5dc7205b042c81e51ac4d2f61");


var chat = require( appDir + "/plugins/chat/main.js");

var contacts = [];
contacts["name"] = "number";

chat.Add("sendtxt", 1, function(str) {
	var user = str.substring(0, str.indexOf(" ") + 1).trim()	;
	var msg = str.substring(str.indexOf(" ") + 1, str.length);
	console.log(user, msg, contacts[user]);
	twilio.sendMessage({
		to: contacts[user],
		from: "+441732601009",
		body: msg + " - from 'Hades Soft Discord'"
	}, function(err, responseData) {
		console.log("running");
		if (!err) {
			console.log(responseData.from);
			console.log(responseData.body);
		} else {console.log(err);}

	});
})