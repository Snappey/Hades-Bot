var Discord = require("discord.js");
var fs = require("fs");

var path = require('path');
var appDir = path.dirname(require.main.filename);

var bot = new Discord.Client();

function Init() {
    var cfg = JSON.parse(fs.readFileSync(appDir + "/Config/config.json", "utf8"));
        console.log(appDir)
        console.log("CFG Read!");
        console.log(cfg)
    bot.login(cfg[0], cfg[1]);
}


bot.on("ready", function() {
    console.log("Bot is Ready to use!");
});

bot.on("message", function(message) {
    if(message.content === "ping") {
        bot.reply(message, "pong");
    }
});

Init();