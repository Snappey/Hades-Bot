var http	= require('http');

var router	= require('./router');

http.createServer(router.route)
.listen(3000);

console.log("API Running");