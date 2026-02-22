import { env } from "$env/dynamic/private";
import CreateHeaders from "./CreateHeaders";
import { error } from "@sveltejs/kit";

export async function DeleteTodos(todoIds: string, userId: string) {
	const url = new URL(env.USER_API_URL);
	url.port = env.USER_API_PORT;
	url.pathname = `/API/User/${userId}/todo`;
	url.searchParams.append("ids", todoIds);

	const request = await fetch(url, {
		method: "DELETE",
		headers: CreateHeaders(false)
	});

	if (!request.ok) {
		throw error(request.status, request.statusText);
	}

	return { success: true };
}
