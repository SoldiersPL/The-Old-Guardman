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

    onboarding: {
        messageId: '421461981271425024',
        emoji: '✅',
        role: 'Rankless',
        welcome: 'Welcome to Old Guard, hope you enjoy your stay :)'
    },
	/**
	*    iam: [
	*        <roleName>
	*    ]
	*
	* This module watches all posts made in a <guildName>. If a post in the
	* <guildName> contains "!iam" command  and contains <roleName> 
	* posting user will be granted appopriate <roleName>.
	*/
    iam: [
		'Divided Conqueror',
		'Grand Strategist',
		'Champion of the Past',
		'Hero of Middle Earth',
		'Azerothian',
		'Agent of Diplomacy'
    ],
	
	/**
	 * gameMonitor: {
	 *     <monitorChannel>: {
	 *         <targetChannel>: [
	 *             <pattern>
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
			'first_war_wip_hosted_games': [
				/War in the Plaguelands/i,
				/WIP/i
			],
			
			'panther_maps_hosted_games': [
                /DARKNESS RISING/i,
                /Glory of the Horde/i,
                /Goth/i
			],
			
			'lotr_rr_hosted_games': [
                /Robert Rebels/i,
                /GAME OF THRONES /i,
                /LOTR/,
                /BFME/,
                /Battle for Middle Earth/i
			],
			
			'awlr_daow_hosted_games': [		
				/Azeroth wars/i,
				/LR/i,
				/DAOW Reborn/i,
				/DAOW/i
			],
			
			'lt_hosted_games': [
                /Lordaeron Tactics/i,
                /LT/i,
			]
		}
	}
};