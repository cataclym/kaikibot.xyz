import type { WaifuImJSON } from "../IWaifuIm";
import { CHANGELOG, INVITE, SOURCE } from "$env/static/private";

export async function load() {
	const res = await fetch(`https://api.waifu.im/search?included_tags=maid&is_nsfw=false&limit=4`);
	const json: WaifuImJSON = await res.json();

	const IMAGES = json.images
		? json.images.map((image) => ({
				url: image.url,
				alt: image.tags.map((tag) => `${tag.name} - ${tag.description}`).join(". ")
			}))
		: Array(4).fill({ url: "", alt: "" });

	return { IMAGES, INVITE, SOURCE, CHANGELOG };
}
