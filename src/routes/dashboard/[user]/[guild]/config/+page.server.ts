import { UpdateGuild } from "../../../../../methods/UpdateGuild";

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
		}, null);

		return UpdateGuild(data, params.guild);
	},
	toggles: async ({ request, params }) => {
		const formData = await request.formData();
		const data = JSON.stringify({
			DadBot: formData.get("dadbot"),
			Anniversary: formData.get("anniversary"),
			StickyRoles: formData.get("stickyroles"),
		}, null);

		return UpdateGuild(data, params.guild)
	},
	excludedrole: async ({ request, params }) => {
		const formData = await request.formData();
		const excludeRoleName = formData.get("excluderolename");
		const excludeRoleColor = formData.get("excluderolecolor");

		const data = JSON.stringify({
			excluderolename: excludeRoleName,
			excluderolecolor: excludeRoleColor,
		}, null);

		return UpdateGuild(data, params.guild)
	},
	embedcolors: async ({ request, params }) => {
		const formData = await request.formData();
		const hexOkColor = formData.get("hexokcolor");
		const hexErrorColor = formData.get("hexerrorcolor");

		const data = JSON.stringify({
			OkColor: hexOkColor,
			ErrorColor: hexErrorColor,
		}, null);

		return UpdateGuild(data, params.guild)
	}
}

