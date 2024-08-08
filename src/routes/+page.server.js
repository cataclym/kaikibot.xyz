import { LINKS } from "../CONSTANTS";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const res = await fetch(`https://api.waifu.im/search?included_tags=maid&is_nsfw=false&limit=4`);
	const json = await res.json();

	const IMAGES = json.images.map((/** @type {{ url: string; }} */ image) => image.url);

	return { LINKS, IMAGES };
}
