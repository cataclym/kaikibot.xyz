import { env } from "$env/dynamic/private";

export default function CreateHeaders(includeContent = true) {
	if (!env.TOKEN) throw new Error("Token is required");

	const headers = new Headers();

	if (includeContent) headers.append("Content-Type", "application/json");

	headers.append("Authorization", env.TOKEN);
	// Security headers
	headers.append("X-Content-Type-Options", "nosniff");
	headers.append("X-Frame-Options", "DENY");
	headers.append("X-XSS-Protection", "1; mode=block");

	return headers;
}
