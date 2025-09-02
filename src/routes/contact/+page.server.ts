import { EMAIL, SOURCE_WEBSITE } from "$env/static/private";
import { PUBLIC_SOURCE } from "$env/static/public";

export function load() {
	return {
		EMAIL,
		PUBLIC_SOURCE,
		SOURCE_WEBSITE
	};
}
