import { DISCORD, EMBED, KOFI, INVITE, SOURCE } from "$env/static/private";
import fs from "fs";

export async function load(event) {
	const session = await event.locals.auth();
	return { session, DISCORD, EMBED, INVITE, KOFI, SOURCE };
}
