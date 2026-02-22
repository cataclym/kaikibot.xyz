import { marked } from "marked";

export async function load({ parent, fetch }) {
	const response = await fetch((await parent()).readmeMetadata.download_url);
	const doc = marked(await response.text());

	return {
		doc
	};
}
