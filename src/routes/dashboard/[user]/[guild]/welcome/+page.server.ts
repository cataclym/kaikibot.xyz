import { fail } from "@sveltejs/kit";
import type { RouteParams } from "../$types";
import { UpdateGuild } from "../../../../../methods/UpdateGuild";

export async function load({ parent }) {
	const { isAdmin, guild } = await parent();

	return { isAdmin, guild };
}

// Form actions receives frontend data, sends it to bot
export const actions = {
	welcome: async ({ request, params }) => sendFormData(request, params),
	bye: async ({ request, params }) => sendFormData(request, params)
};

async function sendFormData(request: Request, params: RouteParams) {
	const formData = await request.formData();
	
	const endpoint = <string> formData.get("endpoint");
	const channel = formData.get("channel");
	const timeout = formData.get("timeout");
	const message = <string> formData.get("message");

	// Total combined message character limit
	if (message.length > 6000) throw fail(400);

	const data = JSON.stringify(endpoint.endsWith("/bye")
		? {
			ByeChannel: channel,
			ByeTimeout: timeout,
			ByeMessage: message
		}
		: {
			WelcomeChannel: channel,
			WelcomeTimeout: timeout,
			WelcomeMessage: message
		},
		null
	);

	return UpdateGuild(data, params.guild);
}