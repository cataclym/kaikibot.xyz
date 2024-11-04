export async function load({ parent }) {
	const { isAdmin, guild, user, APIGuild } = await parent();

	return { isAdmin, guild, user, APIGuild };
}
