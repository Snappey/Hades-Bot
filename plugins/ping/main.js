
// Test Module, chat module is required from another file and used here

var fs = require("fs");
var path = require('path');
var appDir = path.dirname(require.main.filename);

var chat = require( appDir + "/plugins/chat/main.js");

chat.Add("Ping", "No Args", function() {
	return "pong";
})

//chat.commands["ping"].execute();