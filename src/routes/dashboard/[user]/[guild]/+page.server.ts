import { EMBED } from "$env/static/private";
import { type Actions, error } from "@sveltejs/kit";
import { USER_API_PORT, USER_API_URL } from "$env/static/private";
import { submitChanges } from "../../../../methods/submitChanges";
import createHeaders from "../../../../methods/createHeaders";

type GuildResponse = {
	guildChannels: { id: string; name: string }[];
	userRole: { id: string; name: string; color: number; icon: string | null } | null;
};

export async function load({ params, parent, fetch }) {
	const { responseData } = await parent();

	const guildData = {
		...responseData.guildDb.find((g) => String(g.Id) === params.guild),
		...responseData.guilds.find((g) => String(g.id) === params.guild),
		channels: [] as any
	};

	const url = new URL(USER_API_URL);
	url.port = USER_API_PORT;
	url.pathname = `/API/Guild/${params.guild}`;

	// Add userrole if it exists
	const guildUser = guildData.GuildUsers?.shift();
	if (guildUser && guildUser.UserRole) {
		url.searchParams.append("userId", params.user);
	}

	const guildResponse = await fetch(url, {
		method: "GET",
		headers: createHeaders()
	});

	if (!guildResponse.ok) {
		throw error(500, "No response from the server.");
	}

	const { guildChannels, userRole } = <GuildResponse>await guildResponse.json();
	guildData["channels"] = guildChannels;

	return { EMBED, guildData, userRole };
}

export const actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		await submitChanges(
			JSON.parse(String(formData.get("data"))),
			BigInt(params.guild!),
			USER_API_URL,
			USER_API_PORT
		);
	}
} satisfies Actions;
