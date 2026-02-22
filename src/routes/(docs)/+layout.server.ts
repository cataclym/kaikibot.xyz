import { env } from "$env/dynamic/public";
import { error } from "@sveltejs/kit";

type Metadata = {
	name: string;
	download_url: string;
	path: string;
};

type CachedDocs = {
	documentMetadata: Metadata[];
	readmeMetadata: string;
	expiresAt: number;
};

const CACHE_TTL_MS = 5 * 60 * 1000;
let cachedDocs: CachedDocs | null = null;

export async function load({ fetch, setHeaders }) {
	if (!env.PUBLIC_SOURCE) throw error(404, { message: "Repository is not defined" });
	const url = new URL(env.PUBLIC_SOURCE);
	const [, owner, repo] = url.pathname.split("/");

	if (cachedDocs && cachedDocs.expiresAt > Date.now()) {
		return {
			documentMetadata: cachedDocs.documentMetadata,
			readmeMetadata: cachedDocs.readmeMetadata
		};
	}

	const headers = { "User-Agent": "kaikibot.xyz" };
	const [docsRes, readmeRes] = await Promise.all([
		fetch(`https://api.github.com/repos/${owner}/${repo}/contents/docs`, { headers }),
		fetch(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`, { headers })
	]);

	if (!docsRes.ok) {
		const details = await docsRes.text();
		throw error(docsRes.status, { message: `Failed to fetch docs metadata: ${details}` });
	}

	if (!readmeRes.ok) {
		const details = await readmeRes.text();
		throw error(readmeRes.status, { message: `Failed to fetch README.md: ${details}` });
	}

	const [documentMetadata, readmeMetadata]: [Metadata[], string] = await Promise.all([
		docsRes.json(),
		readmeRes.text()
	]);

	cachedDocs = {
		documentMetadata,
		readmeMetadata,
		expiresAt: Date.now() + CACHE_TTL_MS
	};

	setHeaders({
		"cache-control": "public, max-age=300"
	});

	return {
		documentMetadata,
		readmeMetadata
	};
}
