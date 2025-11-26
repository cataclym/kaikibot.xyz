import { env } from "$env/dynamic/private";
import CreateHeaders from "./CreateHeaders";
import { error } from "@sveltejs/kit";

export async function AddTodo(body: string, userId: string) {
    const url = new URL(env.USER_API_URL);
    url.port = env.USER_API_PORT;
    url.pathname = `/API/User/${userId}/todo`;

    const request = await fetch(url, {
        method: "POST",
        body: body,
        headers: CreateHeaders()
    });

    if (!request.ok) {
        throw error(request.status, request.statusText);
    }

    return { success: true };
}
