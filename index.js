(require ('dotenv')).config ();
let Discord = require ('discord.js');
let config = require ('./config.js');
let client = new Discord.Client ();
let guild  = null;

client.on ('ready', () => {
	console.log (`[Info] Logged in as ${client.user.tag}`);
	
	guild = client.guilds.find (guild => guild.name === config.discord.guild);
	
	if (!guild) {
		throw new Error (`[Error] Guild not found: ${config.discord.guild}. Has the bot been invited?`);
	}
	
	client.on ('message', message => {
		let targetChannels, targetChannel, pattern;
		
		if (message.guild.name !== config.discord.guild || !(message.channel.name in config.gameMonitor)) {
			return;
		}
		
		targetChannels = config.gameMonitor [message.channel.name];
		
		/* Does the message match any patterns? */
		Object.keys (targetChannels).forEach (targetChannelName => {
			for (pattern of targetChannels [targetChannelName]) {
				if (!pattern.test (message.content)) {
					continue;
				}
				
				targetChannel = guild.channels.find (channel => channel.name === targetChannelName);
				
				if (!targetChannel) {
					console.log (`[Warning] Channel [${targetChannelName}] not found in guild [${guild.name}].`);
					continue;
				}
				
				targetChannel.send (`@here ${message.content}`);
				console.log (`[Info] Posted notification for [${message.content}] in [${targetChannelName}].`);
			}
		});
	});
});


client.login (config.discord.token);