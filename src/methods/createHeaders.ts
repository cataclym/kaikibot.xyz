export default function createHeaders() {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Authorization", process.env.TOKEN!);
	return headers;
}
