import { EMBED } from "$env/static/private";
import { error } from "@sveltejs/kit";
import type { Guilds, GuildUsers } from "@prisma/client";
import type { GuildCache } from "../../../../UserData";
import { USER_API_PORT, USER_API_URL } from "$env/static/private";

export type GuildData = Omit<Guilds & GuildUsers & GuildCache, "Id" | "CreatedAt"> & { name: string, icon: string }

export async function load({ params, parent }) {
	const {
		responseData
	} = await parent();

	const guildData = {
		...responseData.data.find((g) => String(g.GuildId) === params.guild),
		...responseData.guilds.find((g) => String(g.id) === params.guild)
	};

	if (!((guildData: any): guildData is GuildData => "GuildId" in guildData)(guildData)) throw error(500, "Guild data was not found!");

	return { EMBED, guildData, USER_API_PORT, USER_API_URL };
}

