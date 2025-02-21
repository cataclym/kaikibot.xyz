export async function load({ parent }) {
	const { responseData } = await parent();
	return {
		responseData
	};
}
