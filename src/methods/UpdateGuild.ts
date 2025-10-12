import type { RouteParams } from "$app/types";
import { USER_API_PORT, USER_API_URL } from "$env/static/private";
import CreateHeaders from "./CreateHeaders";
import { error } from "@sveltejs/kit";

type routeParams = "/dashboard/[user]/[guild]/config" | "/dashboard/[user]/[guild]/userrole" | "/dashboard/[user]/[guild]/welcome";

export async function UpdateGuild(body: string, params: RouteParams<routeParams>, route: { id: string}) {
	const { guild: guildId, user: userId } = params;
	const url = new URL(USER_API_URL);
	url.port = USER_API_PORT;
	url.pathname = `/API/Guild/${guildId}/settings`;

	const request = await fetch(url, {
		method: "PATCH",
		body: body,
		headers: CreateHeaders()
	});

	if (!request.ok) {
		throw error(request.status, request.statusText);
	}

	console.info(`[UpdateGuild] User ${userId} registered update at ${route.id}`)

	return { success: true };
}
