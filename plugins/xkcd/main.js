var path = require('path');
var appDir = path.dirname(require.main.filename);
var http = require("http");
var request= require("sync-request");
var cron = require("node-schedule");

var chat = require( appDir + "/plugins/chat/main.js");

var host = "http://xkcd.com/";

chat.Add("xkcd", 1, function(num) {
	if (/^\d+$/.test(num)) {
		try {
			var res = JSON.parse(request("GET", host + num + "/info.0.json").getBody().toString());
			var str = "";
			str += "\n**" + res.safe_title + "**\n";
			str += "'" + res.alt + "'\n";
			str += res.img;
			return str;
		} catch(err) {
			return "Error occured! Comic could not be retrieved!"
		}
	}
	else
	{
		try {
		var res = JSON.parse(request("GET", host + "/info.0.json").getBody().toString());
		var str = "";
		str += "\n**" + res.safe_title + "**\n";
		str += "'" + res.alt + "'\n";
		str += res.img;
		return str;
		} catch(err) {
			return "Error occured! Comic could not be retrieved!"
		}
	}
})

var rule = new cron.RecurrenceRule();
rule.dayOfWeek = [1, 3, 5];
rule.hour = 10;
rule.minute = 0;
var daily = cron.scheduleJob(rule, function() {
	try {
	var res = JSON.parse(request("GET", host + "/info.0.json").getBody().toString());
	var str = "";
	str += "\n**" + res.safe_title + "**\n";
	str += "'" + res.alt + "'\n";
	str += res.img;
	bot.sendMessage(bot.channels[0], str);
	} catch(err) {
		return "Error occured! Comic could not be retrieved!"
	}
})
