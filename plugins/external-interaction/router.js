var url			= require('url');
var Router		= require('router');

var handler		= require('./controls');
var API			= require('./api');

var apiTree		= {
	"v1" : {
		"register"	: {
			"new"	: "Register a new connection with bot"
		},
		"message"	: {
			"send"	: "Send a message to chat"
		}
	}
};
var exports		= {};

var interface	= new API(handler, apiTree);
interface.expandRoute("api");

var router		= Router({
	'mergeParams' : true
});
router			= interface.buildRouter(router);
console.log("router ready");

exports.route	= function (req, res){

	req.parts		= url.parse(req.url, true);

	// var path	= req.url.pathname;
	// var match	= router.match(path);

	// console.log("Routing" + req.url.href);

	// match.fn(req, res, match);
	router(req, res, function (err){
		if (err) {
			console.error(err);
		}
	});

}

module.exports	= exports;