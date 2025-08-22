import { USER_API_PORT, USER_API_URL } from "$env/static/private";
import CreateHeaders from "./CreateHeaders";
import { error } from "@sveltejs/kit";

export async function AddTodo(body: string, userId: string) {
    const url = new URL(USER_API_URL);
    url.port = USER_API_PORT;
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
