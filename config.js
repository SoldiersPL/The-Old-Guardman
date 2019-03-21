module.exports = {
	discord: {
		token: process.env.DISCORD_TOKEN,
		guild: 'The Old Guard'
	},
	
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
				/WIP24/i
			],
			
			'panther_maps_hosted_games': [
			],
			
			'lotr_rr_hosted_games': [
			],
			
			'awlr_daow_hosted_games': [				
			],
			
			'lt_hosted_games': [
			],
			
			'lta_ltf_hosted_games': [
			]
		}
	}
};