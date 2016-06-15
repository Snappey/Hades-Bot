var path = require('path');
var appDir = path.dirname(require.main.filename);

var chat = require( appDir + "/plugins/chat/main.js");
var remindmes = {};

function FormatTime(str) {
	var type = str.substring(str.length-1, str.length);
	var len = str.substring(0, str.length-1);
	var time = "";
	if (type == "s") {
		time = len * 1000
	} else if (type == "m") {
		time = len * 1000 * 60
	} else if (type == "h") {
		time = len * 1000 * 60 * 60
	} else
	{
		time = len * 1000 * 60; // Default to minutes if the time format isnt given
		bot.sendMessage(bot.channels[0], "Invalid or no time format stated (s,m,h)! Default to minutes!" );
	}
	return time;
}

chat.Add("remind", 1, function(msg) {
	var time = msg.substring(0, msg.indexOf(" "));
	var msg = msg.substring(msg.indexOf(" "), msg.length)
	var delay = FormatTime(time);

	remindmes[msg] = delay;
	setTimeout(function() {
		console.log("This ran! " + msg + " : " + delay)
		bot.sendMessage(bot.channels[0], msg)
	}, delay)
	bot.sendMessage(bot.channels[0], "RemindMe Scheduled!");

})

chat.Add("getreminders", 0, function() {
	var str = "";
	for (var k in remindmes) {
		if (remindmes.hasOwnProperty(k)) {
			kEsc = k.replace("@", "(@)");
			str += kEsc + " : " + remindmes[k];
		}
	}
	return str;
})