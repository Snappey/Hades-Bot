var fs = require("fs");
var path = require('path');
var appDir = path.dirname(require.main.filename);

var chat = require( appDir + "/plugins/chat/main.js");

var prefixes = [];
 loadPrefixes();

chat.Add("prefix", "prefix <add,remove,list> <prefix>", function(opt, prefix) {
	if (prefix != null) {prefix = prefix.substring(0,1);};	
	if (opt == "add") {
		if (prefix != "" || prefix!= null && prefix != "\"" && prefix != "\'") {
			prefixes[(prefix)] = true;
			return "Prefix '" + prefix + "' was added to the database!";
		}
	} else if (opt == "remove") {
		if (prefix != "" || prefix != null) {
			if (prefixes[prefix] != null) {
				prefixes[prefix] = false
				return "Prefix '" + prefix+ "' was removed from datbase!";
			}
			else
			{
				return "Prefix was not found in database!";
			}
		}
	} else if (opt == "list") {
		var str = "Prefixes being used: ";
		for (key in prefixes) {
		  if (!prefixes.hasOwnProperty(key) || prefixes[key] == false) { continue; }
		  str = str + " '" + key + "' ";
		}
		return str;
	} else if (opt == "save")
	{
		savePrefixes();
		return "Prefixes have been saved!";
	} else if (opt == "load")
	{
		loadPrefixes();
		return "Prefixes have been loaded from Database!";
	}
})

function loadPrefixes() {
	var res = fs.readFileSync("./plugins/prefix/prefix.json");
	res = JSON.parse(res);

	var temp = []
	for(var i=0; i < res.length; i+=2)
	{
		temp[res[i]] = res[i+1]; 
	}
	prefixes = temp;
}

function savePrefixes() {
	var temp = []
	for(key in prefixes) {
		temp.push(key);
		temp.push(prefixes[key]);
	}
	fs.writeFileSync("./plugins/prefix/prefix.json", JSON.stringify(temp)); // Temp solution converts to a 1d array e.g. ["/", true] instead of ["/":true]
}
