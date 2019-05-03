let config   = require ('./../config.js');
let util     = require ('./util.js');
let commands = require ('./commands.js');
let vendor   = require ('./vendor.js');

module.exports = {
    onMessage: (client, message) => {
    	let command,
		messg,
    	fn;

    	if (!message.guild || message.guild.name !== config.discord.guild) {
    		return;
    	}

		messg = message.content;
    	command = messg.split(' ')[0];

    	if (command[0] !== '!') {
    		let guild,
    		targetChannels,
    		targetChannel,
    		pattern;

    		guild = util.getGuild(client, config.discord.guild);

    		if (!(message.channel.name in config.gameMonitor)) {
    			return;
    		}

    		targetChannels = config.gameMonitor[message.channel.name];

    		// Does the message match any patterns?
			patternLoop:
    		for (let targetChannelName of Object.keys(targetChannels)) {
    			for (let pattern of targetChannels[targetChannelName]) {
    				if (!pattern.test(message)) {
    					continue;
    				}

    				targetChannel = guild.channels.find(channel => channel.name === targetChannelName);

    				if (!targetChannel) {
    					util.warn(`Channel [${targetChannelName}] not found in guild [${guild.name}].`);
    					continue;
    				}

					if(messg.includes('@here'))
					{
						targetChannel.send(`${messg}`);
					}
					else
					{
						targetChannel.send(`@here ${messg}`);
					}
					
    				util.info(`Posted notification for [${messg}] in [${targetChannelName}].`);
					break patternLoop;
    			}
    		};
    		
    	}
		else {
			command = command.substring(1);
			fn = commands[command];

			fn(client, message);
		}

		},
    
    onMessageReactionAdd : async (client, reaction, user) => {
        let guild,
            guildMember,
            role,
			rRole,
            roleConfig;
        roleConfig = config.reactionRole;
        if (   reaction.message.id === config.onboarding.messageId
            && reaction.emoji.name === config.onboarding.emoji) 
		{
            guild       = util.getGuild (client, config.discord.guild);
            guildMember = await guild.fetchMember (user);
			
            role = util.getRole (guild, config.onboarding.role);     
			rRole = util.getRole (guild, config.onboarding.defaultrole); 
			
			if(guildMember.roles.find(r => r.name === config.onboarding.defaultrole))
			{
				await guildMember.addRole (role);
				await guildMember.removeRole(rRole);
				await guildMember.send (config.onboarding.welcome);

				util.info (`Sent welcome message to ${user.username}.`);
			}
			else
			{
				util.info (` ${user.username} dont posses rank  ${config.onboarding.defaultrole}.`);
			}
            
        } else if (   roleConfig.messageId === reaction.message.id
                   && roleConfig.roles.has(reaction.emoji.name)) {
            guild = util.getGuild(client, config.discord.guild);
            guildMember = await guild.fetchMember(user);
            role = util.getRole(guild, roleConfig.roles.get(reaction.emoji.name));
            await guildMember.addRole(role);
            util.info(`Given ${user.username} role ${role}`);
        }
    },
    
    onMessageReactionRemove : (client, reaction, user) => {
        let guild,
            guildMembber,
            role,
            roleConfig;
        roleConfig = config.reactionRole;
        util.info ('Got reaction remove');
        if (   roleConfig.messageId === reaction.message.id
            && roleConfig.roles.has(reaction.emoji.name)) {
            guild = util.getGuild(client, config.discord.guild);
            guildMember = await guild.fetchMember(user);
            role = util.getRole(guild, roleConfig.roles.get(reaction.emoji.name));
            await guildMember.removeRole(role);
            util.info(`Taken from ${user.username} role ${role}`);
        }
    },

    onPacket : (client, packet) => {
        vendor.reactionEventHandler (client, packet);
    }
};
