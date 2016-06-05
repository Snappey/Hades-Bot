
var path = require('path');
var appDir = path.dirname(require.main.filename);

var chat = require( appDir + "/plugins/chat/main.js");


chat.Add("prune", "prune <user>", function(username, msgcount) {

	if (username == null) {username = bot.user.username;}
	if (msgcount == null) {msgcount = 10;}
	console.log(username, msgcount)
	var arr = []; arr.push(bot.channels[0].lastMessageID); // Need to workout how to define the value inside the array on declaration
	var obj = bot.getChannelLogs(bot.channels[0], msgcount, arr, function(err,msg) {
		for (var i = msg.length - 1; i >= 0; i--) {
			if(msg[i].author.username == username) {
				bot.deleteMessage(msg[i]);
			};
		};
	});
})

chat.Add("purge", "No Args", function(msgcount) {
	if (msgcount == null) {msgcount = 5;}
	var arr = []; arr.push(bot.channels[0].lastMessageID);
	var obj = bot.getChannelLogs(bot.channels[0], msgcount, arr, function(err,msg) {
		console.log(msg[1], msg.length - 1);
		for (var i = 0; i < msg.length - 1; i++) {
			bot.deleteMessage(msg[i]);
		};
	});
})