import { USER_API_PORT, USER_API_URL } from "$env/static/private";
import CreateHeaders from "../../../../../methods/CreateHeaders";

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

		await updateGuild(data, params.guild);

		return {
			success: true,
			data,
		};
	},
	toggles: async ({ request, params }) => {
		const formData = await request.formData();
		const data = JSON.stringify({
			DadBot: formData.get("DadBot"),
			Anniversary: formData.get("Anniversary"),
			StickyRoles: formData.get("StickyRoles"),
		}, null, 2);

		await updateGuild(data, params.guild)

		return {
			success: true,
			data,
		};
	},
	excludedrole: async ({ request, params }) => {
		const formData = await request.formData();
		const excludeRoleName = formData.get("excluderolename");
		const excludeRoleColor = formData.get("excluderolecolor");

		const data = JSON.stringify({
			ExcludeRoleName: excludeRoleName,
			ExcludeRoleColor: excludeRoleColor,
		}, null, 2);

		await updateGuild(data, params.guild)

		return {
			success: true,
			data,
		};
	},
	embedcolors: async ({ request, params }) => {
		const formData = await request.formData();
		const hexOkColor = formData.get("hexOkColor");
		const hexErrorColor = formData.get("hexErrorColor");

		const data = JSON.stringify({
			OkColor: hexOkColor,
			ErrorColor: hexErrorColor,
		}, null, 2);

		await updateGuild(data, params.guild)

		return {
			success: true,
			data,
		};
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

	return { success: request.ok };
}
