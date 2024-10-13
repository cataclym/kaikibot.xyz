import { type DiscordUsers, type GuildUsers, type Guilds } from "@prisma/client";
import { error } from "@sveltejs/kit";
import { USER_API_URL, USER_API_PORT } from "$env/static/private";
import { type GuildTextBasedChannel, type PermissionsBitField, Role, type User } from "discord.js";

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

		if (!res.ok) {
			console.error(res, res.url)
			throw error(res.status, res.statusText);
		}

		return res.json();
	}
}

export type BotResData = {
	user: User;
	userData: DiscordUsers
	data: (GuildUsers & Guilds)[];
	guilds: GuildCache[];
};

export type GuildCache = {
	guildChannels: GuildTextBasedChannel[];
	icon: string | null;
	id: string;
	name: string
	userPerms: Readonly<PermissionsBitField>;
	userRole: Role | null
}
