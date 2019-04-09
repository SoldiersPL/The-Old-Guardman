let config = require ('./../config.js');

module.exports = {
    getGuild : (client, guildName) => {
        let guild;
    
        guild = client.guilds.find (guild => guild.name === guildName);

        if (!guild) {
            error (`Guild not found: ${guildName}. Has the bot been invited?`);
        }

        return guild;
    },

    getRole : (guild, roleName) => {
        return guild.roles.find (role => role.name === roleName); 
    },

    getContent : (command) => {
        return command.split (' ')
                      .slice (1)
                      .join (' ');
    },
    
    /** **/
    
    info : (message) => {
        console.log (`[Info] ${message}`);
    },

    warn : (message) => {
        console.log (`[Warning] ${message}`);
    },
    
    error : (message) => {
        throw new Error (`[Error] ${message}`);
    }
}