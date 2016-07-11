var http	= require('http');

var router	= require('./router');
var chat	= require('../chat/main');

chat.Add("heylisten", 0, function (){

	console.log("API Starting");

	http.createServer(router.route)
	.listen(3000);

	console.log("API Running");

})
