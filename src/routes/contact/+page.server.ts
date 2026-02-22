import { env } from "$env/dynamic/private";
import { env as pubEnv } from "$env/dynamic/public";

const { EMAIL, SOURCE_WEBSITE } = env;
const { PUBLIC_SOURCE } = pubEnv;

export function load() {
	return {
		EMAIL,
		PUBLIC_SOURCE,
		SOURCE_WEBSITE
	};
}
