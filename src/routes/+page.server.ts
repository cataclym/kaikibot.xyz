import { LINKS } from "../CONSTANTS";
import type { WaifuImJSON } from "../WaifuImAPI";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const res = await fetch(`https://api.waifu.im/search?included_tags=maid&is_nsfw=false&limit=4`);
	const json: WaifuImJSON = await res.json();

	const IMAGES = json.images.map(image => ({ url: image.url, alt: image.tags.map(tag => `${tag.name} - ${tag.description}`).join(". ")}));

	return { LINKS, IMAGES };
}
