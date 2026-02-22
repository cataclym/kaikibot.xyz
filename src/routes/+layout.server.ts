import { env } from "$env/dynamic/private";
import { env as pubEnv } from "$env/dynamic/public";
const { DISCORD, KOFI, INVITE, SOURCE_WEBSITE } = env;
const { PUBLIC_SOURCE } = pubEnv;

export async function load({ locals }) {
	const user = locals.user;
	return { user, DISCORD, INVITE, KOFI, PUBLIC_SOURCE, SOURCE_WEBSITE };
}
