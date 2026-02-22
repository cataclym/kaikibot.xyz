import { marked } from "marked";

export async function load({ parent }) {
	const { readmeMetadata } = await parent();

	if (!readmeMetadata) {
		throw new Error("Metadata not found");
	}

	
	const doc = marked(readmeMetadata);

	return {
		doc
	};
}
