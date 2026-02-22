import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { UpdateGuild } from "../../../../../methods/UpdateGuild";
import SanitizeInput from "../../../../../methods/SanitizeInput";

export const load: PageServerLoad = async ({ parent }) => {
	const { isAdmin, guild } = await parent();

	return { isAdmin, guild };
};

// Form actions receives frontend data, sends it to bot
export const actions: Actions = {
	userrole: async ({ request, params, route }) => {
		const formData = await request.formData();

		const UserRole = formData.get("roleid");
		let UserRoleName = SanitizeInput(formData.get("rolename") as string);
		const UserRoleColor = formData.get("rolecolor");

		if (!UserRoleName || UserRoleName.length > 100) throw fail(400);

		const data = JSON.stringify(
			{
				UserRole,
				UserRoleName,
				UserRoleColor
			},
			null
		);

		return UpdateGuild(data, params, route);
	}
};
