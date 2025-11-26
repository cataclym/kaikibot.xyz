import { env } from "$env/dynamic/private";
import { env as pubEnv } from "$env/dynamic/public";
const { DISCORD, KOFI, INVITE, SOURCE_WEBSITE } = env;
const { PUBLIC_SOURCE } = pubEnv;

export async function load({ locals }) {
	const session = await locals.auth();
	return { session, DISCORD, INVITE, KOFI, PUBLIC_SOURCE, SOURCE_WEBSITE };
}
