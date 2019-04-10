module.exports = {
	discord: {
		token: process.env.DISCORD_TOKEN,
		guild: 'The Old Guard'
	},

    onboarding: {
        messageId: '',
        emoji: '✅',
        role: 'Member',
        welcome: 'Hello!'
    },

    iam: [
        'Member'
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