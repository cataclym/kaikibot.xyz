import { fail } from "@sveltejs/kit";
import { UpdateGuild } from "../../../../../methods/UpdateGuild";
import SanitizeInput from "../../../../../methods/SanitizeInput";

export async function load({ parent }) {
	const { isAdmin, guild } = await parent();

	return { isAdmin, guild };
}

// Form actions receives frontend data, sends it to bot
export const actions = {
	prefix: async ({ request, params }) => {
		const formData = await request.formData();
		const prefix = <string> formData.get("prefix");

		if (prefix.length > 10) throw fail(400);

		const data = JSON.stringify(
			{
				Prefix: SanitizeInput(prefix)
			},
			null
		);

		return UpdateGuild(data, params.guild);
	},
	toggles: async ({ request, params }) => {
		const formData = await request.formData();
		const data = JSON.stringify(
			{
				DadBot: formData.get("dadbot"),
				Anniversary: formData.get("anniversary"),
				StickyRoles: formData.get("stickyroles")
			},
			null
		);

		return UpdateGuild(data, params.guild);
	},
	excludedrole: async ({ request, params }) => {
		const formData = await request.formData();
		const excludeRoleName = formData.get("excluderolename");
		const excludeRoleColor = formData.get("excluderolecolor");

		const data = JSON.stringify(
			{
				excluderolename: excludeRoleName,
				excluderolecolor: excludeRoleColor
			},
			null
		);

		return UpdateGuild(data, params.guild);
	},
	embedcolors: async ({ request, params }) => {
		const formData = await request.formData();
		const hexOkColor = formData.get("hexokcolor");
		const hexErrorColor = formData.get("hexerrorcolor");

		const data = JSON.stringify(
			{
				OkColor: hexOkColor,
				ErrorColor: hexErrorColor
			},
			null
		);

		return UpdateGuild(data, params.guild);
	}
};
