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
            role,
            person;

        person = message.member;
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
        
        // Be a darling and check syntax
         
        let userRoles = person.roles;
        let rolesRemove = userRoles.filter(r => !config.iam.includes(r.name));
        
        rolesRemove.forEach(function(roleR) {
            util.info (`Removing role [${roleR.name}] from user [${person.user.username}].`);
            person.removeRole(roleR);
        });

        util.info (`Adding role [${role.name}] to user [${person.user.username}].`);

        person.addRole (role);
    }
}
