import { USER_API_PORT, USER_API_URL } from "$env/static/private";
import CreateHeaders from "../../../../../methods/CreateHeaders";
import { error, fail } from "@sveltejs/kit";

export async function load({ parent }) {
	const { isAdmin, guild } = await parent();

	return { isAdmin, guild };
}

// Form actions receives frontend data, sends it to bot
export const actions = {
	prefix: async ({ request, params }) => {
		const formData = await request.formData();
		const prefix = formData.get("prefix");

		const data = JSON.stringify({
			Prefix: prefix,
		}, null, 2);

		return  updateGuild(data, params.guild);
	},
	toggles: async ({ request, params }) => {
		const formData = await request.formData();
		const data = JSON.stringify({
			DadBot: formData.get("dadbot"),
			Anniversary: formData.get("anniversary"),
			StickyRoles: formData.get("stickyroles"),
		}, null, 2);

		return  updateGuild(data, params.guild)
	},
	excludedrole: async ({ request, params }) => {
		const formData = await request.formData();
		const excludeRoleName = formData.get("excluderolename");
		const excludeRoleColor = formData.get("excluderolecolor");
		const excludeRole = formData.get("excluderole");

		const data = JSON.stringify({
			excluderolename: excludeRoleName,
			excluderolecolor: excludeRoleColor,
			"": excludeRole,
		}, null);

		return updateGuild(data, params.guild)
	},
	embedcolors: async ({ request, params }) => {
		const formData = await request.formData();
		const hexOkColor = formData.get("hexOkColor");
		const hexErrorColor = formData.get("hexErrorColor");

		const data = JSON.stringify({
			OkColor: hexOkColor,
			ErrorColor: hexErrorColor,
		}, null, 2);

		return updateGuild(data, params.guild)
	}
}

async function updateGuild(body: string, guildId: string) {

	const url = new URL(USER_API_URL);
	url.port = USER_API_PORT;
	url.pathname = `/API/Guild/${guildId}`;

	const request = await fetch(url, {
		method: "POST",
		body: body,
		headers: CreateHeaders(),
	});

	if (!request.ok) {
		throw error(request.status, request.statusText);
	}

	return { success: true };
}
