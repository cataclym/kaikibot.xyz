import fs from "fs";
import { marked } from "marked";

export async function load({ params }) {
	const doc: string | null = await new Promise((resolve) => {
		fs.readFile(`./src/lib/README.md`, "utf8", (err, data) => {
			return err ? resolve(null) : resolve(marked(data));
		});
	});

	return {
		doc
	};
}
