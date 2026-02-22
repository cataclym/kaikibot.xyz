import { env } from "$env/dynamic/public";
import { error } from "@sveltejs/kit";

type Metadata = {
	name: string;
	download_url: string;
	path: string;
};

export async function load({ fetch }) {
	if (!env.PUBLIC_SOURCE) throw error(404, { message: "Repository is not defined" });
	const url = new URL(env.PUBLIC_SOURCE);

	const [, owner, repo] = url.pathname.split("/");

	const [docsRes, readmeRes] = await Promise.all([
		fetch(`https://api.github.com/repos/${owner}/${repo}/contents/docs`),
		fetch(`https://api.github.com/repos/${owner}/${repo}/contents/README.md`)
	]);
	const [documentMetadata, readmeMetadata]: [Metadata[], Metadata] = await Promise.all([
		docsRes.json(),
		readmeRes.json()
	]);

	// `files` is an array of file metadata objects
	// Example: { name: "intro.md", download_url: "https://raw.githubusercontent.com/..." }
	return {
		documentMetadata,
		readmeMetadata
	};
}
