import { error } from "@sveltejs/kit";
import { marked } from "marked";

export async function load({ params, parent, fetch }) {

	const parentObject = await parent();
	const documentUrl = parentObject.documentMetadata.find(f => f.name === `${params.doc}.md`)?.download_url;

	if (!documentUrl) throw error(404, { message: "Document not found"})

	const response = await fetch(documentUrl);
	const doc = marked(await response.text());

	return {
		doc
	};
}