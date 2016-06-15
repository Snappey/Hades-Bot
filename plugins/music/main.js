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
	console.log(uri != null, cntcn != null);
	console.log(cntcn.playing, cntcn.server)
	//if (cntcn != null && uri != null && uri != "") {return;}
	cntcn.setSpeaking(true);
	cntcn.playFile("F:\\rhcp.wav")

})