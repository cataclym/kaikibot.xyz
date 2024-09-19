import { type DiscordUsers, type GuildUsers, type Guilds } from "@prisma/client";
import { error } from "@sveltejs/kit";
import type { User } from "@auth/sveltekit";
import { USER_API_URL, USER_API_PORT } from "$env/static/private";
import type { GuildTextBasedChannel } from "discord.js";

export default class UserData {
	userId: string;
	constructor(userId: string) {
		this.userId = userId;
	}

	async getData(): Promise<BotResData> {
		const res = await fetch(`${USER_API_URL}:${USER_API_PORT}/API/POSTUser/${this.userId}`, {
			method: "POST",
			body: JSON.stringify({
				token: process.env.TOKEN
			}),
			headers: {
				"content-type": "application/json"
			}
		});

		if (!res.ok) error(res.status, res.statusText);

		return res.json();
	}
}

export type UserDBData = {
	user: DiscordUsers;
	guildMemberships: (GuildUsers & Guilds)[];
};

export type BotResData = {
	user: User;
	data: UserDBData;
	guilds: {
		name: string;
		icon: string;
		id: string;
		guildChannels: GuildTextBasedChannel[];
	}[];
};