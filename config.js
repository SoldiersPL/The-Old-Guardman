module.exports = {
	/**
	*	discord: {
	*		token: <Discord_Token>
	*		guild: <guildName>
	*	}
	*
	* This module is responsible for reading  .eve file to obtain <Discord_Token>
	* needed to connect to the bot itself.
	* In addition, it also checks if it had already been invited to <guildName>
	* in case of it not being invited, it will return appopriate error messege in log file.
	*/
	discord: {
		token: process.env.DISCORD_TOKEN,
		guild: 'The Old Guard'
	},

	/**
	*	onboarding: {
	*		messageId: <messegeID>
	*		emoji: <reactionName>
	*		role: <roleName>
	*		welcome: <afterReactionMessege>
	*		defaultrole: <defaultRole>
	*	}
	*
	* This module is responsible for granting new users starting rank after they react
	* under post  assigned to <messegeID> with <reactionName>.
	* After that had been done, user will recieve private messege <afterReactionMessege>
	* while at same time losing <defaultRole> and gaining <role>
	*/
    onboarding: {
        messageId: '421461981271425024',
        emoji: '✅',
        role: 'Rankless',
        welcome: 'Welcome to Old Guard, hope you enjoy your stay :)',
		defaultrole: 'Unranked'
    },
	
	/** 
    * reactionRole : {
    *   messageId: <messageID>
    *   roles: [[<emoji>, <role>]]
    * }
    *
    * This module is responsible for granting users the role after they react to
    * the role message <messageID> with <emoji>.
    * They are then given the associated <role>
  **/
  	reactionRole: {
  		messageId: '573946465701986312',
  		roles: [
		[':friday_night:', 'AzerothianInhib'],
		[':bolvardisapproves:', 'RoleplayInhib'], 
		[':sleep:', 'OtherInhib'], 
  		[':olorin:', 'GrandInhib'], 
		[':coin:', 'MiddleEarthInhib'], 
		[':roar:', 'DividedInhib']];
  	},
	
	/**
	*    iam: {
	*        <roleName>:[
	*			<pattern>,
	*			<pattern>
	*			]
	*    }
	*
	* This module watches all posts made in a <guildName>. If a post in the
	* <guildName> contains "!iam" command  and contains <pattern> 
	* posting user will be granted appopriate <roleName>.
	*/
    iam: {
		'Divided Conqueror':[
		/Divided/i,
		/Conqueror/i,
		],
		'Grand Strategist':[
		/Grand/i,
		/Strategist/i,
		],
		'Champion of the Past':[
		/Champion/i,
		/Past/i,
		],
		'Hero of Middle Earth':[
		/Hero/i,
		/Middle/i,
		/Earth/i,
		],
		'Azerothian':[
		/Azeroth/i,
		],
		'Agent of Diplomacy':[
		/Agent/i,
		/Diplomacy/i,
		],
    },
	
	/**
	 * gameMonitor: {
	 *     <monitorChannel>: {
	 *         <targetChannel>: [
	 *             <pattern>,
	 *             <pattern>
	 *         ]
	 *     }
	 * }
	 *
	 * This module watches all posts made in a <monitorChannel>. If a post in the
	 * <monitorChannel> is matched against a <pattern> in any one of the
	 * <targetChannel>s, the post will be copied to the matched <targetChannel>
	 * with an @here notification.
	 */
	gameMonitor: {
		'hosted_games': {
			'azerothian_hosted_games': [
				/Azeroth wars/i,
				/AW/i,
				/Dark Ages/i,
				/DAOW/i,
				/Hyjal/i,
				/LTF/i,
				/LTA/i,
				/KTA/i,
			],

			'grand_strat_hosted_games': [
				/TFW/i,
				/First War/i,
				/WIP/i,
				/Tel Sirion/i,
				/Plaguelands/i,
				/PLEC/i,
			],

			'middle_earth_hosted_games': [
				/Robert/i,
				/Rebel/i,
				/Game of Thrones/i,
				/GoT/i,
				/Lord of the Rings/i,
				/LOTR/i,
				/BFME/i,
				/Battle for Middle Earth/i,
				/Ring/i,
			],

			'divided_conq_hosted_games': [
				/DARKNESS RISING/i,
				/Glory of the Horde/i,
				/Goth/i,
				/Kings of Azeroth/i,
				/KoA/i,
				/Rise of the Legion/i,
			],

			'roleplay_hosted_games': [
				/AOC RP/i,
				/Roleplay/i,
				/Age of Chaos/i,
				/RP/i,
			],
			'other_hosted_games': [
				/.+/,
			],
			
		}
	}
};
