import { type DiscordUsers, type GuildUsers, type Guilds } from "@prisma/client";
import { error } from "@sveltejs/kit";
import type { User } from "@auth/sveltekit";

export default class UserData {
	userId: string;
	constructor(userId: string) {
		this.userId = userId;
	}

	async init(): Promise<BotResData> {
		const res = await fetch(
			`${process.env.USER_API_URL}:${process.env.USER_API_PORT}/API/POSTUser/${this.userId}`,
			{
				method: "POST",
				body: JSON.stringify({
					token: process.env.TOKEN
				}),
				headers: {
					"content-type": "application/json"
				}
			}
		);

		if (!res.ok) throw error(res.status, res.statusText);

		return res.json();
	}
}

export type UserDBData = {
	user: DiscordUsers;
	guildMemberships: GuildUsers[] & Guilds[];
};

export type BotResData = {
	user: User;
	data: UserDBData;
	guilds: { id: string; name: string }[];
};
