import { marked } from "marked";

export async function load({ params, fetch }) {
	const response = await fetch(`/documentation/docs/${params.doc}.md`);
	const doc = marked(await response.text());

	return {
		doc
	};
}