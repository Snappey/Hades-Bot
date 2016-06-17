var path = require('path');
var appDir = path.dirname(require.main.filename);

var chat = require( appDir + "/plugins/chat/main.js");

var cntcn;

chat.Add("join-voice", 0, function() {
	bot.joinVoiceChannel(bot.channels[1], function(_,chnl) {cntcn = chnl;})
})

chat.Add("leave-voice", 0, function() {
	bot.leaveVoiceChannel(bot.channels[1], function() {cntcn = null;})
})

chat.Add("play", 1, function(uri) {
	console.log(cntcn != null);
	//if (cntcn != null && uri != null && uri != "") {return;}
	cntcn.playRawStream("http://82.36.154.13:8000/live", {}, function(a,b,c) {
			console.log(a)
			console.log(a.isPaused());
			a.resume();
			console.log(a.isPaused());
			a.error = function(err) {
				console.log(err);
			}
	})

})