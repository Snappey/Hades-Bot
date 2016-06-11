var path = require('path');
var appDir = path.dirname(require.main.filename);
var cron = require("node-schedule");

var chat = require( appDir + "/plugins/chat/main.js");

function FormatToDate(str) {
	console.log(str)
	var type = str.search("/[a-z]/i")
	console.log(str, type)	
}

chat.Add("remind", 1, function(msg) {
	var time = msg.substring(0, msg.indexOf(" "));
	var msg = msg.substring(msg.indexOf(" "), msg.length)

	FormatToDate(time);

})