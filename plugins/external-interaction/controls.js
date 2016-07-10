var KEY		= "wazzup";
var CLIENTS = [];

var ctrls	= {
	"new"			: registerConnection,
	"send"	: externalMessage
};

module.exports = ctrls;

function registerConnection (res, req){

	var response	= {};
	var data		= req.parts.query;

	if (typeof(data.key) == 'undefined')
		response.err = "URL Parameters missing, key";
	else {

		console.log("Registering User:");

		if (data.key == KEY)
			response = registerUser(data);
		else {

			response.err = "Access Key Denied";
			console.error("User Rejected");

		}

	}

	res.json(response);

}

function externalMessage (res, req){

	var packet = req.parts.query;
	if (!packet.key || !packet.message) {
		throw new {
			'error'		: "Request is missing query parameters",
			'friendly'	: "URL Parameters missing, key and/or message",
			'status'	: 400
		}
	}

	console.log("Message Request Received");

	if (registeredUser(packet.key)) {
		bot.sendMessage(bot.channels[0], packet.message);
	} else {
		throw new {
			'error' : "User with key " + packet.key + " not registered",
			'friendly' : "Auth key not registered",
			'status' : 403
		}
	}

}

function registerUser (user){

	var clientKey = generateKey(10);
	CLIENTS.push(clientKey);
	return {
		'err': 'none',
		'key': clientKey
	};

}

function registeredUser (key){

	for (var eachKey in CLIENTS) {
		if (key === CLIENTS[eachKey])
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