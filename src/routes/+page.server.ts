import { env } from "$env/dynamic/private";
import { env as pubEnv } from "$env/dynamic/public";

const { CHANGELOG, INVITE } = env;
const { PUBLIC_SOURCE } = pubEnv;

export async function load() {
	return { INVITE, PUBLIC_SOURCE, CHANGELOG };
}
