import { TOKEN } from "$env/static/private";

export default function CreateHeaders() {
	if (!TOKEN) throw new Error("Token is required");

	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Authorization", TOKEN);
	// Security headers
	headers.append("X-Content-Type-Options", "nosniff");
	headers.append("X-Frame-Options", "DENY");
	headers.append("X-XSS-Protection", "1; mode=block");

	return headers;
}
