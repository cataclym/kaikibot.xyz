import { error } from "@sveltejs/kit";
import type { Guilds, GuildUsers } from "@prisma/client";

export async function load({ parent, params }) {
	const { userData } = await parent();

	const guildData: (GuildUsers & Guilds & { Name?: string }) | undefined = userData.data.guildMemberships.find(g => String(g.GuildId) === params.guild)

	if (!guildData) throw error(500, "Guild data was not found!");

	guildData.Name = userData.guilds.find(g => g.id === params.guild)?.name

	return {
		guildData
	}
}
