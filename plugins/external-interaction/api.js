var HANDLER = {};

// handler is required
// apiTree is optional
module.exports = function (handler, apiTree){

	HANDLER		= handler;
	this.tree	= apiTree || {};
	this.route 	= "";

	this.addTree = function (apiTree, branchName){

		if (branchName)
			this.tree[branchName] = apiTree;
		else
			this.tree = apiTree;

	}

	this.expandRoute = function (path){

		this.route += "/" + path;
		
	}

	this.buildRouter = function (router){

		var api = this;

		router.get(api.route + '/:root*?', function (req, res){

			// Extend response to make sending easier
			res.send = sendText;
			res.json = sendJSON;

			var root = req.params.root;

			if (root) {

				var display	= api.tree[root];
				var roots	= req.params[0].split('/');

				var i 		= 0;
				while (i < roots.length) {

					root 	= roots[i];
					if (root != "") {
						display	= display[roots[i]];
					}

					i++;

				}

				if (typeof(display) == 'string') {
					handleAPIRoute(root, res, req);
				} else {
					res.json(display);
				}

			} else {
				res.json(api.tree);
			}

		});

		return router;

	}

}

function handleAPIRoute (id, res, req){

	try {

		HANDLER[id](res, req);

	} catch (e) {

		if (!HANDLER.hasOwnProperty(id)) {
			e = {
				'error' : "API Route has no handler",
				'friendly' : "Error handling API Request",
				'status' : 501
			}
		}
		
		res.send(e.friendly, e.status);

	}

}

function sendText (text, code){

	this.writeHead(200, {
		'Content-Type' : 'text/html'
	});

	sendGeneric(this, text, code);

}

function sendJSON (json, code){

	this.writeHead(200, {
		'Content-Type' : 'application/json'
	});
	
	var body = JSON.stringify(json);
	sendGeneric(this, body, code);

}

function sendGeneric (response, body, statusCode){

	var status = "";
	if (statusCode) {
		status += ":" + statusCode;
	}

	response.write(body);
	response.end(status);

}