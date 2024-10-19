import { EMBED } from "$env/static/private";
import { type Actions, error } from "@sveltejs/kit";
import { USER_API_PORT, USER_API_URL } from "$env/static/private";
import { submitChanges } from "../../../../methods/submitChanges";
import createHeaders from "../../../../methods/createHeaders";

export async function load({ params, parent, fetch }) {
	const { responseData } = await parent();

	const guildChannelsResponse = await fetch(`${USER_API_URL}:${USER_API_PORT}/API/Guild/${params.guild}`, {
			method: "GET",
			headers: createHeaders()
		});

	if (!guildChannelsResponse.ok) {
		throw error(500, "No response from the server.");
	}

	const guildChannels = <{ id: string, name: string }[]> await guildChannelsResponse.json();

	const guildData = {
		...responseData.guildDb.find((g) => String(g.Id) === params.guild),
		...responseData.guilds.find((g) => String(g.id) === params.guild),
		channels: guildChannels,
	};

	return { EMBED, guildData };
}

export const actions = ({
	default: async ({ request, params }) => {
		const formData = await request.formData();
		await submitChanges(JSON.parse(String(formData.get("data"))), BigInt(params.guild!), USER_API_URL, USER_API_PORT)
	}
}) satisfies Actions;
