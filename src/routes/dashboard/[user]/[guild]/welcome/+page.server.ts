export async function load({ parent }) {
	const { isAdmin, guildData } = await parent();

	return { isAdmin, guildData };
}
