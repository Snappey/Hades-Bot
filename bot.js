var Discord = require("discord.js");
var fs = require("fs");
var os = require("os");
var Cleverbot = require("cleverbot-node");

var path = require('path');
var appDir = path.dirname(require.main.filename); // TODO: Remove this horrible workaround for me messing up the require system

GLOBAL.bot = new Discord.Client(); 
bot.ctts = false;
GLOBAL.cleverbot = new Cleverbot;
var plugins = [] // All loaded plugins are stored in the array

function Init() {
    var cfg = JSON.parse(fs.readFileSync(appDir + "/config/config.json", "utf8"));

        loadPlugins();

    bot.login(cfg[0], cfg[1], function(err, tkn) {
        console.log(err, tkn);
    });
}

function loadPlugins() {
    
    var pluginDirs = fs.readdirSync(appDir  + "/plugins/");

    var timestarted = os.uptime();
    console.log("|-----")
    console.log("|- Loading Modules");
    console.log("|-----")
    for(var i=0; i< pluginDirs.length; i++)
    {
        try
        {
            plugins[pluginDirs[i]] = require(appDir + "/plugins/" + pluginDirs[i] + "/main.js");      
            console.log("|--  Loaded: " + pluginDirs[i] + "! ("  +  (os.uptime() - timestarted).toFixed(2) + "ms)" );
        }
        catch(err)
        {
            console.log("Error loading: " + pluginDirs[i] + "!");
            console.log(err);
        }
    }
    console.log("|-----")
    console.log("|- Modules Finished Loading!");
    console.log("|- Time Taken " + (os.uptime() - timestarted).toFixed(2) + "ms");
    console.log("|-----")
}

function executeChatCommand(string) {
    var res;
    if (string.indexOf(" ") > 0) { // Arguments included
        var cmd = string.substring(0, string.indexOf(" "));

        if (plugins["chat"]["commands"][cmd] == null) { return; }

        var args;
        if (plugins["chat"]["commands"][cmd]["args"] == 1) {
            args = string.substring(string.indexOf(" ") + 1, string.length);

            res = plugins["chat"]["commands"][cmd].execute(args);
        } else
        {
            args = string.substring(string.indexOf(" ") + 1, string.length).split(" ");
            
            res = plugins["chat"]["commands"][cmd].execute(args[0], args[1], args[2], args[3], args[4], args[5]);
        }
    }
    else {
        if (plugins["chat"]["commands"][string] == null) { return; }
        res = plugins["chat"]["commands"][string].execute();
    }
    return res;   
}

bot.on("ready", function() {
    console.log("Bot is Ready to use!");
    bot.sendMessage(bot.channels[0], "Whats Up!");
});

var _prfx = []; _prfx["/"] = true; _prfx["!"] = true; _prfx["~"] = true; // TODO: Make them configurable from the client
bot.on("message", function(message) {
    if (message.sender.username == bot.user.username) { return; }
    if (_prfx[message.content.substring(0,1)] == true) {
        var msg = executeChatCommand( message.content.substring( 1, message.content.length ) );
        if (msg != null || msg != "") {
            bot.sendMessage(message, msg);
        }
    }
    else {
        var chance = (Math.random() * 10);
        if (chance > 9 || (message.mentions[0] != null && message.mentions[0].username == bot.user.username && message.content != " ")) {
            Cleverbot.prepare(function(){
              cleverbot.write(message.content, function (response) {
                   bot.sendMessage(message, response.message, {tts: bot.ctts});
              });
            });
        }
    }
});

Init();