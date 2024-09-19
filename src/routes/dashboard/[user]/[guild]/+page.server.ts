import { EMBED } from "$env/static/private";
import { error } from "@sveltejs/kit";

export async function load({ params, parent }) {
	const {
		userData: { guilds, data }
	} = await parent();

	const guildData = {
		...data.guildMemberships.find((g) => String(g.GuildId) === params.guild),
		...guilds.find((g) => String(g.id) === params.guild)
	};

	if (!hasGuildData(guildData)) throw error(500, "Guild data was not found!");

	return { EMBED, guildData };
}

function hasGuildData<T extends Object>(guildData: T): guildData is Required<T> {
	return "guildId" in guildData;
}
