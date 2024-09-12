export async function load({ parent }) {
	const { userData } = await parent();
	return {
		userData
	}
}
