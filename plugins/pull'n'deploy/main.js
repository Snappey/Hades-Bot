var fs = require("fs");
var path = require('path');
var appDir = path.dirname(require.main.filename);
var exec = require('child_process').exec;

var chat = require( appDir + "/plugins/chat/main.js");

chat.Add("pull'n'deploy", 0, function() {
	exec("/root/deploy.sh");
})