var fs = require("fs");
var path = require('path');
var appDir = path.dirname(require.main.filename);
var exec = require('child_process').exec;

var chat = require( appDir + "/plugins/chat/main.js");

chat.Add("pullndeploy", 0, function() {
	console.log("I'll be right back!");
	exec("/root/deploy.sh", function(err,stdout,stdin) {
		console.log("stdout: " + stdout);
		console.log("stdin: " + stdin);
		if (err !==  null) {
			console.log("error: " + err);
		}
	});
})