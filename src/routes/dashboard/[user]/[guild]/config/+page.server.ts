import type { Guild } from "discord.js";
import { USER_API_PORT, USER_API_URL } from "$env/static/private";
import CreateHeaders from "../../../../../methods/CreateHeaders";

export async function load({ parent }) {
	const { isAdmin, guild } = await parent();

	return { isAdmin, guild };
}

export const actions = {
	prefix: async (event) => {

	},
	toggles: async (event) => {

	},
	excludedrole: async (event) => {

	},
	embedcolors: async (event) => {

	}
}

async function updateGuild(body: string) {
	const request = await fetch(`${USER_API_URL}:${USER_API_PORT}/API/Guild/Update`, {
		method: "POST",
		body: body,
		headers: CreateHeaders(),
	});

	return { success: request.ok };
}