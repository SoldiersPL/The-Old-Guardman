let config = require ('./../config.js');
let util   = require ('./util.js');

module.exports = {
	
	//fcommand to change user's current role
    'iam' : (client, message) => {
        let guild,
            role,
            person,
			roleList;

        person = message.member;
        guild    = message.guild;
		roleList = config.iam;
         //go through roleList and check if it contains one of roles user can apply for
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
        
        let userRoles = person.roles;
        let tmp = userRoles.filter(r =>roleList.hasOwnProperty(r.name) ); //temporary variable to change in to iterrable array
		let rolesRemove = tmp.array(); //array of roles to remove
		rolesRemove.push(util.getRole(guild,config.onboarding.role));
        
        rolesRemove.forEach(function(roleR) {
            util.info (`Removing role [${roleR.name}] from user [${person.user.username}].`);
            person.removeRole(roleR);
        });

        util.info (`Adding role [${role.name}] to user [${person.user.username}].`);

        person.addRole (role);
    },
}
