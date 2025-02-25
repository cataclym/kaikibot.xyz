import { error } from "@sveltejs/kit";
import { USER_API_URL, USER_API_PORT } from "$env/static/private";
import { type User } from "discord.js";
import CreateHeaders from "./methods/CreateHeaders";
import type OAuthGuildData from "./interfaces/OAuthGuildData";
import type { POSTUserGuildsBody } from "kaikiwa-types";

export default class UserData {
	private readonly userId: string;
	private readonly accessToken: string;

	constructor(userId: string, accessToken: string) {
		this.userId = userId;
		this.accessToken = accessToken;
	}

	// Send a GET request to the User endpoint to receive data from db
	async getData(): Promise<BotResData> {
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
		const [guilds, user]: [OAuthGuildData[], User] = await Promise.all([
			guildsResponse.json(),
			userResponse.json()
		]);

		const dbPOSTDataRes = await this.dbPOSTData(guilds);

		return { ...dbPOSTDataRes, guilds, user };
	}

	// BigInt is not sent in JSON, it gets converted to string
	private async dbPOSTData(
		guilds: OAuthGuildData[]
	): Promise<BigIntToString<POSTUserGuildsBody>> {
		const headers = CreateHeaders();
		// POST to send guilds and receive database scoped data from custom bot API
		/* @type
		 *	body: bigint[]
		 */
		const customResponse = await fetch(
			`${USER_API_URL}:${USER_API_PORT}/API/User/${this.userId}`,
			{
				method: "POST",
				headers,
				body: JSON.stringify(guilds.map((g) => g.id))
			}
		);

		if (customResponse.status === 404) {
			throw error(404, "Your user cannot be found, have you used KaikiBot before?");
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
