import { error } from "@sveltejs/kit";

export async function load({ parent, params }) {
	const { userData: { data, guildChannels } } = await parent();

	const guildData =
		data.guildMemberships.find((g) => String(g.GuildId) === params.guild);

	if (!guildData) throw error(500, "Guild data was not found!");

	return {
		guildData,
		guildChannels
	};
}
