import { DISCORD, KOFI, INVITE, SOURCE_WEBSITE } from "$env/static/private";
import { PUBLIC_SOURCE } from "$env/static/public";

export async function load(event) {
	const session = await event.locals.auth();
	return { session, DISCORD, INVITE, KOFI, PUBLIC_SOURCE, SOURCE_WEBSITE };
}
