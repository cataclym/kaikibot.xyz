import { env } from "$env/dynamic/private";
import { env as pubEnv } from "$env/dynamic/public";
import type { LayoutServerLoad } from "./$types";
const { DISCORD, KOFI, INVITE, SOURCE_WEBSITE } = env;
const { PUBLIC_SOURCE } = pubEnv;

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();
	return { session, DISCORD, INVITE, KOFI, PUBLIC_SOURCE, SOURCE_WEBSITE };
}
