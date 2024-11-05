export async function load({ parent }) {
	const { isAdmin, guild } = await parent();

	return { isAdmin, guild };
}
