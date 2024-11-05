import { TOKEN } from "$env/static/private"

export default function CreateHeaders() {

	if (!TOKEN) throw new Error("Token is required");

	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Authorization", TOKEN);
	return headers;
}
