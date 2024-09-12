import { error } from "@sveltejs/kit";

export async function load({ parent, params }) {
	const { userData } = await parent();

	const guildData = userData.data.guildMemberships.find(g => String(g.GuildId) === params.guild)

	if (!guildData) throw error(500, "Failed retrieving guild data!");

	return {
		guildData
	}
}
