import { error } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { type User } from "discord.js";
import CreateHeaders from "./methods/CreateHeaders";
import type OAuthGuildData from "./interfaces/OAuthGuildData";
import type { POSTUserGuildsBody } from "kaikiwa-types";

const discordAPICache = new Map<string, { data: [OAuthGuildData[], User]; expiry: number }>();
const { USER_API_URL, USER_API_PORT } = env;

export default class UserData {
	private readonly userId: string;
	private readonly accessToken: string;

	constructor(userId: string, accessToken: string) {
		this.userId = userId;
		this.accessToken = accessToken;
	}

	// Send two GET requests to Discord User endpoint
	// Then request db data from bot server using received guild IDs
	async getData(): Promise<BotResData> {
		const now = Date.now();
		const cached = discordAPICache.get(this.userId);

		let guilds: OAuthGuildData[], user: User;

		if (!cached || (cached && cached.expiry <= now)) {

			const [guildsResponse, userResponse] = await Promise.all([
				fetch("https://discord.com/api/users/@me/guilds", {
					headers: { authorization: `Bearer ${this.accessToken}` },
				}),
				fetch("https://discord.com/api/users/@me", {
					headers: { authorization: `Bearer ${this.accessToken}` },
				}),
			]);

			if (!(guildsResponse || userResponse).ok) {
				console.error(guildsResponse, guildsResponse.url);
				throw error(guildsResponse.status, guildsResponse.statusText);
			}

			// Get all the data from the responses - async
			[guilds, user] = await Promise.all([
				guildsResponse.json(),
				userResponse.json()
			]);

			// cache result for 5 minutes
			discordAPICache.set(this.userId, { data: [guilds, user], expiry: now + 5 * 60 * 1000 });
		}

		else {
			[guilds, user] = cached.data;
		}

		const dbPOSTDataRes = await this.GETUserGuilds(guilds);

		return { ...dbPOSTDataRes, guilds, user };
	}

	// BigInt is not sent in JSON, it gets converted to string
	private async GETUserGuilds(
		guilds: OAuthGuildData[]
	): Promise<BigIntToString<POSTUserGuildsBody>> {
		const headers = CreateHeaders();
		// GET to receive database scoped data from custom bot API
		// UserId in params
		// GuildIds in query params
		const url = new URL(`${USER_API_URL}:${USER_API_PORT}/API/User/${this.userId}/guilds`);
		url.searchParams.append("ids", guilds.map((g) => g.id).join(","))

		const customResponse = await fetch(url, {
			method: "GET",
			headers,
		}).catch((err) => {

			if (err instanceof TypeError) {
				throw error(500, "The server is down at the moment, come back at a later time.");
			}
			throw error(err);
		});

		if (customResponse.status === 404) {
			throw error(404, "Your user cannot be found.");
		}

		if (!customResponse.ok) {
			console.error(customResponse, customResponse.url);
			throw error(customResponse.status, customResponse.statusText);
		}

		return customResponse.json();
	}
}

export type BotResData = {
	guilds: OAuthGuildData[];
	user: User;
} & BigIntToString<POSTUserGuildsBody>;

type BigIntToString<T> = T extends bigint
	? string
	: T extends Array<infer U>
	? Array<BigIntToString<U>>
	: T extends object
	? { [K in keyof T]: BigIntToString<T[K]> }
	: T;
