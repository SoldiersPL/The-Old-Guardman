let config = require ('./../config.js');
let util   = require ('./util.js');

module.exports = {
	
    'iam' : (client, message) => {
        let guild,
            role,
            person,
			roleList;

        person = message.member;
        guild    = message.guild;
		roleList = config.iam;
         
        Object.keys (roleList).forEach (targetRoleName => {
            for (pattern of roleList [targetRoleName]) {
                if (pattern.test (message.content)) {
                     role = util.getRole (guild, targetRoleName);
					 break;
		}}});

        if (!role) {
            util.warn (`Role not found: ${roleName}.`);
            return;
        }
        
        // Be a darling and check syntax
         
        let userRoles = person.roles;
        let tmp = userRoles.filter(r =>roleList.hasOwnProperty(r.name) );
		let rolesRemove = tmp.array();
		if(userRoles.hasOwnProperty('Rankless')){
		rolesRemove.push(util.getRole(guild,'Rankless'))};
        
        rolesRemove.forEach(function(roleR) {
            util.info (`Removing role [${roleR.name}] from user [${person.user.username}].`);
            person.removeRole(roleR);
        });

        util.info (`Adding role [${role.name}] to user [${person.user.username}].`);

        person.addRole (role);
    }
	'removeRole' : (client, message) => {
        let guild,
            person,
            roleList,
            members;

        person = message.member;
        guild = message.guild;
        members = guild.members.values;
        roleList = [
            'AWLR/DAoW',
            'LTF/TA',
            'LT',
            'First War/PLEC',
            'LOTR/RR',
            'Panther Maps'
        ];
        members.forEach(function(member) {
            member.removeRoles(roleLlist);
        });
    }
}
