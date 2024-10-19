import { type DiscordUsers, type GuildUsers, type Guilds } from "@prisma/client";
import { error } from "@sveltejs/kit";
import { USER_API_URL, USER_API_PORT } from "$env/static/private";
import { OAuth2Guild, type User } from "discord.js";
import createHeaders from "./methods/createHeaders";

export default class UserData {
	private readonly userId: string;
	private readonly accessToken: string;

	constructor(userId: string, accessToken: string) {
		this.userId = userId;
		this.accessToken = accessToken;
	}

	// Send a GET request to the User endpoint to receive data from db
	async getData(): Promise<BotResData> {
		const headers = createHeaders();
		const [guildsResponse, userResponse] = await Promise.all([
			// Get user's guilds from discord API
			fetch("https://discord.com/api/users/@me/guilds", {
				method: "GET",
				headers: {
					authorization: `Bearer ${this.accessToken}`
				}
			}),
			// Get user from discord API
			fetch("https://discord.com/api/users/@me", {
				method: "GET",
				headers: {
					authorization: `Bearer ${this.accessToken}`
				}
			})
		]);

		if (!(guildsResponse || userResponse).ok) {
			console.error(guildsResponse, guildsResponse.url);
			throw error(guildsResponse.status, guildsResponse.statusText);
		}

		// Get all the data from the responses - async
		const [guilds, user]: [OAuth2Guild[], User] = await Promise.all([guildsResponse.json(), userResponse.json()]);

		// POST to send guilds and receive database scoped data from custom bot API
		const customResponse = await fetch(`${USER_API_URL}:${USER_API_PORT}/API/User/${this.userId}`, {
			method: "POST",
			headers,
			body: JSON.stringify(guilds.map(g => g.id))
		});

		if (customResponse.status === 404) {
			throw error(404, "Your user cannot be found, have you used KaikiBot before?");
		}

		if (!customResponse.ok) {
			console.error(customResponse, customResponse.url);
			throw error(customResponse.status, customResponse.statusText);
		}

		return { ...await customResponse.json(), guilds, user };
	}
}

export type BotResData = {
	user: User;
	userData: DiscordUsers;
	guildDb: ({ GuildUsers: GuildUsers[] } & Guilds)[];
	guilds: OAuth2Guild[];
};
