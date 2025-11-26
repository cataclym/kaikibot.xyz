import { error } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import CreateHeaders from "../../../../methods/CreateHeaders";
import type { GETGuildBody } from "kaikiwa-types";

const { EMBED, USER_API_PORT, USER_API_URL } = env

export async function load({ params, parent, fetch }) {
	const { responseData } = await parent();

	const url = new URL(USER_API_URL);
	url.port = USER_API_PORT;
	url.pathname = `/API/Guild/${params.guild}`;
	url.searchParams.append("userId", params.user);

	// GET special guild data from bot
	const guildResponse = await fetch(url, {
		method: "GET",
		headers: CreateHeaders()
	});

	if (!guildResponse.ok) {
		throw error(500, "No response from the server.");
	}

	const { guild, user } = <GETGuildBody>await guildResponse.json();
	const APIGuild = responseData?.guilds.find((g) => g.id === params.guild);

	if (!APIGuild) {
		throw error(404, "Guild not found");
	}

	// Apparently this checks ADMIN flag in the permissions bitfield
	const isAdmin = (BigInt(APIGuild?.permissions || 0) & 0x8n) == 0x8n;

	return { EMBED, guild, user, isAdmin, APIGuild };
}
