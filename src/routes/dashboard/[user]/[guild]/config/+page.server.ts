import { fail } from "@sveltejs/kit";
import { UpdateGuild } from "../../../../../methods/UpdateGuild";
import SanitizeInput from "../../../../../methods/SanitizeInput";

export async function load({ parent }) {
	const { isAdmin, guild } = await parent();

	return { isAdmin, guild };
}

// Form actions receives frontend data, sends it to bot
export const actions = {
	prefix: async ({ request, params, route }) => {
		const formData = await request.formData();
		const prefix = <string>formData.get("prefix" || "");

		if (prefix.length === 0 || prefix.length > 10) throw fail(400);

		const data = JSON.stringify(
			{
				Prefix: SanitizeInput(prefix)
			},
			null
		);

		return UpdateGuild(data, params, route);
	},
	toggles: async ({ request, params, route }) => {
		const formData = await request.formData();
		const data = JSON.stringify(
			{
				DadBot: !!formData.get("dadbot"),
				Anniversary: !!formData.get("anniversary"),
				StickyRoles: !!formData.get("stickyroles")
			},
			null
		);

		return UpdateGuild(data, params, route);
	},
	excludedrole: async ({ request, params, route }) => {
		const formData = await request.formData();

		let excludeRoleName = SanitizeInput(formData.get("excluderolename") as string);
		const excludeRoleColor = formData.get("excluderolecolor");

		if (!excludeRoleName || excludeRoleName.length > 100) throw fail(400);

		const data = JSON.stringify(
			{
				excluderolename: excludeRoleName,
				excluderolecolor: excludeRoleColor
			},
			null
		);

		return UpdateGuild(data, params, route);
	},
	embedcolors: async ({ request, params, route }) => {
		const formData = await request.formData();
		const hexOkColor = SanitizeInput(String(formData.get("hexokcolor")));
		const hexErrorColor = SanitizeInput(String(formData.get("hexerrorcolor")));

		const data = JSON.stringify(
			{
				OkColor: hexOkColor,
				ErrorColor: hexErrorColor
			},
			null
		);

		return UpdateGuild(data, params, route);
	}
};
