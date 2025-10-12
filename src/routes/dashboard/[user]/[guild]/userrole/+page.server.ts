import { fail } from "@sveltejs/kit";
import { UpdateGuild } from "../../../../../methods/UpdateGuild";
import SanitizeInput from "../../../../../methods/SanitizeInput";

export async function load({ parent }) {
	const { isAdmin, guild } = await parent();

	return { isAdmin, guild };
}

// Form actions receives frontend data, sends it to bot
export const actions = {
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
