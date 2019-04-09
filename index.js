(require ('dotenv')).config ();

let Discord = require ('discord.js');
let config  = require ('./config.js');
let client  = new Discord.Client ();

let util      = require ('./lib/util.js');
let commands  = require ('./lib/commands.js');
let listeners = require ('./lib/listeners.js');

client.on ('ready', () => {
    util.info (`Logged in as ${client.user.tag}`);
    
    client.on ('message',               ctx (listeners.onMessage));
    client.on ('messageReactionAdd',    ctx (listeners.onMessageReactionAdd));
    client.on ('messageReactionRemove', ctx (listeners.onMessageReactionRemove));
    client.on ('raw',                   ctx (listeners.onPacket));
});

function ctx (callback)
{
    return (... args) => {
        args.unshift (client);

        return callback.apply (this, args);
    }
}

client.login (config.discord.token);