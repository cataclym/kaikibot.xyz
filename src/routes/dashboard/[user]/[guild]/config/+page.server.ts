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

	}
}