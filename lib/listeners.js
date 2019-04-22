let config   = require ('./../config.js');
let util     = require ('./util.js');
let commands = require ('./commands.js');
let vendor   = require ('./vendor.js');

module.exports = {
    onMessage : (client, message) => {
        let command,
            fn;

        if (!message.guild || message.guild.name !== config.discord.guild) {
            return;
        }

        command = message.content.split (' ') [0];

        if (command [0] !== '!') {
            return;
        }

        command = command.substring (1);
        fn      = commands [command];

        fn (client, message);
    },
    
    onMessageReactionAdd : async (client, reaction, user) => {
        let guild,
            guildMember,
            role,
			rRole;

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
            
        }
    },
    
    onMessageReactionRemove : (client, reaction, user) => {
        util.info ('Got reaction remove');
    },

    onPacket : (client, packet) => {
        vendor.reactionEventHandler (client, packet);
    }
};