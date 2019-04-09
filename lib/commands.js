let config = require ('./../config.js');
let util   = require ('./util.js');

module.exports = {
    'host' : (client, message) => {
        let guild,
            targetChannels, 
            targetChannel, 
            pattern;
        
        guild = util.getGuild (client, config.discord.guild);

        if (! (message.channel.name in config.gameMonitor)) {
            return;
        }

        targetChannels = config.gameMonitor [message.channel.name];
         
        // Does the message match any patterns?
        Object.keys (targetChannels).forEach (targetChannelName => {
            for (pattern of targetChannels [targetChannelName]) {
                if (!pattern.test (message.content)) {
                    continue;
                }

                targetChannel = guild.channels.find (channel => channel.name === targetChannelName);

                if (!targetChannel) {
                    util.warn (`Channel [${targetChannelName}] not found in guild [${guild.name}].`);
                    continue;
                }

                targetChannel.send (`@here ${util.getContent (message.content)}`);

                util.info (`Posted notification for [${message.content}] in [${targetChannelName}].`);
            }
        });
    },
    
    'iam' : (client, message) => {
        let guild,
            roleName,
            role;

        guild    = message.guild;
        roleName = util.getContent (message.content);
         
        if (!config.iam.includes (roleName)) {
            return;
        }

        role = util.getRole (guild, roleName);

        if (!role) {
            util.warn (`Role not found: ${roleName}.`);
            return;
        }

        util.info (`Adding role [${role.name}] to user [${message.member.user.username}].`);

        message.member.addRole (role);
    }
}