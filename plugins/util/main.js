var fs = require("fs")
var path = require('path');
var appDir = path.dirname(require.main.filename);

var chat = require( appDir + "/plugins/chat/main.js");


chat.Add("prune", 2, function(username, msgcount) {

	if (username == null) {username = bot.user.username;}
	if (msgcount == null) {msgcount = 10;}
	var arr = []; arr.push(bot.channels[0].lastMessageID); // Need to workout how to define the value inside the array on declaration
	var obj = bot.getChannelLogs(bot.channels[0], msgcount, arr, function(err,msg) {
		for (var i = msg.length - 1; i >= 0; i--) {
			if(msg[i].author.username == username) {
				bot.deleteMessage(msg[i]);
			};
		};
	});
})

chat.Add("purge", 1, function(msgcount) {
	if (msgcount == null) {msgcount = 5;}
	var arr = []; arr.push(bot.channels[0].lastMessageID);
	var obj = bot.getChannelLogs(bot.channels[0], msgcount, arr, function(err,msg) {
		console.log(msg[1], msg.length - 1);
		for (var i = 0; i < msg.length - 1; i++) {
			bot.deleteMessage(msg[i]);
		};
	});
})

chat.Add("github", 0, function() {
	return "https://github.com/Snappey/Hades-Bot";
})

chat.Add("tts", 1, function(str) {
	if (str == "on") {
		bot.ctts= true;
		return "CBot TTS: On";
	} else if (str == "off") {
		bot.ctts = false;
		return "CBOT_TTS: Off";
	};
	return "CBOT_TTS: " + bot.ctts;
})

chat.Add("help", 1, function(cmd) {
	if (cmd == null || cmd == "") {
		var str = "List of usable commands:";
		for(var k in chat.commands) {
			str += "\n\t" + k + ",";
		}
		str += "\n End of usable commands"
		return str 
	}
	else {
		for (var k in chat.commands) {
			if (k == cmd) {
				return "Command: " + k + " is usable!";
			}
		}
		return "Command: " + cmd + " was not found!";
	}
})

chat.Add("plugins", 1, function(plugin) {
	var pluginDirs = fs.readdirSync(appDir  + "/plugins/");
	if (plugin == null || plugin == "") {
		var str = "List of installed plugins:";
		for(var i=0; i < pluginDirs.length; i++) {
			str += "\n\t" + pluginDirs[i] + ",";
		}
		str += "\n End of installed plugins"
		return str
	} 
	else {
		for(var i=0; i < pluginDirs.length; i++) {
			if (pluginDirs[i] == plugin) {
				return "Plugin: " + pluginDirs[i] + " is installed!";
			}
		}
		return "Plugin: " + plugin + " is not installed!";
	}
})