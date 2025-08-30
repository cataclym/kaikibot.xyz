import { fail } from "@sveltejs/kit";
import { UpdateGuild } from "../../../../../methods/UpdateGuild";
import SanitizeInput from "../../../../../methods/SanitizeInput";

export async function load({ parent }) {
	const { isAdmin, guild } = await parent();

	return { isAdmin, guild };
}

// Form actions receives frontend data, sends it to bot
export const actions = {
	userrole: async ({ request, params }) => {
		const formData = await request.formData();
		
		const UserRole = formData.get("roleid");
		let UserRoleName = <string> formData.get("rolename");
		const UserRoleColor = formData.get("rolecolor");
		UserRoleName = SanitizeInput(UserRoleName);

		const data = JSON.stringify(
			{
				UserRole,
				UserRoleName,
				UserRoleColor
			},
			null
		);

		return UpdateGuild(data, params.guild);
	}
};
