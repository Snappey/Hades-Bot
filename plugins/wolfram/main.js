var path = require('path');
var appDir = path.dirname(require.main.filename);
var http = require("http");
var parseString = require("xml2js").parseString;

var chat = require( appDir + "/plugins/chat/main.js");

var WFAPIKEY = "API-KEY";

chat.Add("wf", 1, function(str) {

	strE = encodeURIComponent(str);
	if (strE == null || strE == "") { return "Statement not valid!"; }

	var reqOpts = {
		'host' : 'api.wolframalpha.com',
		'path' : '/v2/query?appid=' + WFAPIKEY + '&input=' + strE + '&format=image,plaintext'
	};

	http.request(reqOpts, function (res){

		var str = "";

		res.on('data', function (chunk){
			str += chunk;
		});

		res.on('end', function (){

			var xml = parseString(res, {
				'trim' : true
			}, function (err, res){
				if (err) {
					console.error(err);
					bot.sendMessage(bot.channels[0], "Error calculating answer!");
					return;
				}

				var msg		= "";
				var answer	= JSON.parse(JSON.stringify(res));

				try {
					msg += "https://www.wolframalpha.com/input/?i=" + strE + "\n";
					msg += "**Input**: " + str + "\n";
					msg += "**Output**: " + res.queryresult.pod[1].subpod[0].plaintext;
				} catch (e) {
					msg = "Wolfram query failed :(, just blame Jon";
				}

				bot.sendMessage(bot.channels[0], msg);

			});

		})

	});

})