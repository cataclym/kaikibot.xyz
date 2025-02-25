import { UpdateGuild } from "../../../../../methods/UpdateGuild";

export async function load({ parent }) {
	const { isAdmin, guild } = await parent();

	return { isAdmin, guild };
}

// Form actions receives frontend data, sends it to bot
export const actions = {
	welcome: async ({ request, params }) => {
		const formData = await request.formData();

		const welcomeChannel = formData.get("welcomechannel");
		const welcomeTimeout = formData.get("welcometimeout");
		const welcomeMessage = formData.get("welcomemessage");

		const data = JSON.stringify(
			{
				WelcomeChannel: welcomeChannel,
				WelcomeTimeout: welcomeTimeout,
				WelcomeMessage: welcomeMessage
			},
			null
		);

		return UpdateGuild(data, params.guild);
	},
	bye: async ({ request, params }) => {
		const formData = await request.formData();

		const byeChannel = formData.get("byechannel");
		const byeTimeout = formData.get("byetimeout");
		const byeMessage = formData.get("byemessage");

		const data = JSON.stringify(
			{
				ByeChannel: byeChannel,
				ByeTimeout: byeTimeout,
				ByeMessage: byeMessage
			},
			null
		);

		return UpdateGuild(data, params.guild);
	}
};
