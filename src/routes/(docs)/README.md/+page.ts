import { marked } from "marked";

export async function load({ params, fetch }) {
	const response = await fetch(`/documentation/README.md`);
	const doc = marked(await response.text());

	return {
		doc
	};
}