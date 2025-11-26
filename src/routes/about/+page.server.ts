import { env } from "$env/dynamic/private";

export function load() {
	return {
		SOURCE_WEBSITE: env.SOURCE_WEBSITE
	};
}
