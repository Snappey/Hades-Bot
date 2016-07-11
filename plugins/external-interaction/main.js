var http	= require('http');
var path 	= require('path');

var appDir	= path.dirname(require.main.filename);
var router	= require(appDir + '/plugins/external-interaction/router.js');
var chat	= require( appDir + "/plugins/chat/main.js");

chat.Add("heylisten", 0, function (){

	console.log("API Starting");

	http.createServer(router.route)
	.listen(3000);

	console.log("API Running");

})
