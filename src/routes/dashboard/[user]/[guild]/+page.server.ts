import { EMBED } from "$env/static/private";
import { type Actions, error } from "@sveltejs/kit";
import { USER_API_PORT, USER_API_URL } from "$env/static/private";
import { SubmitChanges } from "../../../../methods/SubmitChanges";
import CreateHeaders from "../../../../methods/CreateHeaders";
import type { Guild } from "discord.js";

type GuildResponse = {
	guild: Guild & {
		channels: { id: string; name: string }[];
	},
	user: {
		userRole: { id: string; name: string; color: number; icon: string | null } | null;
	}
};

export async function load({ params, fetch }) {
	const url = new URL(USER_API_URL);
	url.port = USER_API_PORT;
	url.pathname = `/API/Guild/${params.guild}`;
	url.searchParams.append("userId", params.user);

	const guildResponse = await fetch(url, {
		method: "GET",
		headers: CreateHeaders()
	});

	if (!guildResponse.ok) {
		throw error(500, "No response from the server.");
	}

	const { guild, user } = <GuildResponse> await guildResponse.json();

	return { EMBED, guild, user };
}

export const actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		await SubmitChanges(
			JSON.parse(String(formData.get("data"))),
			BigInt(params.guild!),
			USER_API_URL,
			USER_API_PORT
		);
	}
} satisfies Actions;
