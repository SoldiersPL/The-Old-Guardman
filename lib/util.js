let config = require ('./../config.js');

module.exports = {
	//get channel by name
    getGuild : (client, guildName) => {
        let guild;
    
        guild = client.guilds.find (guild => guild.name === guildName);

        if (!guild) {
            error (`Guild not found: ${guildName}. Has the bot been invited?`);
        }

        return guild;
    },
	//get role by its name
    getRole : (guild, roleName) => {
        return guild.roles.find (role => role.name === roleName); 
    },
	//get content of command (gets rid of '!' in front)
    getContent : (command) => {
        return command.split (' ')
                      .slice (1)
                      .join (' ');
    },
    
	//info message for log
    info : (message) => {
        console.log (`[Info] ${message}`);
    },
	//warning message for log
    warn : (message) => {
        console.log (`[Warning] ${message}`);
    },
    //error message for log
    error : (message) => {
        throw new Error (`[Error] ${message}`);
    }
}