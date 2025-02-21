import { DISCORD, EMBED, KOFI, INVITE, SOURCE, SOURCE_WEBSITE } from "$env/static/private";

export async function load(event) {
	const session = await event.locals.auth();
	return { session, DISCORD, EMBED, INVITE, KOFI, SOURCE, SOURCE_WEBSITE };
}
