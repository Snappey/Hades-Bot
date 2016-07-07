var Socket	= require('socket.io');

var chat	= require("../chat/main.js");

var KEY = "wazzup";

var io = Socket();
var clients = [];

io.on('connect', function (){
	console.log("Socket: Incomming Connection");
});

io.sockets.on('connection', function (socket){

	socket.on('register', function (data){

		var responce = {};

		console.log("Registering User:");
		console.dir(data);

		if (data.key == KEY)
			responce = registerUser(data);
		else {
			responce.err = "Access Key Denied";
			console.error("User Rejected");
		}

		io.to(data.cid).emit('confirm', responce);

	});

	socket.on('external-message', function (packet){

		if (registeredUser(packet.key)) {

			bot.sendMessage(bot.channels[0], packet.message);
			
		}

	});

});

io.listen(3000);

function registerUser (user){

	var clientKey = generateKey(10);
	clients.push(clientKey);
	return {
		'err': 'none',
		'key': clientKey
	};

}

function registeredUser (key){

	for (keys in clients) {
		if (key === keys)
			return true;
	}

	return false;

}

function generateKey (length){

	var key = "";

	for (var i = 0; i < length; i++) {
		var ascIndx = Math.floor(Math.random() * 25) + 65;
		key 		+= String.fromCharCode(ascIndx);
	}

	return key;

}