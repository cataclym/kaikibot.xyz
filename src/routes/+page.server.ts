import type { WaifuImJSON } from "../interfaces/IWaifuIm";
import { CHANGELOG, INVITE, SOURCE } from "$env/static/private";

export async function load({ cookies }) {
	let cachedImages = cookies.get("Images_WaifuIm");

	if (cachedImages) {
		return { IMAGES: JSON.parse(cachedImages), INVITE, SOURCE, CHANGELOG };
	}

	const res = await fetch(`https://api.waifu.im/search?included_tags=maid&is_nsfw=false&limit=4`);
	const json: WaifuImJSON = await res.json();

	const IMAGES = json.images
		? json.images.map((image) => ({
				url: image.url,
				alt: image.tags.map((tag) => `${tag.name} - ${tag.description}`).join(". ")
			}))
		: Array(4).fill({ url: "", alt: "" });

	cookies.set("Images_WaifuIm", JSON.stringify(IMAGES), {
		httpOnly: true,
		path: "/",
		maxAge: 60 * 60 * 24
	});

	return { IMAGES, INVITE, SOURCE, CHANGELOG };
}
