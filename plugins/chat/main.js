
var chat = []; // Might make this a global module, since most plugins will probably be using this
chat.commands = [];

var Command = function (name, args, func) {
	this.name = name;
	this.args = args;
	this.func = func;
}

Command.prototype.getName = function() { return this.name; };
Command.prototype.execute = function(a,b,c,d,e,f,g) { return this.func(a,b,c,d,e,f,g); };
Command.prototype.getArgs = function() { return this.args; };

chat["Add"] = function(name, args, func) {
	if (typeof(name) != "string") { console.error("String expected for 'name' Chat Function"); return; }
	if (typeof(func) != "function") { console.error("Function expected for 'func' Function Callback"); return; }
	chat.commands[name.toLowerCase()] = new Command(name, args, func);
}

chat["GetTable"] = function() {
	return chat["commands"];
}

chat["Execute"] = function(name, args) {
	return chat.commands[name.toLowerCase()].execute(args);
}

module.exports = chat;